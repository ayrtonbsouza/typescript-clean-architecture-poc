import { Entity } from '../../@shared/entity/Entity.abstract';
import { EventDispatcher } from '../../@shared/events/EventDispatcher';
import { NotificationError } from '../../@shared/notification/notification.error';
import { AddressChangedEvent } from '../events/AddressChanged.event';
import { CustomerCreatedEvent } from '../events/CustomerCreated.event';
import { SendEmailWhenAddressIsChangedHandler } from '../events/handler/SendEmailWhenAddressIsChanged.handler';
import { SendEmailWhenCustomerIsCreatedHandler } from '../events/handler/SendEmailWhenCustomerIsCreated.handler';
import { SendSMSWhenCustomerIsCreatedHandler } from '../events/handler/SendSMSWhenCustomerIsCreated.handler';
import { CustomerValidatorFactory } from '../factories/CustomerValidator.factory';
import { Address } from '../value-object/Address';

export class Customer extends Entity {
  private _name = '';
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;

  private eventDispatcher = new EventDispatcher();
  private sendEmailWhenCustomerIsCreatedHandler =
    new SendEmailWhenCustomerIsCreatedHandler();
  private sendSMSWhenCustomerIsCreatedHandler =
    new SendSMSWhenCustomerIsCreatedHandler();
  private sendEmailWhenAddressIsChanged =
    new SendEmailWhenAddressIsChangedHandler();

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    this.notifyWhenCustomerIsCreated();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
    this.eventDispatcher.register(
      'AddressChangedEvent',
      this.sendEmailWhenAddressIsChanged
    );
    const addressChangedEvent = new AddressChangedEvent({
      id: this.id,
      name: this._name,
      address: `${this._address.street}, ${this._address.number}`,
    });
    this.eventDispatcher.notify(addressChangedEvent);
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is required');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  private notifyWhenCustomerIsCreated() {
    this.eventDispatcher.register(
      'CustomerCreatedEvent',
      this.sendEmailWhenCustomerIsCreatedHandler
    );
    this.eventDispatcher.register(
      'CustomerCreatedEvent',
      this.sendSMSWhenCustomerIsCreatedHandler
    );

    const customerCreatedEvent = new CustomerCreatedEvent({});
    this.eventDispatcher.notify(customerCreatedEvent);
  }
}
