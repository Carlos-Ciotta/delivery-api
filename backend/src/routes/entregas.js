const express = require('express');
const router = express.Router();
const Entrega = require('../controllers/entregas'); 

router.get('/entregas/getoperador/:tipo/:id_veiculo/:situacao', Entrega.getAll);
router.get('/entregas/getusuario/:tipo', Entrega.getAll);

router.get('/entregas/entregues/:quantidade', Entrega.getLeast);
router.post('/entregas', Entrega.createNew);
router.get('/entregas/:id_entrega', Entrega.getById);
router.delete('/entregas/:id_entrega', Entrega.deleteEntrega);
router.put('/entregas/:tipo/:id_entrega', Entrega.update);
router.put('/entregas/veiculo/:tipo/:id_entrega/:id_veiculo/:situacao', Entrega.update);



module.exports = router;