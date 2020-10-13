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

    // cast input to string to avoid No-SQL injection
    const query = { $text: { $search: String(args.input.search) } }
    const sort = { score: { $meta: "textScore" } }
    const projection = { score: { $meta: "textScore" } }

    return db.collection('files')
      .find(query)
      .sort(sort)
      .project(projection)
      .toArray()
  }, 
}


export default Query
