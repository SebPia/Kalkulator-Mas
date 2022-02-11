import ItemsModel from "../Models/ItemsModel.js"


const itemsController = {
   getItems: async ( req, res ) =>
   {
      try
      {
         const list_id = req.params.list
         const items = await ItemsModel.find( { list_id } )
         return res.status( 200 ).json( items )
      } catch ( error )
      {
         return res.status( 500 ).json( { msg: "Nie udało się pobrać itemów z listy" } )
      }
   },
   addItem: async ( req, res ) =>
   {
      console.log( 'dodaje item' )
      try
      {
         const { name, weight, surface, price } = req.body
         const list_id = req.params.list
         const newItem = await new ItemsModel( { name, weight, surface, list_id, price } )
         await newItem.save()
         res.status( 200 ).json( { msg: "Dodano zadanie do listy" } )
      } catch ( error )
      {
         if ( error )
         {
            console.log( error )
            return res.status( 500 ).json( { msg: "Błąd przy dodawaniu pozycji do listy" } )
         }
      }
   },
   deleteItem: async ( req, res ) =>
   {
      try
      {
         const _id = req.params.id
         await ItemsModel.findOneAndDelete( { _id } )
         res.status( 200 ).json( { msg: "usunięto z listy" } )
      } catch ( error )
      {
         return res.status( 500 ).json( { msg: "Błąd przy usuwaniu pozycji do listy" } )
      }
   },
}


export default itemsController