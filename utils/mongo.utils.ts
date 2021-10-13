/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Db, ObjectId } from 'mongodb'
import { withMongo } from '../lib/mongodb'

export const Questions = {
  get: async (id: string) =>
    await withMongo(async (db: Db) => {
      const collection = db.collection('questions')
      return await collection.findOne({ _id: new ObjectId(id) }, { projection: { answers: 1, video: 1, wiki: 1 } })
    }),
  random: async (size: number) =>
    await withMongo(async (db: Db) => {
      const collection = db.collection('questions')
      return await collection.aggregate([{ $sample: { size } }]).toArray()
    }),
}
