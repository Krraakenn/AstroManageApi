import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { hashPassword } from 'src/utils/hashpwd';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user_entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6, { message: 'Passcode must be at least 6 characters long' })
  @MaxLength(6, { message: 'Passcode must be at most 6 characters long' })
  passcode: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.passcode = await hashPassword(this.passcode);
  }
}
