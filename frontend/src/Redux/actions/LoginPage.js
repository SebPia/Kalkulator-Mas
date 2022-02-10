const loginPageActions = {
   loader_off: () => ( { type: "LOADER_OFF" } ),
   loader_on: () => ( { type: "LOADER_ON" } ),
   msg_set: ( msg ) => ( { type: "MSG_SET", msg } ),
   msg_clear: () => ( { type: "MSG_CLEAR" } ),
   view_change: () => ( { type: "VIEW_CHANGE_KALKULATOR" } ),
}

export default loginPageActions