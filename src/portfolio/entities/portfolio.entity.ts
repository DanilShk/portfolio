import { Optional } from 'sequelize';
import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { Image } from '../image/entities/image.entity';

interface PortfolioAttributes {
  id: number;
  name: string;
  description: string;
  userId: string;
}

interface PortfolioCreationAttributes
  extends Optional<PortfolioAttributes, 'id'> {}

@Table({
  tableName: 'portfolios',
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Portfolio extends Model<
  PortfolioAttributes,
  PortfolioCreationAttributes
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'name',
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'description',
  })
  declare description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  declare userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Image)
  images: Image[];
}
