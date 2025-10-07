import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PayloadUser } from 'src/auth/types/payload-usr.type';
import { User } from 'src/common/decorators/user.decorator';
import { IdUUIDDto } from 'src/common/dto/id.dto';
import { CreateImageDto, FindAllDto } from './dto/image.dto';
import { ImageService } from './image.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upload image',
    description:
      'Uploads a new image for the authenticated user. Accepts a file and image metadata.',
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
    @User() user: PayloadUser,
  ) {
    return this.imageService.upload(createImageDto, user, file);
  }

  @Public()
  @ApiOperation({
    summary: 'Find all images',
    description: 'Retrieves all images based on the provided filter criteria.',
  })
  @Post('find-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.imageService.findAll(findAllDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete image',
    description:
      'Deletes a specific image by its ID for the authenticated user.',
  })
  @Delete(':id')
  remove(@Param() idDto: IdUUIDDto, @User() user: PayloadUser) {
    const { id } = idDto;
    return this.imageService.remove(id, user);
  }
}
