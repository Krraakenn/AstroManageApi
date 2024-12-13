import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user_entity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(user_entity)
    private readonly userRepository: Repository<user_entity>,
  ) {}

  async getAll() {
    return this.userRepository.find();
  }

  async getOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(data: CreateUserDto) {
    const user: user_entity = new user_entity();
    const userExist = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (userExist) {
      throw new BadRequestException('Email already exists');
    }
    user.username = data.username;
    user.email = data.email;
    user.passcode = data.passcode;
    const regexNumber = new RegExp('^[0-9]+$');
    if (!regexNumber.test(user.passcode)) {
      throw new BadRequestException('Passcode must be a number');
    }
    const error = await validate(user);
    if (error.length > 0) {
      throw new BadRequestException(
        error.map((err) => Object.values(err.constraints)).flat(),
      );
    }
    const saltRounds = 10;
    user.passcode = await bcrypt.hash(data.passcode, saltRounds);

    return this.userRepository.save(user);
  }

  async deleteAll() {
    return this.userRepository.delete({});
  }
}
