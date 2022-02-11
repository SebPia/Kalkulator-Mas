import { useEffect, useState, useReducer } from "react";
import React from 'react';
import axios from 'axios'
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import kalkulatorPageActions from "../Redux/actions/KalkulatorPage";

export default function Lists ()
{
   const lists = useSelector( state => state.kalkulatorPageReducer.lists )
   const activeList = useSelector( state => state.kalkulatorPageReducer.activeList )
   const dispatch = useDispatch()

   const [inputs, setInputs] = useState( { name: '' } )



   // Simple handlers
   const handleListClick = ( e ) =>
   {
      const id = e.target.id
      const hiddenlist = document.querySelector( `#itemsList_${ id }` )
      console.log( hiddenlist.style.display )
      if ( hiddenlist.style.display === 'block' ) return hiddenlist.style.display = 'none'
      if ( hiddenlist.style.display === 'none' ) return hiddenlist.style.display = 'block'
   }


   const handleListOpening = ( e ) =>
   {
      const id = e.target.id
      if ( id === activeList ) return dispatch( kalkulatorPageActions.setActiveList( null ) )
      return dispatch( kalkulatorPageActions.setActiveList( id ) )
   }


   const handleInputs = function ( e )
   {
      const { name, value } = e.target
      setInputs( { ...inputs, [name]: value } )
   }


   // Api requests
   const getUsersLists = async () =>
   {
      try
      {
         const response = await axios.get( '/api/lists', { headers: { Authorization: localStorage.getItem( 'token' ) } } )
         return dispatch( kalkulatorPageActions.lists_update( response.data ) )

      } catch ( error )
      {
         if ( error ) return console.error( error )
      }
   }

   const deleteList = async ( e ) =>
   {

      try
      {
         const id = e.target.id
         const response = await axios.delete( `/api/lists/${ id }`, { headers: { Authorization: localStorage.getItem( 'token' ) } } )
         dispatch( kalkulatorPageActions.list_delete( response.data.deletedItem ) )
      } catch ( error )
      {
         if ( error ) console.log( error )
      }

   }

   const addList = async ( e ) =>
   {
      try
      {
         const response = await axios.post( '/api/lists', { name: inputs.name }, { headers: { Authorization: localStorage.getItem( 'token' ) } } )
         return dispatch( kalkulatorPageActions.list_add( response.data.newList ) )

      } catch ( error ) { if ( error ) return console.log( error ) }
   }


   useEffect( () =>
   {
      getUsersLists()
   }, [] );



   return (
      <section id="section_lists">
         <header>Lists</header>
         {
            lists.length === 0 ?
               <p>Troche tu pusto, dodaj nową liste! </p>
               :
               (
                  <ol>
                     {
                        lists.map( ( { _id, name } ) => (
                           <>
                              <li className='list' key={ `list_${ _id }` } >
                                 <div>
                                    <p onClick={ handleListOpening } id={ _id }> { name } </p>
                                    <span className="deleteBTN" onClick={ deleteList } id={ _id }>X</span>
                                 </div>


                                 {
                                    activeList === _id ? (
                                       <ul className='hiddenlist' key={ `itemsList_${ _id }` } id={ `itemsList_${ _id }` }>
                                          <ListItem id={ _id } />
                                       </ul>
                                    ) : null
                                 }

                              </li>
                           </>
                        ) )
                     }
                  </ol>
               )
         }

         <div className='lists_options'>
            <input type="text" placeholder='Nazwa nowej listy' name="name" onChange={ handleInputs } value={ inputs.name } />
            <button onClick={ addList }> Add List</button>
         </div>
      </section >
   );
}
