
import ListsModel from "../Models/ListsModel.js"


const ListsController = {
   getUsersList: async ( req, res ) =>
   {
      try
      {
         const list = await ListsModel.find( { user_id: req.user.id } )
         return res.status( 200 ).json( list )
      } catch ( error ) { if ( error ) return res.status( 500 ).json( { msg: "Nie udało się pobrać list" } ) }
   },

   addList: async ( req, res ) =>
   {
      try
      {
         const newList = await new ListsModel( {
            name: req.body.name,
            user_id: req.user.id
         } ).save()

         return res.status( 200 ).json( { msg: "dodano liste", newList } )

      } catch ( error ) { if ( error ) return res.status( 500 ).json( { msg: "Nie udało się dodać listy" } ) }
   },


   deleteList: async ( req, res ) =>
   {
      try
      {
         const { id } = req.params
         const deletedItem = await ListsModel.findOneAndRemove( { _id: id } )
         console.log( deletedItem )
         return res.status( 200 ).json( { msg: "usunięto liste", deletedItem } )


      } catch ( error ) { if ( error ) return res.status( 500 ).json( { msg: "Nie udało się usunąć  listy" } ) }
   }
}


export default ListsController