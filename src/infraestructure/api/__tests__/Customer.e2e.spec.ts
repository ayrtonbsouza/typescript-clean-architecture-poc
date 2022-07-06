import request from 'supertest';
import { app, sequelize } from '../express';

describe('[E2E] Customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should be able to create a customer', async () => {
    const response = await request(app)
      .post('/customers')
      .send({
        name: 'John Doe',
        address: {
          street: 'Main St',
          number: 123,
          zip: '12345',
          city: 'New York',
          state: 'NY',
        },
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.address.street).toBe('Main St');
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe('12345');
    expect(response.body.address.city).toBe('New York');
    expect(response.body.address.state).toBe('NY');
  });

  it('should receive an error when creating a customer with invalid data', async () => {
    const response = await request(app).post('/customers').send({
      name: 'John Doe',
    });
    expect(response.status).toBe(500);
  });
});
