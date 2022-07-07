import { IValidator } from '../../@shared/validator/validator.interface';
import { Customer } from '../entities/Customer';
import { CustomerYupValidator } from '../validator/customer.validator';

export class CustomerValidatorFactory {
  static create(): IValidator<Customer> {
    return new CustomerYupValidator();
  }
}
