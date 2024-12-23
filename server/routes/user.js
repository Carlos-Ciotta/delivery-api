const express = require('express');
const router = express.Router();
const User = require('../controllers/user'); 

router.get('/user/getall', User.getAll);
router.get('/user/getid/:id', User.getById)
router.post('/user/post', User.Insert)
router.put('/user/put/:id_user', User.Update)
router.delete('/user/delete/:id_user', User.Delete)
router.post('/uer/login', User.Login)
module.exports = router;