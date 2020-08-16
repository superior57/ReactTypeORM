/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-11 23:24:01
 * @modify date 2020-05-11 23:24:01
 * @desc Mis rutas
 */

import { Router } from 'express';

import auth from './auth.routes';
import user from './medUser.routes';
import medicos from './medicos.routes';
import citas from './citas.routes';
import oficinas from './oficinas.routes';
import cliente from './cliente.routes';
import vademecum from './vademecum.routes';
import especializacion from './especializacion.routes';
import recetas from './recetas.routes';
import pagos from './pagos.routes';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/user', user);
routes.use('/api/medicos', medicos);
routes.use('/api/citas', citas);
routes.use('/api/oficinas', oficinas);
routes.use('/api/clientes', cliente);
routes.use('/api/vademecum', vademecum);
routes.use('/api/especializacion', especializacion);
routes.use('/api/recetas', recetas);
routes.use('/api/pagos', pagos);

routes.use('/api/app/especializacions', especializacion);
routes.use('/api/app/clientes', cliente);

export default routes;
