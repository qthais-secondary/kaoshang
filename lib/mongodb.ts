import mongoose, { Mongoose } from "mongoose"
import "@/models"   // 👈 load tất cả models

const MONGODB_URI = process.env.MONGODB_URI as string

declare global {
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  }
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  }
}

export async function connectDB() {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise

  return cached.conn
}