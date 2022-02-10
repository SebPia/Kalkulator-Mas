import React, { useState } from 'react'
import '../Styles/loginPage.scss'
import '../Styles/loader.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import loginPageActions from '../Redux/actions/LoginPage'

export default function LoginPage () 
{
   const { msg_clear, msg_set, loader_off, loader_on, view_change } = loginPageActions
   const msg = useSelector( state => state.loginPageReducer.msg )
   const view = useSelector( state => state.loginPageReducer.view )
   const loader = useSelector( state => state.loginPageReducer.loader )
   const dispatch = useDispatch()

   const [inputs, setInputs] = useState( {
      username: '',
      password: '',
      password2: '',
      email: ''
   } )

   const handleInputs = function ( e )
   {
      const { name, value } = e.target
      setInputs( { ...inputs, [name]: value } )
   }


   const handleSubmit = async ( e ) =>
   {
      e.preventDefault()
      try 
      {
         dispatch( msg_clear() )
         dispatch( loader_on() )

         if ( !view )
         {
            // logowanie
            const query = await axios( {
               method: 'post',
               url: '/api/users/login',
               data: {
                  username: inputs.username,
                  password: inputs.password
               }
            } )

            const token = query.data.token
            localStorage.setItem( "token", token );
            return window.location.href = "/kalkulator"

         }
         else
         {
            //rejestracja
            const query = await axios( {
               method: 'post',
               url: '/api/users/register',
               data: {
                  username: inputs.username,
                  password: inputs.password,
                  password2: inputs.password2,
                  email: inputs.email
               }
            } )

            if ( query.status === 200 )
            {
               dispatch( msg_set( 'Zarejestrowano, możesz się zalogować' ) )
               dispatch( view_change() )
            }
         }
      }
      catch ( err ) 
      {
         if ( err ) return dispatch( msg_set( err.response.data.msg ) )
      }
      finally
      {
         dispatch( loader_off() )
      }
   }



   /////////////
   /// Renderowanie widoku
   /////////////


   return (
      <main>
         <div id="MainContainerStyle">
            <span id="thatWhitePartOnBottom"></span>
            <header>
               <h1 id="HeaderH1" >Kalkulator mas</h1>
            </header>



            <button className="Buttons" onClick={ () => dispatch( view_change( !view ) ) }>
               { view ?
                  `Already have account? Click to log in!`
                  :
                  `Doesn't have account? Click me if you want to register new one` }
            </button>


            <form onSubmit={ handleSubmit } id="Form">
               <input type="text"
                  value={ inputs.username }
                  placeholder={ view ? 'username' : 'Login or E-mail' }
                  name="username" required onChange={ handleInputs }
               />

               { view ?
                  <input type="email"
                     placeholder="email"
                     name="email"
                     value={ inputs.email }
                     required
                     onChange={ handleInputs } />
                  :
                  null
               }
               <input type="password"
                  value={ inputs.password }
                  placeholder="Password:"
                  name="password"
                  required
                  onChange={ handleInputs }
               />

               { view ?
                  <input type="password"
                     value={ inputs.password2 }
                     placeholder="Password again:"
                     name="password2"
                     required
                     onChange={ handleInputs } />
                  :
                  null
               }
               <input type="submit" className="Buttons" />

               { loader ? <span id="loader"></span> : null }
               { msg !== '' ? <p className="msg">{ msg }</p> : null }
            </form>
         </div>
      </main>
   )
}
