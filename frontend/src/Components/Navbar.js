import React from 'react';
import kalkulatorPageActions from '../Redux/actions/KalkulatorPage.js';
import { useDispatch, useSelector } from 'react-redux';

import ProfilIcon from '../Public/ProfilIcon.png'
import PrętKIcon from '../Public/PretIcon.png'
import RuraIcon from '../Public/RuraIcon.png'
import PrętOIcon from '../Public/PretOIcon.png'
import KatownikIcon from '../Public/KatownikIcon.png'


export default function Navbar ()
{


   const { view_change } = kalkulatorPageActions
   const view = useSelector( state => state.kalkulatorPageReducer.view )
   const dispatch = useDispatch()


   const KalkulatorMenu = [
      { tittle: 'Profil', url: ProfilIcon, view: 'Profil' },
      { tittle: 'Pręt Kwadratowy', url: PrętKIcon, view: 'PrętK' },
      { tittle: 'Rura', url: RuraIcon, view: 'Rura' },
      { tittle: 'Pręt okrągły', url: PrętOIcon, view: 'PrętO' },
      { tittle: 'Kątownik', url: KatownikIcon, view: 'Katownik' },
   ]


   return (
      <header>
         <nav>
            <ol className='KalkulatorMenu'>
               {
                  KalkulatorMenu.map( el => (
                     <li onClick={ () => dispatch( view_change( el.view ) ) } className={ view === el.view ? 'active' : null }>
                        <figure>
                           <figcaption>{ el.tittle }</figcaption>
                           <img src={ el.url } alt={ el.tittle } />
                        </figure>
                     </li>
                  ) )
               }
            </ol>
         </nav>
      </header>
   );
}
