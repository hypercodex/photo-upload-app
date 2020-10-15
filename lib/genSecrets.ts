import * as crypto from 'crypto'


const getPsudoRandomBody = () => {
  const numeral = () => Math.floor(Math.random() * 10).toString()
  return Array.from({ length: 64 }, numeral).join('')
}

const generateSecrets = function* (seed: string) {
  while (true) {
    const body = getPsudoRandomBody()
    yield crypto
      .createHmac('sha256', seed)
      .update(body)
      .digest('hex')
  }
} 

export default generateSecrets
