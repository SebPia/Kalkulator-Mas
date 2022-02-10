import Mongoose from "mongoose";


const userSchema = new Mongoose.Schema( {
   username:
   {
      type: String,
      required: true,
      trim: true,
   },

   email: {
      type: String,
      required: true,
      unique: true
   },

   password: {
      type: String,
      required: true
   }


}, {
   timestamps: true
} )


export default Mongoose.model( "Users", userSchema )