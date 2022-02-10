const INIT_STATE = {
   view: 'Profil',
   itemName: '',
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

      default:
         return state;
   }
}


export default kalkulatorPageReducer