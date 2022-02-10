
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

   const addItemToList = async ( e ) =>
   {
      try
      {
         const list_id = document.querySelector( '#selectList' ).value
         const response = await axios.post( `/api/items/${ list_id }`, { name: itemName, weight, surface }, { headers: { Authorization: localStorage.getItem( 'token' ) } } )
         setMsg( response.data.msg )
      } catch ( error ) { if ( error ) console.log( error.response ) }
   }





   return (
      <section id="section_score">
         <header>Wynik</header>
         <p>Waga: { weight } kg</p>
         <p>Powierzchnia malowana: { surface } m2  </p>


         {
            lists.length === 0 ? <button disabled style={ { opacity: '0.4' } }> Nie masz list - nie możesz nic do nich dodać</button> :
               <>
                  <select id="selectList" name="list" defaultValue={ lists[0]._id } onChange={ () => setMsg( '' ) }>
                     {
                        lists.map( ( { _id, name } ) => <option id={ _id } value={ _id }>{ name }</option> )
                     }
                  </select>

                  <button onClick={ addItemToList }> add item to list</button>
                  { msg !== '' ? <p className="msg">{ msg }</p> : null }
               </>
         }

      </section >
   )
}
