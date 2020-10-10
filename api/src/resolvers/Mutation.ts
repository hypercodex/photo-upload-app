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
  size: number;
  mimetype: string;
  encoding: string;
  createReadStream: CreateReadStream;
}

const UPLOAD_DIR = path.join(
  __dirname, '../..', 'assets', 'uploads' 
)

const getPath = (extension: string, id: string): string => {
  return `${UPLOAD_DIR}/${id}.${extension}`
}

const Mutation: MutationResolvers = {
  async postFiles(root, args, { db }: { db: Db }) {
    const results = []
    
    for (const payload of args.input.files) {

      const ULID = ulid() as string
      const { createReadStream, filename, mimetype, encoding }: FileSteam = await payload.file;
      const stream = createReadStream();
      const extension = mimetype.split('/')[1]
      console.log(extension)
      const path = getPath(extension, ULID)
      const file: Partial<File> = {
        ulid: ULID,
        filename: 'test',
        size: payload.size,
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

      file.id = ULID
      // Record the file metadata in the DB.
      await db.collection('files').insertOne(file)

      results.push(file)

    }
    return Promise.all(results)
  },
  async deleteFile(root, args, { db }: { db: Db }) {
    return new Promise((resolve, reject) => {
      db.collection('files')
        .findOneAndDelete(
          { ulid: args.input.id },
          (err:any, result:any) => {
            if (err) {
              reject(err)
            }
            const file = result.value
            const extension = file.mimetype.split('/')[1]
            const path = getPath(extension, file.ulid)

            unlink(path, (err) => {
              if (err) {
                reject(err)
              }
              resolve(file.id)
            })
        }
      )
    })
  }
}

export default Mutation
