import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public genre!: string;
  public price!: number;
  public inventory!: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Book',
  }
);

export default Book;
