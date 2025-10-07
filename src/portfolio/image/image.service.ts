import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto, FindAllDto } from './dto/image.dto';
import { PayloadUser } from 'src/auth/types/payload-usr.type';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './entities/image.entity';
import { Order } from 'sequelize';
import { Portfolio } from '../entities/portfolio.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageService {
  private readonly port: number;
  private readonly host: string;
  constructor(
    @InjectModel(Image)
    private imageModel: typeof Image,
    private readonly configService: ConfigService,
  ) {
    this.port = configService.getOrThrow<number>('PORT');
    this.host = configService.getOrThrow<string>('HOST');
  }

  upload(
    createImageDto: CreateImageDto,
    user: PayloadUser,
    file: Express.Multer.File,
  ) {
    return this.imageModel.create({
      userId: user.id,
      portfolioId: createImageDto.portfolioId,
      description: createImageDto.description,
      name: createImageDto.name,
      originalName: file.originalname,
      path: this.buildPath(file.path),
      mimetype: file.mimetype,
    });
  }

  async remove(id: string, user: PayloadUser) {
    const image = await this.imageModel.findOne({
      where: { id, userId: user.id },
    });

    if (!image) throw new NotFoundException('image not found');

    await image.destroy();
    return { success: true };
  }

  async findAll(findAllDto: FindAllDto) {
    const orderOptions: Order = [];

    if (findAllDto.field && findAllDto.direction) {
      orderOptions.push([findAllDto.field, findAllDto.direction]);
    }

    return this.imageModel.findAll({
      order: orderOptions.length ? orderOptions : undefined,
      attributes: ['description', 'path'],
      include: [{ model: Portfolio, attributes: ['name'] }],
    });
  }

  buildPath(filePath: string) {
    return `http://${this.host}:${this.port}/${filePath}`;
  }
}
