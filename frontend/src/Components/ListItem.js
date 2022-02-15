import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import kalkulatorPageActions from '../Redux/actions/KalkulatorPage';

export default function ListItem ( { id } )
{
   const activeListItems = useSelector( state => state.kalkulatorPageReducer.activeListItems )
   const dispatch = useDispatch()

   const handleDeleteItemFromList = async ( e ) =>
   {
      try
      {
         const item_id = e.target.parentElement.parentElement.parentElement.id
         await axios.delete( `api/items/${ item_id }`, { headers: { Authorization: localStorage.getItem( 'token' ) } } )
         dispatch( kalkulatorPageActions.deleteItemFromList( item_id ) )

      } catch ( error ) { { return console.log( error ) } }

   }

   const handleAmountChange = async ( e, option ) =>
   {
      try
      {
         const item_id = e.target.parentElement.parentElement.id
         let amount = Number( document.querySelector( `#item_amount${ item_id }` ).innerHTML )
         console.log( amount )
         switch ( option )
         {
            case 'decress':
               amount -= 1
               break
            case 'incress':
               amount += 1
               break
            default: break;
         }

         const response = await axios.put( `api/items/${ item_id }`, { amount }, { headers: { Authorization: localStorage.getItem( 'token' ) } } )
         return dispatch( kalkulatorPageActions.updateActiveListItems( response.data.item ) )
      } catch ( error ) { return console.log( error ) }
   }

   const getItemsFromList = async () =>
   {
      try
      {
         const response = await axios.get( `/api/items/${ id }`, { headers: { Authorization: localStorage.getItem( 'token' ) } } )
         dispatch( kalkulatorPageActions.setActiveListItems( response.data ) )
      } catch ( error ) { if ( error ) return console.log( error ) }
   }




   useEffect( () =>
   {
      getItemsFromList()
   }, [] );



   return (
      <>
         {
            activeListItems.length > 0 ?
               activeListItems.map( ( { _id, name, weight, surface, amount, price } ) => (
                  <li key={ _id } id={ _id }>
                     <header className='item_header'>
                        <p className='item_tittle'>{ name }</p>
                        <nav> <button className="item_button" onClick={ handleDeleteItemFromList }>X</button> </nav>
                     </header>

                     <section className='item_stats'>
                        <p>
                           { ( weight * amount ).toFixed( 2 ) }
                           <span className='unit'> kg</span>
                        </p>

                        <p>
                           { ( surface * amount ).toFixed( 2 ) }
                           <span className='unit'> m2</span>
                        </p>

                        <p>
                           { ( price * amount ).toFixed( 2 ) }
                           <span className='unit'> zł</span>
                        </p>
                     </section>

                     <section className='item_counter'>
                        <button onClick={ ( e ) => handleAmountChange( e, 'decress' ) }>-</button>
                        <p className='item_amount' id={ `item_amount${ _id }` }>{ amount }</p>
                        <button onClick={ ( e ) => handleAmountChange( e, "incress" ) }>+</button>
                     </section>
                  </li>
               ) )
               :
               <p>Brak elementów w liście</p>
         }

      </>
   )
}
