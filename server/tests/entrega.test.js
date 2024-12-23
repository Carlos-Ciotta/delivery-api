const Entrega = require('../models/entrega'); // Mock do modelo
const entregaController = require('../controllers/entrega'); // Controller que será testado

jest.mock('../models/entrega'); // Mock Mongoose Model

describe('Entrega Controller Tests', () => {
  describe('getAll', () => {
    it('deve retornar uma lista de entregas filtrada para tipo "usuario"', async () => {
      const req = { params: { tipo: 'usuario' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockEntregas = [
        { id_entrega: 1, nome_cliente: 'Cliente 1', situacao: 'Aguardando' },
      ];

      Entrega.find.mockResolvedValue(mockEntregas);

      await entregaController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockEntregas);
    });

    it('deve retornar um erro 500 em caso de falha no servidor', async () => {
      const req = { params: { tipo: 'usuario' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Entrega.find.mockRejectedValue(new Error('Erro no banco'));

      await entregaController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro interno no servidor' });
    });
  });

  describe('getById', () => {
    it('deve retornar uma entrega específica pelo id', async () => {
      const req = { params: { id_entrega: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockEntrega = { id_entrega: 1, nome_cliente: 'Cliente 1' };

      Entrega.findOne.mockResolvedValue(mockEntrega);

      await entregaController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockEntrega);
    });

    it('deve retornar erro se a entrega não for encontrada', async () => {
      const req = { params: { id_entrega: 2 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Entrega.findOne.mockResolvedValue(null);

      await entregaController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Entrega não encontrada');
    });
  });

  describe('createNew', () => {
    it('deve criar uma nova entrega', async () => {
      const req = {
        body: {
          id_entrega: 3,
          id_veiculo: 1,
          nome_cliente: 'Cliente Novo',
          bairro: 'Bairro Novo',
          situacao: 'Aguardando',
          data_entrega: '2023-12-01',
          hora_entrega: '12:00',
          observacao: 'Sem observação',
          vendedor: 'Vendedor 1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Entrega.findOne.mockResolvedValue(null);
      Entrega.prototype.save = jest.fn().mockResolvedValue(req.body);

      await entregaController.createNew(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('deve retornar erro ao criar uma entrega existente', async () => {
      const req = { body: { id_entrega: 3 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Entrega.findOne.mockResolvedValue({ id_entrega: 3 });

      await entregaController.createNew(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Entrega ja existe' });
    });
  });
});
