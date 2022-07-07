import { Entity } from '../../@shared/entity/Entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { IProduct } from './IProduct';

export class Product extends Entity implements IProduct {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        context: 'Product',
        message: 'Id is required',
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: 'Product',
        message: 'Name is required',
      });
    }

    if (this._price <= 0) {
      this.notification.addError({
        context: 'Product',
        message: 'Price must be greater than zero',
      });
    }
  }
}
