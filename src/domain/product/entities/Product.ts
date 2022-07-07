import { Entity } from '../../@shared/entity/Entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { ProductValidatorFactory } from '../factories/ProductValidator.factory';
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
    ProductValidatorFactory.create().validate(this);
  }
}
