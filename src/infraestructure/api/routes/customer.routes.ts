import express, { Request, Response } from 'express';
import { CreateCustomerUseCase } from '../../../usecase/customer/create/CreateCustomer';
import { ListCustomerUseCase } from '../../../usecase/customer/list/ListCustomer';
import { CustomerRepository } from '../../customer/repository/CustomerRepository';
import { CustomerPresenter } from '../presenters/customer.presenter';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
        state: req.body.address.state,
      },
    };
    const output = await useCase.execute(customerDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get('/', async (req: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());
  const output = await useCase.execute({});
  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.toXML(output)),
  });
});
