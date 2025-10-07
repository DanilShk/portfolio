import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PayloadUser } from 'src/auth/types/payload-usr.type';
import { User } from 'src/common/decorators/user.decorator';
import { IdUUIDDto } from 'src/common/dto/id.dto';
import { CreatePortfolioDto } from './dto/portfolio.dto';
import { PortfolioService } from './portfolio.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiOperation({
    summary: 'Create portfolio',
    description: 'Creates a new portfolio for the authenticated user.',
  })
  @Post()
  create(
    @Body() createPortfolioDto: CreatePortfolioDto,
    @User() user: PayloadUser,
  ) {
    return this.portfolioService.create(createPortfolioDto, user);
  }

  @ApiOperation({
    summary: 'Get all portfolios',
    description:
      'Retrieves all portfolios belonging to the authenticated user.',
  })
  @Get()
  findAll(@User() user: PayloadUser) {
    return this.portfolioService.findAll(user);
  }

  @ApiOperation({
    summary: 'Get portfolio by id',
    description:
      'Retrieves a specific portfolio by its ID for the authenticated user.',
  })
  @Get(':id')
  findOne(@Param() idDto: IdUUIDDto, @User() user: PayloadUser) {
    const { id } = idDto;
    return this.portfolioService.findOne(id, user);
  }

  @ApiOperation({
    summary: 'Delete portfolio',
    description:
      'Deletes a specific portfolio by its ID for the authenticated user.',
  })
  @Delete(':id')
  remove(@Param() idDto: IdUUIDDto, @User() user: PayloadUser) {
    const { id } = idDto;
    return this.portfolioService.remove(id, user);
  }
}
