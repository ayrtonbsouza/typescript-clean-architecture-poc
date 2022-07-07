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

  it('should be able to list all customers', async () => {
    const firstCustomer = await request(app)
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
    expect(firstCustomer.status).toBe(200);

    const secondCustomer = await request(app)
      .post('/customers')
      .send({
        name: 'Jane Doe',
        address: {
          street: 'Second St',
          number: 321,
          zip: '54321',
          city: 'Cupertino',
          state: 'CA',
        },
      });
    expect(secondCustomer.status).toBe(200);

    const response = await request(app).get('/customers').send();
    expect(response.status).toBe(200);
    expect(response.body.customers).toHaveLength(2);
    expect(response.body.customers[0].name).toBe('John Doe');
    expect(response.body.customers[1].name).toBe('Jane Doe');
    expect(response.body.customers[0].address.street).toBe('Main St');
    expect(response.body.customers[1].address.street).toBe('Second St');

    const listResponseXML = await request(app)
      .get('/customers')
      .set('Accept', 'application/xml')
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      '<?xml version="1.0" encoding="UTF-8"?>'
    );
    expect(listResponseXML.text).toContain('<customers>');
    expect(listResponseXML.text).toContain('<customer>');
    expect(listResponseXML.text).toContain('<name>John Doe</name>');
    expect(listResponseXML.text).toContain('<address>');
    expect(listResponseXML.text).toContain('<street>Main St</street>');
    expect(listResponseXML.text).toContain('<number>123</number>');
    expect(listResponseXML.text).toContain('<zip>12345</zip>');
    expect(listResponseXML.text).toContain('<city>New York</city>');
    expect(listResponseXML.text).toContain('<state>NY</state>');
  });
});
