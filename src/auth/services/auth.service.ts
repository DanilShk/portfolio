import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { LoginDto, SingUpDto } from '../dto/create-auth.dto';
import { PayloadUser } from '../types/payload-usr.type';
import { AuthJwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly authJwtService: AuthJwtService,
  ) {}
  async singUp(singUpDto: SingUpDto) {
    const { email, password } = singUpDto;

    const userExist = await this.userModel.findOne({ where: { email } });

    if (userExist) throw new BadRequestException('User exists');

    const hash = await bcrypt.hash(password, 10);

    const createdUser = await this.userModel.create({
      email,
      passwordHash: hash,
    });

    const payload = {
      id: createdUser.id,
      email: createdUser.email,
    } as PayloadUser;

    const { accessToken, refreshToken } =
      await this.authJwtService.getTokens(payload);

    await createdUser.update({ refreshToken });

    return { user: createdUser, accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const userExist = await this.userModel.findOne({ where: { email } });

    if (!userExist) throw new BadRequestException('User does not exist');

    const isMatch = await bcrypt.compare(password, userExist.passwordHash);

    if (!isMatch) throw new BadRequestException('Password is not match');

    const payload = { id: userExist.id, email: userExist.email } as PayloadUser;

    const { accessToken, refreshToken } =
      await this.authJwtService.getTokens(payload);

    return { accessToken, refreshToken };
  }

  async logout(user: PayloadUser) {
    const { id } = user;

    const userExist = await this.userModel.findByPk(id);

    if (!userExist) throw new NotFoundException('user not found');

    await userExist.update({ refreshToken: null });

    return { success: true };
  }
}
