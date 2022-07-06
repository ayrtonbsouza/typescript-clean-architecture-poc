import express, { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../usecase/product/create/CreateProduct';
import { ListProductUseCase } from '../../../usecase/product/list/ListProduct';
import { ProductRepository } from '../../product/repository/sequelize/ProductRepository';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get('/', async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await useCase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
