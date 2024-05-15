const express = require('express')
const router = express.Router()

router.get('/', IdeiaController.showIdeia)

module.exports = router