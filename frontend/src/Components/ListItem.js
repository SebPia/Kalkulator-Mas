import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import kalkulatorPageActions from '../Redux/actions/KalkulatorPage';

export default function ListItem ( { id } )
{
   const items = useSelector( state => state.kalkulatorPageReducer.activeListItems )
   const dispatch = useDispatch()

   useEffect( () =>
   {
      const getItemsFromList = async () =>
      {
         try
         {
            const response = await axios.get( `/api/items/${ id }`, { headers: { Authorization: localStorage.getItem( 'token' ) } } )
            console.log( response.data )
            dispatch( kalkulatorPageActions.setActiveListItems( response.data ) )
         } catch ( error ) { if ( error ) return console.log( error ) }
      }
      getItemsFromList()

   }, [] );

   return (
      <>
         {
            items.length > 0 ?
               items.map( ( { _id, name, weight, surface, amount } ) => (
                  <li key={ _id }>
                     <header className='item_header'>
                        <p className='item_tittle'>{ name }</p>
                        <nav> <button className="item_button">X</button> </nav>
                     </header>

                     <section className='item_stats'>
                        <p>
                           { weight }
                           <span className='unit'> kg</span>
                        </p>

                        <p>
                           { surface }
                           <span className='unit'> m2</span>
                        </p>

                        <p>
                           200
                           <span className='unit'> zł</span>
                        </p>
                     </section>

                     <section className='item_counter'>
                        <button>-</button>
                        <p className='item_amount'>{ amount }</p>
                        <button>+</button>
                     </section>
                  </li>
               ) )
               :
               <p>Brak elementów w liście</p>
         }

      </>
   )
}
