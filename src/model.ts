import { Schema, Model, Document, model } from 'mongoose'

const customer: Schema<Document> = new Schema({
  card: {
    type: String,
    unique: true,
  },
  name: String,
  money: Number,
  points: Number,
  last_location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
    required: false
  },
  restart: Number
})

export interface ICustomer extends Document {
  card: string
  name: string
  money: number
  points: number
  last_location?: {
    type: string
    coordinates: [number, number]
  }
  restart: number
}

export const DbCustomers: Model<ICustomer, {}> = model<ICustomer>('customers', customer)
