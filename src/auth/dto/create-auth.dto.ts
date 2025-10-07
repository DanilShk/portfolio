import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class SingUpDto {
  @ApiProperty({
    type: String,
    example: 'vasya@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'MemeGen2024!',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;
}

export class LoginDto extends SingUpDto {}
