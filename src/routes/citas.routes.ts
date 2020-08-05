import { Router } from "express";
// import { checkJwt } from "../middlewares/checkJwt";

import Reservas from "../controllers/ReservasController";

const router = Router();

router.get("/:id([0-9]+)", Reservas.getReservasbyMedico);
router.put("/:id([0-9]+)", Reservas.setReservaByOficina);

export default router;
