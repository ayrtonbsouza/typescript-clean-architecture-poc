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
});
