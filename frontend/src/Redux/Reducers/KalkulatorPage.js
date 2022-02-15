const INIT_STATE = {
   view: 'Profil',
   itemName: 'Profil',
   weight: 0,
   surface: 0,
   lists: [],
   activeList: null,
   activeListItems: []
}



const kalkulatorPageReducer = ( state = INIT_STATE, action ) =>
{
   switch ( action.type )
   {
      case 'VIEW_CHANGE':
         return { ...state, view: action.view }


      case 'SCORE_SET':
         const { itemName, weight, surface } = action.payload
         return {
            ...state,
            itemName,
            weight,
            surface
         }

      case 'LIST_UPDATE': return { ...state, lists: action.lists }

      case 'LIST_ADD': return { ...state, lists: [...state.lists, action.item] }

      case 'LIST_DELETE':
         let newList = [...state.lists].filter( el => el._id !== action.item._id )
         console.log( newList )
         return { ...state, lists: newList }

      case 'ACTIVE_LIST':
         return { ...state, activeList: action.id }

      case 'ACTIVE_LIST_ITEMS':
         return { ...state, activeListItems: action.payload }

      case 'UPDATE_ACTIVE_LIST_ITEMS':
         return { ...state, activeListItems: state.activeListItems.map( el => el._id === action.payload._id ? el = action.payload : el ) }

      case 'DELETE_ITEM_FROM_LIST':
         return { ...state, activeListItems: state.activeListItems.filter( item => item._id !== action.item_id ) }
      default:
         return state;
   }
}


export default kalkulatorPageReducer