import { IValidator } from '../../@shared/validator/validator.interface';
import { Product } from '../entities/Product';
import { ProductYupValidator } from '../validator/product.validator';

export class ProductValidatorFactory {
  static create(): IValidator<Product> {
    return new ProductYupValidator();
  }
}
