import express from "express";
import UsersController from '../Controllers/UsersController.js'
import auth from "../Middleware/auth.js";
const router = express.Router()

router.post( '/login', UsersController.login )
router.post( '/register', UsersController.register )
router.get( '/verify', auth, () =>
{
   console.log( req.user )
} )

export default router