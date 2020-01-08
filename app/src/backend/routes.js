import { Router } from 'express'
import FrontendServices from './controllers/FrontendServices'

const Routes = Router()
Routes.post('/placeholder', FrontendServices.placeholder)

export default Routes
