import { Notification } from './notification';

describe('[Unit] Notification', () => {
  it('should be able to create notification errors', () => {
    const notification = new Notification();
    const firstError = {
      message: 'First error message',
      context: 'Customer',
    };
    notification.addError(firstError);
    expect(notification.messages('Customer')).toBe(
      'Customer: First error message,'
    );

    const secondError = {
      message: 'Second error message',
      context: 'Customer',
    };
    notification.addError(secondError);
    expect(notification.messages('Customer')).toBe(
      'Customer: First error message,Customer: Second error message,'
    );

    const thirdError = {
      message: 'third error message',
      context: 'Order',
    };
    notification.addError(thirdError);
    expect(notification.messages('Customer')).toBe(
      'Customer: First error message,Customer: Second error message,'
    );
    expect(notification.messages()).toBe(
      'Customer: First error message,Customer: Second error message,Order: third error message,'
    );
  });

  it('should be able to check if notification have at least one error', () => {
    const notification = new Notification();
    const error = {
      message: 'First error message',
      context: 'Customer',
    };
    notification.addError(error);
    expect(notification.hasErrors()).toBe(true);
  });

  it('should be able to get error props', () => {
    const notification = new Notification();
    const error = {
      message: 'First error message',
      context: 'Customer',
    };
    notification.addError(error);
    expect(notification.getErrors()).toStrictEqual([error]);
  });
});
