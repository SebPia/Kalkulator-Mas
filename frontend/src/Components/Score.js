
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Score ()
{
   const lists = useSelector( state => state.kalkulatorPageReducer.lists )
   const weight = useSelector( state => state.kalkulatorPageReducer.weight )
   const surface = useSelector( state => state.kalkulatorPageReducer.surface )
   const itemName = useSelector( state => state.kalkulatorPageReducer.itemName )
   const [msg, setMsg] = useState( '' )
   // Api request


   const returnMainForm = ( e ) =>
   {

   }


   const addItemToList = async ( e ) =>
   {
      try
      {
         e.preventDefault()
         const list_id = document.querySelector( '#selectList' ).value
         const priceInput = document.querySelector( '#price' ).value
         let name = document.querySelector( '#itemName' ).value
         let price
         if ( name.length === 0 ) name = itemName
         if ( priceInput === 0 ) price = 0
         else price = priceInput * weight


         const response = await axios.post( `/api/items/${ list_id }`, { name, weight, surface, price }, { headers: { Authorization: localStorage.getItem( 'token' ) } } )
         setMsg( response.data.msg )
      } catch ( error ) { if ( error ) console.log( error ) }
   }





   return (
      <section id="section_score">
         <p>Waga: { weight } kg</p>
         <p>Powierzchnia malowana: { surface } m2  </p>


         {
            lists.length === 0 ? <button disabled style={ { opacity: '0.4' } }> Nie masz list - nie możesz nic do nich dodać</button> :
               <>
                  <div>
                     <label for="itemName"> Nazwa w liście </label>
                     <input type="text" id="itemName" />
                  </div>

                  <div>
                     <label for="price"> Cena za kg </label>
                     <input type="Number" step="0.1" id="price" />
                  </div>

                  <div>
                     <label for="selectList">Wybierz liste</label>
                     <select id="selectList" name="list" defaultValue={ lists[0]._id } onChange={ () => setMsg( '' ) }>
                        {
                           lists.map( ( { _id, name } ) => <option id={ _id } value={ _id }>{ name }</option> )
                        }
                     </select>
                  </div>
                  <div>
                     <button onClick={ returnMainForm }>Licz następny</button>
                     <button onClick={ addItemToList }> add item to list</button>
                  </div>
                  { msg !== '' ? <p className="msg">{ msg }</p> : null }
               </>
         }

      </section >
   )
}
