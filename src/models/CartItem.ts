import { Model, DataTypes } from 'sequelize';
import User from './User';
import Book from './Book';
import { sequelize } from '../config';

class CartItem extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public quantity!: number;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'CartItem',
  }
);

export default CartItem;
