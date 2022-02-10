import React from 'react';
import kalkulatorPageActions from '../Redux/actions/KalkulatorPage.js';
import { useDispatch, useSelector } from 'react-redux';


import Profil from '../Public/ProfilBig.png'
import PretK from '../Public/PretKBig.png'
import Rura from '../Public/RuraBig.png'
import PretO from '../Public/PretOBig.png'
import Katownik from '../Public/KatownikBig.png'


export default function Picture ()
{

   const { view_change } = kalkulatorPageActions
   const view = useSelector( state => state.kalkulatorPageReducer.view )
   const dispatch = useDispatch()

   const whichOnePic = () =>
   {
      switch ( view )
      {
         case 'Profil':
            return Profil

         case 'PrętK':
            return PretK

         case 'Rura':
            return Rura

         case 'PrętO':
            return PretO

         case 'Katownik':
            return Katownik
      }
   }



   return <figure>
      {
         <img src={ whichOnePic() } alt="404" />
      }
   </figure>;
}
