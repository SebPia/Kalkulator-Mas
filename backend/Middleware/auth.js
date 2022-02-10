import jwt from 'jsonwebtoken'
import UsersModel from '../Models/UsersModel.js'

const auth = async ( req, res, next ) =>
{
   try
   {
      const token = req.header( "Authorization" )
      if ( !token ) return res.status( 400 ).json( { msg: "Brak nagłówka Authorization" } )

      const user = await jwt.verify( token, process.env.SECRET, async ( err, payload ) =>
      {
         if ( err ) return res.status( 401 ).json( { msg: "Nie rozpoznajemy tego tokenu." } )
         const user = await UsersModel.findOne( { _id: payload.id } )
         req.user = user
         next()
      } )
   } catch ( error )
   {
      return res.status( 500 ).json( { msg: "Coś poszło nie tak - autoryzacja", error: error } )
   }
}


export default auth