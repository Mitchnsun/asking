/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Db, ObjectId } from 'mongodb'
import { withTrivia } from '@/lib/mongodb'

export const Questions = {
  get: async (id: string) =>
    await withTrivia(async (db: Db) => {
      const collection = db.collection('questions')
      return await collection.findOne({ _id: new ObjectId(id?.toString()) }, { projection: { question: 1, category: 1 } })
    }),
  getAnswers: async (id: string) =>
    await withTrivia(async (db: Db) => {
      const collection = db.collection<{ answers: string[]; video?: string; wiki?: string }>('questions')
      return await collection.findOne({ _id: new ObjectId(id) }, { projection: { answers: 1, video: 1, wiki: 1 } })
    }),
  random: async (size: number) =>
    await withTrivia(async (db: Db) => {
      const collection = db.collection('questions')
      return await collection.aggregate([{ $sample: { size } }]).toArray()
    }),
}

export const KnowYourFriend = {
  random: async (size: number) =>
    await withTrivia(async (db: Db) => {
      const collection = db.collection('knowyourfriend')
      return await collection.aggregate([{ $sample: { size } }]).toArray()
    }),
}
