import path from 'path'
import { unlink, createWriteStream, ReadStream } from 'fs'
import { ulid } from 'ulid'
import { Db } from 'mongodb'

import { MutationResolvers } from './types'
import { File } from '../types'



interface CreateReadStream {
  (): ReadStream;
}

type FileSteam = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: CreateReadStream;
}

const UPLOAD_DIR = path.join(
  __dirname, '../..', 'assets', 'uploads' 
)

const Mutation: MutationResolvers = {
  async postFiles(root, args, { db }: { db: Db }) {
    const results = []
    
    for (const upload of args.input.files) {

      const ULID = ulid() as string
      const { createReadStream, filename, mimetype, encoding }: FileSteam = await upload;
      const id = ulid()
      const stream = createReadStream();
      const path = `${UPLOAD_DIR}/${id}-${filename}`;
      const file: Partial<File> = {
        ulid: ULID,
        filename: 'test',
        mimetype,
        uploadedOn: new Date()
      }
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

      results.push(file)
    }
    return Promise.all(results)
  }
}

export default Mutation
