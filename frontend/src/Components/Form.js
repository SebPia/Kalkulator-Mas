import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import kalkulatorPageActions from '../Redux/actions/KalkulatorPage';
import MathFunctions from '../MathFunctions';
export default function Form ()
{

   const view = useSelector( state => state.kalkulatorPageReducer.view )
   const dispatch = useDispatch()



   const [inputs, updateInputs] = useState( {
      a: null,
      b: null,
      c: null,
      d: null
   } )

   const handleInputs = ( e ) =>
   {
      updateInputs( { ...inputs, [e.target.name]: e.target.value } )
   }

   const whichInputs = () =>
   {
      switch ( view )
      {
         case 'Profil':
            return (
               <>
                  <input type="number" name="a" onChange={ handleInputs } id="a" placeholder="A: Bok 1" />
                  <input type="number" name="b" onChange={ handleInputs } id="b" placeholder="B: Bok 2" />
                  <input type="number" name="d" onChange={ handleInputs } id="d" placeholder="D: Grubość scianki" />
                  <input type="number" name="c" onChange={ handleInputs } id="c" placeholder="C: Długość sztangi" />
               </>
            )

         case 'PrętK':
            return (
               <>
                  <input type="number" name="a" onChange={ handleInputs } id="a" placeholder="bok A:" />
                  <input type="number" name="b" onChange={ handleInputs } id="b" placeholder="bok B:" />
                  <input type="number" name="c" onChange={ handleInputs } id="c" placeholder="Dlugosc sztangi:" />
               </>
            )

         case 'Rura':
            return (
               <>
                  <input type="number" name="a" onChange={ handleInputs } id="a" placeholder="A: średnica:" />
                  <input type="number" name="b" onChange={ handleInputs } id="b" placeholder="B: Grubość ścianki:" />
                  <input type="number" name="c" onChange={ handleInputs } id="c" placeholder="C: Długość sztangi" />
               </>
            )

         case 'PrętO':
            return <>
               <input type="number" name="a" onChange={ handleInputs } id="a" placeholder="A: średnica" />
               <input type="number" name="b" onChange={ handleInputs } id="b" placeholder="B: Dlugosc sztangi:" />
            </>

         case 'Katownik':
            return <>
               <input type="number" name="a" onChange={ handleInputs } id="a" placeholder="bok A:" />
               <input type="number" name="b" onChange={ handleInputs } id="b" placeholder="bok B:" />
               <input type="number" name="c" onChange={ handleInputs } id="c" placeholder="Dlugosc sztangi:" />
               <input type="number" name="d" onChange={ handleInputs } id="d" placeholder="Grubosc sianki" />
            </>

         default: break;
      }
   }

   const handleSubmit = ( e ) =>
   {
      e.preventDefault()

      let payload = {}
      switch ( view )
      {
         case 'Profil':
            payload = MathFunctions.profil( inputs )
            break

         case 'PrętK':
            payload = MathFunctions.pret_k( inputs )
            break

         case 'PrętO':
            payload = MathFunctions.pret_o( inputs )
            break

         case 'Rura':
            payload = MathFunctions.rura( inputs )
            break

         default: break;
      }

      dispatch( kalkulatorPageActions.score_set( payload ) )
   }

   return (
      <form>
         {
            whichInputs()
         }
         <input type="submit" onClick={ handleSubmit } value="Licz"></input>
      </form>
   )
}
