import { Db } from 'mongodb'
import { SearchFileInput } from '../types'
import type { QueryResolvers } from './types'


const Query: QueryResolvers = {
  totalFiles: (root, args, { db }) => {
    return db.collection('files')
      .estimatedDocumentCount()
  },
  allFiles: (root, args, { db }) =>
    db.collection('files')
      .find()
      .toArray(),
  searchFiles: (root, args, { db }) => {
    const query = { $text: { $search: args.input.search } }
    const sort = { score: { $meta: "textScore" } }
    const projection = { score: { $meta: "textScore" } }

    return db.collection('files')
      .find(query)
      // @ts-ignore
      .sort(sort)
      .project(projection)
      .toArray()
  }, 
}


export default Query
