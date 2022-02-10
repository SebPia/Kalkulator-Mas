import UsersModel from '../Models/UsersModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const UsersController = {
   register: async ( req, res ) =>
   {
      try
      {
         const { username, email, password, password2 } = req.body

         // Walidacja
         if ( username.length < 5 ) return res.status( 400 ).json( { msg: "Nazwa użytkownika za krótka" } )
         if ( password.length < 7 ) return res.status( 400 ).json( { msg: "Hasło powinno zawierać przynajmniej 7 znaków" } )
         if ( password !== password2 ) return res.status( 400 ).json( { msg: "Hasła nie pasują" } )
         if ( await checkIfAlreadyExist( username, email ) === true ) return res.status( 409 ).json( { msg: "Email lub nazwa użytkownika zajęta" } )


         const passwordHashed = await bcrypt.hash( password, 5 )
         const newUser = new UsersModel( { username, email, password: passwordHashed } )
         await newUser.save()
         return res.status( 200 ).json( { msg: "zarejestrowano" } )

      }

      catch ( error )
      {
         console.log( error )
         res.status( 500 ).json( { error: "Serwer napotkał problem." } )
      }
   },




   login: async ( req, res ) =>
   {
      try
      {
         const { username, password } = req.body
         if ( username.length < 5 ) return res.status( 400 ).json( { msg: "Login za krótki" } )
         if ( password.length < 7 ) return res.status( 400 ).json( { msg: "Hasło powinno zawierać przynajmniej 7 znaków" } )

         let user = null
         user = await UsersModel.findOne( { username } )
         if ( user === null ) user = await UsersModel.findOne( { email: username } )
         if ( user === null ) return res.status( 400 ).json( { msg: "Brak takiego użytkownika" } )
         if ( await bcrypt.compare( password, user.password ) === false ) return res.status( 401 ).json( { msg: "Nie poprawne dane logowania" } )

         const payload = { id: user._id, username: user.username }
         const token = await jwt.sign( payload, process.env.SECRET, { expiresIn: '1d' } )
         return res.status( 200 ).json( { msg: "zalogowano", token } )

      } catch ( error )
      {
         if ( error ) return console.log( error )
      }
   },

}

export default UsersController




//Sprawdzanie czy istnieje juz podany email lub nazwa uzytkownika
async function checkIfAlreadyExist ( username, email )
{
   try
   {
      const isLoginExist = await UsersModel.findOne( { username } )
      const isEmailExist = await UsersModel.findOne( { email } )
      if ( isEmailExist === null && isLoginExist === null ) return false
      else return true
   } catch ( error )
   {
      if ( error ) return res.status( 500 )
   }
}



