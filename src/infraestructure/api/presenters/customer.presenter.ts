import { toXML } from 'jstoxml';
import { IOutputListCustomerDto } from '../../../usecase/customer/list/dtos';

export class CustomerPresenter {
  static toXML(data: IOutputListCustomerDto): string {
    const xmlOption = {
      header: true,
      indent: '  ',
      newLine: '\n',
      allowEmpty: true,
    };
    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
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
        },
      },
      xmlOption
    );
  }
}
