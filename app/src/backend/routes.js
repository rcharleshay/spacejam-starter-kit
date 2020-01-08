import { Router } from 'express'
import FrontendServices from './controllers/FrontendServices'

const Routes = Router()
Routes.post('/session/account/:category', FrontendServices.postAccountInSession)
Routes.post('/session/sub/:category', FrontendServices.postSubscriberInSession)
Routes.post('/customer/:account/:category', FrontendServices.postSubscribers)
Routes.get('/search/customer/:subscriber/:category', FrontendServices.searchSubscriber)

export default Routes
