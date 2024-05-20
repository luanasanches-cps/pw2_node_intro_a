const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login)
router.post('/loginPost', AuthController.loginPost)
router.get('/register', AuthController.register)
router.post('/registerPost', AuthController.registerPost)
router.get('/logout', AuthController.logout) // <- apenas para destruir a sessão
//get quando é uma solicitação

module.exports = router