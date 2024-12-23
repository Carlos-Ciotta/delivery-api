const request = require('supertest');
const app = require('../app'); 

describe('Testando rotas de usuários', () => {
  
  test('GET /user/getall deve retornar status 200 e uma lista de usuários', async () => {
    const response = await request(app).get('/user/getall');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('List of users');
  });

  test('POST /api/users deve criar um usuário e retornar status 201', async () => {
    const newUser = { id_user: 1, password: '123', tipo:'insere-entregas' };
    const response = await request(app).post('/user/post').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created');
    expect(response.body.user.id_user).toBe(newUser.id_user);
    expect(response.body.user.password).toBe(newUser.password);
    expect(response.body.user.tipo).toBe(newUser.tipo)
  });

  test('POST /api/users sem nome ou email deve retornar status 400', async () => {
    const response = await request(app).post('/user/post').send({ id_user: '', tipo: '' });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name and email are required');
  });

});
