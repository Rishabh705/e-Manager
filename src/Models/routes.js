import mongoose from "mongoose";

const routesSchema = new mongoose.Schema(
  {
    airline: {
      id: {
        type: Number,
        required:true,
        unique:true
      },
      name: {
        type: String,
        required:true
      },
      alias: {
        type: String,
        required:true
      },
      iata: {
        type: String,
        required:true
      }
    },
    src_airport: {
      type: String,
      required:true
    },
    dst_airport: {
      type: String,
      required:true
    },
    codeshare: {
      type: String
    },
    stops: {
      type: Number,
      required:true
    },
    airplane: {
      type: String,
      required:true
    }
  },
  {
    timestamp: true,
  })

const Routes = mongoose.models.Routes || mongoose.model('Routes', routesSchema)

export default Routes;