import { Optional } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  refreshToken: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id?: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({ type: DataType.TEXT, allowNull: false, field: 'password_hash' })
  declare passwordHash: string;

  @Column({ type: DataType.TEXT, allowNull: true, field: 'refresh_token' })
  declare refreshToken: string | null;

  @HasMany(() => Portfolio)
  portfolios: Portfolio[];
}
