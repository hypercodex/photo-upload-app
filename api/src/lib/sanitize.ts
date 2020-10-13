import { unlinkSync } from 'fs'
import sharp from 'sharp'

export function cleanFilename(name: string, ext: string) {
  const maxLength = 255
  const clean = String(name)
  if (clean.length > maxLength){
    return `${clean.slice(0, 255)}.${ext}`
  }
  return clean
}



/*
 * Image processing
 */
export async function processImage(
  buffer: Buffer,
  path: string,
  name: string,
  extension: 'jpg' | 'png'
): Promise<void> {

  const sharpStream = sharp(buffer, {failOnError: false})
  const promises = []
  if (extension === 'jpg') {
    promises.push(
      sharpStream
        .clone()
        .jpeg({ quality: 100 })
        .toFile(`${path}/${name}.jpg`)
    )
  } else if (extension === 'png') {
    promises.push(
      sharpStream
        .clone()
        .png({ quality: 100 })
        .toFile(`${path}/${name}.png`)
    )
  }  
  promises.push(
    sharpStream
      .clone()
      .webp({ quality: 80 })
      .toFile(`${path}/${name}.webp`)

  )

  await Promise.all(promises)
    .catch(err => {
      console.log("Error processing file, let's clean up", err)
      try {
        unlinkSync(`${path}/${name}.jpg`)
        unlinkSync(`${path}/${name}.png`)
        unlinkSync(`${path}/${name}.webp`)
      } catch (e) {}
    })
  
}

