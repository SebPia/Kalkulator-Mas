import express from "express";
import ListsController from "../Controllers/ListsController.js"

const router = express.Router()

// Wyswietl listy użytkownika
// Dodaj liste o id
// Usun liste o id

router.get( '/', ListsController.getUsersList )
router.post( '/', ListsController.addList )
router.delete( '/:id', ListsController.deleteList )


export default router