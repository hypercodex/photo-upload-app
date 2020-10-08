import path from 'path'
import { unlink, createWriteStream, ReadStream } from 'fs'
import { Stream } from 'stream'
import { ulid } from 'ulid'
import { Db } from 'mongodb'

import { File, PostFileInput } from '../types'
import uploadStream from '../lib/uploadStream'



interface PostFileArgs {
  input: PostFileInput;
}

interface CreateReadStream {
  (): ReadStream;
}

type FileSteam = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: CreateReadStream;
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

const UPLOAD_DIR = path.join(
  __dirname, '../..', 'assets', 'uploads' 
)



const Mutation = {
  async postFiles(root: File, args: PostFileArgs, { db }: { db: Db }) {
    for (let upload of args.input.files) {
      console.log(upload)
      const ULID = ulid() as string
      const newFile: NewFile = {
        ...args.input,
        name: 'test',
        id: ULID,
        ulid: ULID,
        created: new Date()
      }
 
      
      // https://github.com/jaydenseric/apollo-upload-examples/blob/master/api/server.js
      const { createReadStream, filename, mimetype, encoding }: FileSteam = await upload;
      const id = ulid()
      const stream = createReadStream();
      const path = `${UPLOAD_DIR}/${id}-${filename}`;
      const file = { id, filename, mimetype, path, name: 'test'};

      // Store the file in the filesystem.
      await new Promise((resolve, reject) => {
        // Create a stream to which the upload will be written.
        const writeStream = createWriteStream(path);

        // When the upload is fully written, resolve the promise.
        writeStream.on('finish', resolve);

        // If there's an error writing the file, remove the partially written file
        // and reject the promise.
        writeStream.on('error', (error) => {
          unlink(path, () => {
            reject(error);
          });
        });

        // In Node.js <= v13, errors are not automatically propagated between piped
        // streams. If there is an error receiving the upload, destroy the write
        // stream with the corresponding error.
        stream.on('error', (error) => writeStream.destroy(error));

        // Pipe the upload into the write stream.
        stream.pipe(writeStream);
      });

      // Record the file metadata in the DB.
      await db.collection('files').insertOne(file)

      return file;

    
    }


    /////////////////


  }

}

export default Mutation
