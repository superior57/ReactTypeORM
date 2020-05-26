/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:25:07
 * @modify date 2020-05-17 18:25:07
 * @desc [description]
 */
/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-11 23:24:01
 * @modify date 2020-05-11 23:24:01
 * @desc Mis rutas
 */

import { Router } from 'express';
//Request, Response
import auth from './auth.routes';
import user from './medUser.routes';
import medicos from './medicos.routes';
import citas from './citas.routes';
import oficinas from './oficinas.routes';
import cliente from './cliente.routes';
import vademecum from './vademecum.routes';

const routes = Router();

// const citas = require('./citas');
// const oficinas = require('./oficinas');

//
// const { getUsers } = require('../controllers/index.controller')

// global.__root = __dirname + '/';

// rutas de atenticacion
// router.use('/api/citas', VerifyToken, citas)
// router.use('/api/auth', AuthController);
// router.use('/api/medicos', VerifyToken, medicos);
// router.use('/api/oficinas', VerifyToken, oficinas);

// // Clientes
// router.use('/cliente', VerifyToken, getUsers)

routes.use('/api/auth', auth);
routes.use('/user', user);
routes.use('/api/medicos', medicos);
routes.use('/api/citas', citas);
routes.use('/api/oficinas', oficinas);
routes.use('/api/clientes', cliente);
routes.use('/api/vademecum', vademecum);

export default routes;
