import { Model, DataTypes } from 'sequelize';
import User from './User';
import { sequelize } from '../config';

class Order extends Model {
  public id!: number;
  public userId!: number;
  public totalAmount!: number;
  public createdAt!: Date;
}

Order.init(
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
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Order',
  }
);

export default Order;
