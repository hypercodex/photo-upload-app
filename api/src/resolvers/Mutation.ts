import path from 'path'
import { unlink, createWriteStream, ReadStream } from 'fs'
import { ulid } from 'ulid'
import { Db, MongoError, FindAndModifyWriteOpResultObject } from 'mongodb'

import { MutationResolvers } from './types'
import { File } from '../types'

import { cleanFilename, processImage } from '../lib/sanitize'



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
      const { createReadStream, filename, mimetype }: FileSteam = await payload.file;
      const stream = createReadStream();
      const extension = String(mimetype).split('/')[1] as 'jpg' | 'png'
      const file: Partial<File> = {
        ulid: ULID,
        filename: cleanFilename(filename, extension),
        size: Number(payload.size),
        mimetype: String(mimetype),
        extension,
        uploadedOn: new Date()
      }
      const chunks: Buffer[] = []
      for await (const chunk of stream) {
        chunks.push(chunk)
      }
      await  processImage(Buffer.concat(chunks), UPLOAD_DIR, ULID, extension)
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
          (err: MongoError, result: FindAndModifyWriteOpResultObject<File>) => {
            if (err) {
              reject(err)
            }
            const file = result.value
            if (!file) {
              reject('File not found in database.')
            } else {
              const extension = file.mimetype.split('/')[1]
              const original = getPath(extension, file.ulid)
              const optimized = getPath('webp', file.ulid)
              const promises = []
              promises.push(
                unlink(original, (err) => {
                  if (err) {
                    reject(err)
                  }
                })
              )
              promises.push(
                unlink(optimized, (err) => {
                  if (err) {
                    reject(err)
                  }
                })
              )
              Promise.all(promises)
                .catch(err => { console.log('Error removing files', err) })
              resolve({id: file.id})
            }
        }
      )
    })
  }
}

export default Mutation
