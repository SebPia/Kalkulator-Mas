import React, { useState } from 'react';
import '../Styles/kalkulator.scss'
import Picture from '../Components/Picture';
import NavBar from '../Components/Navbar.js';
import Form from '../Components/Form.js';
import Score from '../Components/Score.js';
import Lists from '../Components/Lists.js';
import { useSelector } from 'react-redux';




export default function Kalkulator ()
{
   const weight = useSelector( state => state.kalkulatorPageReducer.weight )

   return (
      <>
         <div className='kalkulatorPage_main'>
            <NavBar />

            <section id="Kalkulator-Container">
               <Picture />

               { weight === 0 ? < Form /> : <Score /> }
            </section>

         </div >

         <aside>
            <Lists />
         </aside>
      </>
   )
}
