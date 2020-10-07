import { Db } from 'mongodb'
import { File, PostFileInput } from '../types'


interface PostFileArgs {
  input: PostFileInput;
}

interface NewFile {
  id?: string;
  url?: string;
  name: string;
  kind?: string;
  size?: string;
  created: Date;
  description?: string | null | undefined;
}

const Mutation = {
  async postFile(root: File, args: PostFileArgs, { db }: { db: Db }) {
    const newFile: NewFile = {
      ...args.input,
      created: new Date()
    }
    const { insertedId } = await db.collection('files').insertOne(newFile)
    newFile.id = insertedId
    return newFile
  }

}

export default Mutation
