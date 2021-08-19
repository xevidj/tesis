import express from 'express'
import { create, pay, reload } from './controller'

const router = express.Router()

router.route('/create').post(create)

router.route('/pay').post(pay)

router.route('/reload').post(reload)

export default router
