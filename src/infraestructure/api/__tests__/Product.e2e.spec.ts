import request from 'supertest';
import { app, sequelize } from '../express';

describe('[E2E] Product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should be able to create a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product 1',
      price: 10,
    });
    console.log('response: ', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(10);
  });

  it('should receive an error when create a product with invalid data', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product 1',
    });
    expect(response.status).toBe(500);
  });

  it('should be able to list all products', async () => {
    const firstProduct = await request(app).post('/products').send({
      name: 'Product 1',
      price: 10,
    });
    expect(firstProduct.status).toBe(200);

    const secondProduct = await request(app).post('/products').send({
      name: 'Product 2',
      price: 20,
    });
    expect(secondProduct.status).toBe(200);

    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.products[0].name).toBe('Product 1');
    expect(response.body.products[0].price).toBe(10);
    expect(response.body.products[1].name).toBe('Product 2');
    expect(response.body.products[1].price).toBe(20);
  });
});
