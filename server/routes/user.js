const express = require('express');
const router = express.Router();
const User = require('../controllers/user'); 

router.get('/user/getall', User.getAll);
router.get('/user/getall/:id', User.getById)
router.post('/user/getall', User.Insert)
router.update('/user/getall/:id_user', User.Update)
router.delete('/user/getall/:id_user', User.Delete)
router.post('/uer/login', User.Login)
module.exports = router;