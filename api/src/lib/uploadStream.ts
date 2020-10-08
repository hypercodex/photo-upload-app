
import { unlinkSync, createWriteStream } from 'fs'
import { Stream } from 'stream'

const uploadStream = (stream: Stream, path: string): Promise<void> => 
  new Promise((resolve, reject) => {
    stream.on('error', (error: string) => {
      unlinkSync(path)
      reject(error)
    }).on('end', resolve)
    .pipe(createWriteStream(path))
})

export default uploadStream
