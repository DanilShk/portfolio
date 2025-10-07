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
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from '../comment/entities/comment.entity';

interface ImageAttributes {
  id: number;
  name: string;
  description: string;
  mimetype: string;
  originalName: string;
  path: string;
  userId: string;
  portfolioId: string;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, 'id'> {}

@Table({
  tableName: 'images',
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Image extends Model<ImageAttributes, ImageCreationAttributes> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'mimetype',
  })
  declare mimetype: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'original_name',
  })
  declare originalName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'path',
    unique: true,
  })
  declare path: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'portfolio_id',
  })
  declare portfolioId: string;

  @BelongsTo(() => Portfolio)
  declare portfolio: Portfolio;

  @HasMany(() => Comment)
  comments: Comment[];
}
