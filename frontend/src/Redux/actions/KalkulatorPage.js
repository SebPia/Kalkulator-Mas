const kalkulatorPageActions = {
   view_change: ( view ) => ( { type: "VIEW_CHANGE", view } ),
   score_set: ( payload ) => ( { type: "SCORE_SET", payload } ),
   lists_update: ( lists ) => ( { type: "LIST_UPDATE", lists } ),
   list_add: ( item ) => ( { type: "LIST_ADD", item } ),
   list_delete: ( item ) => ( { type: "LIST_DELETE", item } ),
   setActiveList: ( id ) => ( { type: "ACTIVE_LIST", id } ),
   setActiveListItems: ( payload ) => ( { type: "ACTIVE_LIST_ITEMS", payload } )
}

export default kalkulatorPageActions