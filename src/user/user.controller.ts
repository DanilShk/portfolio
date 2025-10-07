import { Body, Controller, Delete } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { UserService } from './user.service';
import { PayloadUser } from 'src/auth/types/payload-usr.type';
import { DeleteAccountDto } from './dto/user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Delete user account',
    description: 'Deletes the user account based on the provided data.',
  })
  @Delete('delete')
  delete(
    @Body() deleteAccountDto: DeleteAccountDto,
    @User() user: PayloadUser,
  ) {
    return this.userService.delete(deleteAccountDto, user);
  }
}
