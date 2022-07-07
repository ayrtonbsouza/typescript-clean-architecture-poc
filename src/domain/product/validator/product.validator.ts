import * as yup from 'yup';
import { IValidator } from '../../@shared/validator/validator.interface';
import { Product } from '../entities/Product';

export class ProductYupValidator implements IValidator<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup
            .number()
            .test(
              'is-positive',
              'Price must be greater than zero',
              (value) => value > 0
            ),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: 'Product',
          message: error,
        });
      });
    }
  }
}
