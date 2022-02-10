
const INIT_STATE = {
   view: false,
   msg: '',
   loader: false,
}

const loginPageReducer = ( state = INIT_STATE, action ) =>
{

   switch ( action.type )
   {
      case "LOADER_OFF":
         return { ...state, loader: false }

      case "LOADER_ON":
         return { ...state, loader: true }

      case "MSG_SET":
         return { ...state, msg: action.msg }

      case "MSG_CLEAR":
         return { ...state, msg: '' }

      case "VIEW_CHANGE_KALKULATOR":
         return ( { ...state, view: !state.view } )

      default:
         return state;
   }
}


export default loginPageReducer