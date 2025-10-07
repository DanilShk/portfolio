import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/portfolio.dto';
import { PayloadUser } from 'src/auth/types/payload-usr.type';
import { Portfolio } from './entities/portfolio.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio)
    private portfolioModel: typeof Portfolio,
  ) {}
  async create(createPortfolioDto: CreatePortfolioDto, user: PayloadUser) {
    return this.portfolioModel.create({
      name: createPortfolioDto.name,
      description: createPortfolioDto.description,
      userId: user.id,
    });
  }

  findAll(user: PayloadUser) {
    return this.portfolioModel.findAll({
      where: { userId: user.id },
    });
  }

  async findOne(id: string, user: PayloadUser) {
    const portfolio = await this.portfolioModel.findOne({
      where: { id, userId: user.id },
    });

    if (!portfolio) throw new BadRequestException('portfolio not found');

    return portfolio;
  }

  async remove(id: string, user: PayloadUser) {
    const portfolio = await this.portfolioModel.findOne({
      where: { id, userId: user.id },
    });

    if (!portfolio) throw new BadRequestException('portfolio not found');

    await portfolio.destroy();

    return { success: true };
  }
}
