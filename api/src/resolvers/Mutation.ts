import path from 'path'
import { Stream } from 'stream'
import { ulid } from 'ulid'
import { Db } from 'mongodb'

import { File, PostFileInput } from '../types'
import uploadStream from '../lib/uploadStream'



interface PostFileArgs {
  input: PostFileInput;
}

type FileSteam = {
  filename: string;
  mimetype: string;
  encoding: string;
  stream: Stream;
}

interface NewFile {
  id?: string;
  ulid: string;
  url?: string;
  name: string;
  kind?: string;
  size?: string;
  created: Date;
  description?: string | null | undefined;
}

const Mutation = {
  // MAJOR SECURITY FOCUS HERE!!!
  async postFile(root: File, args: PostFileArgs, { db }: { db: Db }) {
    const ULID = ulid() as string
    const newFile: NewFile = {
      ...args.input,
      id: ULID,
      ulid: ULID,
      created: new Date()
    }

    const { stream, filename, mimetype, encoding }: FileSteam = await args.input.file

    await db.collection('files').insertOne(newFile)
    const toPath = path.join(
      __dirname, '..', 'assets', 'uploads', `${newFile.ulid}.${newFile.kind?.toLowerCase()}`
    )
    
    console.log(filename, mimetype, encoding)
    await uploadStream(stream, toPath)

    return newFile
  }

}

export default Mutation
