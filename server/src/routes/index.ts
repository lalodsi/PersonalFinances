import { Router } from 'express'

import movementsRouter from './movements'
import usersRouter from './users'

const router = Router()

router.use('/users', usersRouter)
router.use('/movements', movementsRouter)

export default router