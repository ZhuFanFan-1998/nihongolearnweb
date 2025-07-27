const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users/:name', userController.getUser);
router.put('/users/:name', userController.updateUser);
router.delete('/users/:name', userController.deleteUser);
router.get('/users', userController.getAllUsers);

module.exports = router;