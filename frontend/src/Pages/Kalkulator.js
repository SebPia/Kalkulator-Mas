import React, { useState } from 'react';
import '../Styles/kalkulator.scss'
import Picture from '../Components/Picture';
import NavBar from '../Components/Navbar.js';
import Form from '../Components/Form.js';
import Score from '../Components/Score.js';
import Lists from '../Components/Lists.js';




export default function Kalkulator ()
{

   const [score, setScore] = useState( { weight: 0, surface: 0 } )


   return (
      <>
         <div className='kalkulatorPage_main'>

            <NavBar />

            <section id="Kalkulator-Container">
               <Picture />
               <Form />
            </section>
         </div >

         <aside>
            <Score />
            <Lists />
         </aside>
      </>
   )
}
