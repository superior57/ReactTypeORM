/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:25:24
 * @modify date 2020-05-17 18:25:24
 * @desc [description]
 */

import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
// import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
// router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
router.get("/", [checkJwt], UserController.listAll);

// Get one user
// router.get("/:id([0-9]+)",[checkJwt, checkRole(["ADMIN"])],UserController.getOneById );
router.get("/:id([0-9]+)", [checkJwt], UserController.getOneById);

//Create a new user
// router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);
router.post("/", [checkJwt], UserController.newUser);

//Edit one user
// router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], UserController.editUser );
router.patch("/:id([0-9]+)", [checkJwt], UserController.editUser);

//Delete one user
// router.delete( "/:id([0-9]+)",[checkJwt, checkRole(["ADMIN"])],UserController.deleteUser);
router.delete("/:id([0-9]+)", [checkJwt], UserController.deleteUser);

export default router;