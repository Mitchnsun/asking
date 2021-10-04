/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
import { Db, MongoClient } from 'mongodb'

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare global {
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: any
        promise: Promise<MongoClient | { client: MongoClient; db: Db }> | null
      }
    }
  }
}

export {}
