import express from 'express'
import itemsController from "../Controllers/ItemsController.js"


const router = express.Router()


router.get( '/:list', itemsController.getItems )
router.post( '/:list', itemsController.addItem )
router.delete( '/:id', itemsController.deleteItem )


export default router