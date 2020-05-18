import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";

import Reservas  from '../controllers/ReservasController'

const router = Router();
//Login route
router.get("/:id([0-9]+)", [checkJwt], Reservas.getReservasbyMedico);
// router.patch("/:id([0-9]+)", [checkJwt], DoctorController.editMedico);

export default router;