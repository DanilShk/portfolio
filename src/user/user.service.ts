import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteAccountDto } from './dto/user.dto';
import { PayloadUser } from 'src/auth/types/payload-usr.type';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async delete(deleteAccountDto: DeleteAccountDto, user: PayloadUser) {
    const { id } = user;
    const { password } = deleteAccountDto;

    const userExist = await this.userModel.findByPk(id);

    if (!userExist) throw new NotFoundException('user not found');

    const isMatch = await bcrypt.compare(password, userExist.passwordHash);

    if (!isMatch) throw new BadRequestException('Password is not match');

    await Promise.all([
      userExist.update({ refreshToken: null }),
      userExist.destroy(),
    ]);

    return { success: true };
  }
}
