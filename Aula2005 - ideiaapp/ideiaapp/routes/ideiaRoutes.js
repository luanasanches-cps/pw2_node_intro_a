const express = require('express')
const router = express.Router()
const IdeiaController = require('../controllers/IdeiaController')

router.get('/add', IdeiaController.createIdeia) // <- vai solicitar a ideia
router.post('/add', IdeiaController.createIdeia) // <- vai postar/add a ideia
router.post('remove', IdeiaController.removeIdeia) // <- vai remover a ideia
router.get('/edit/:id', IdeiaController.updateIdeia) // <- vai fazer uma solicitação
                                                     // se a ideia foi atualizada
router.post('edit', IdeiaController.updateIdeiaPost) // <- posta a atualização
                                                     //da ideia
router.get('/dashboard', IdeiaController.dashboard) //solicita/retorna um dashboard
                                                    //de ideia
router.get('/', IdeiaController.showIdeias)

module.exports = router