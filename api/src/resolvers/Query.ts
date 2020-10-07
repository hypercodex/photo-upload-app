import { Db } from 'mongodb'
import { SearchFileInput } from '../types'

interface SearchFileArgs {
  input: SearchFileInput;
}

const Query = {
  totalFiles: (root: unknown, args: undefined, { db }: { db: Db }) => {
    return db.collection('files')
      .estimatedDocumentCount()
  },
  allFiles: (root: unknown, args: undefined, { db }: { db: Db }) =>
    db.collection('files')
      .find()
      .toArray(),
  searchFiles: (root: unknown, args: SearchFileArgs, { db }: { db: Db }) => {
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
