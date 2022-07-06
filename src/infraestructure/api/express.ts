import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../customer/database/model/Customer.model';
import { ProductModel } from '../product/database/model/sequelize/Product.model';
import { customerRoute } from './routes/customer.routes';
import { productRoute } from './routes/product.routes';

export const app: Express = express();
app.use(express.json());
app.use('/customers', customerRoute);
app.use('/products', productRoute);
export let sequelize: Sequelize;

const setUpDatabase = async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
};

setUpDatabase();
