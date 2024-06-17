const express = require('express')
const router = express.Router()
const IdeiaController = require('../controllers/IdeiaController')

router.get('/add', IdeiaController.createIdeia)
router.post('/add', IdeiaController.createIdeiaSave)
router.post('remove', IdeiaController.removeIdeia)
router.get('/edit/:id',IdeiaController.updateIdeia)
router.post('edit', IdeiaController.updateIdeiaPost)
router.get('/dashboard', IdeiaController.dashboard)
router.get('/', IdeiaController.showIdeias)

module.exports = router