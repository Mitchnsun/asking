/* eslint-disable @typescript-eslint/no-explicit-any */
import { Db, MongoClient, MongoClientOptions } from 'mongodb'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: any
        promise: Promise<MongoClient | { client: MongoClient; db_trivia: Db; db_rooms: Db }> | null
      }
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB_TRIVIA = process.env.MONGODB_DB_TRIVIA || ''
const MONGODB_DB_ROOMS = process.env.MONGODB_DB_ROOMS || ''

let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

const connectToDatabase = async (): Promise<{ client: MongoClient; db_trivia: Db; db_rooms: Db }> => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts: MongoClientOptions = {}

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db_trivia: client.db(MONGODB_DB_TRIVIA),
        db_rooms: client.db(MONGODB_DB_ROOMS),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export async function withTrivia<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const conn = await connectToDatabase()
  return await fn(conn.db_trivia)
}

export async function withRooms<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const conn = await connectToDatabase()
  return await fn(conn.db_rooms)
}
