import { Body, Controller, Patch, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { LoginDto, SingUpDto } from './dto/create-auth.dto';
import { AuthService } from './services/auth.service';
import { PayloadUser } from './types/payload-usr.type';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User registration',
    description: 'Creates a new user based on the provided registration data.',
  })
  @Public()
  @Post('singUp')
  signup(@Body() singUpDto: SingUpDto) {
    return this.authService.singUp(singUpDto);
  }

  @ApiOperation({
    summary: 'User authentication',
    description:
      'Authenticates the user and returns a JWT token upon successful login.',
  })
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'User logout',
    description:
      'Logs out the user and invalidates their authentication token.',
  })
  @ApiBearerAuth()
  @Patch('logout')
  logout(@User() user: PayloadUser) {
    return this.authService.logout(user);
  }
}
