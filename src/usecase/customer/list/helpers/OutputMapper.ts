import { Customer } from '../../../../domain/customer/entities/Customer';
import { IOutputListCustomerDto } from '../dtos';

export class OutputMapper {
  static toOutput(customer: Customer[]): IOutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
          state: customer.address.state,
        },
      })),
    };
  }
}
