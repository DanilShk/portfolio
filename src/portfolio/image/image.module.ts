import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { multerOptions } from './config/multer.config';
import { Image } from './entities/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Image]),
    MulterModule.register(multerOptions),
    CommentModule,
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
