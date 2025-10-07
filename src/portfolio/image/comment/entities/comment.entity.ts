import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { Image } from '../../entities/image.entity';

interface CommentAttributes {
  id: number;
  text: string;
  userId: string;
  imageId: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

@Table({
  tableName: 'comments',
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Comment extends Model<
  CommentAttributes,
  CommentCreationAttributes
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
  declare text: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  declare userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Image)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'image_id',
  })
  declare imageId: string;

  @BelongsTo(() => Image)
  image: Image;
}
