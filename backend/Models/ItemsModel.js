import Mongoose from "mongoose"


const ItemSchema = new Mongoose.Schema( {
   name:
   {
      type: String,
      required: true,
      trim: true,
   },

   list_id: {
      type: String,
      required: true,
   },
   weight: {
      type: Number,
      required: true
   },

   surface: {
      type: Number,
      required: true
   },

   price: {
      type: Number
   },

   amount: {
      type: Number,
      default: 1
   }


}, {
   timestamps: true
} )


export default Mongoose.model( "Items", ItemSchema )