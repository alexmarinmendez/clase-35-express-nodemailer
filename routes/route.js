const router = require('express').Router()
const { signup, getbill } = require('../controllers/appController.js')

router.post('/user/signup', signup)
router.post('/products/getbill', getbill)

module.exports = router