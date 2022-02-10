
import Mongoose from "mongoose";


const listSchema = new Mongoose.Schema( {
   name:
   {
      type: String,
      required: true,
      trim: true,
   },

   user_id: {
      type: String,
      required: true,
   }


}, {
   timestamps: true
} )


export default Mongoose.model( "Lists", listSchema )