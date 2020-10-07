import { promises as fs } from 'fs'

// load environment from .env.json
async function loadSecrets() {
  const SECRET_FILE = '../.env.json'
  const file = await fs.stat(SECRET_FILE)
  if (file && !process.env.DB_HOST) {
    const fileBuff = await fs.readFile(SECRET_FILE)
    const envFile = JSON.parse(fileBuff.toString())
    if (!envFile.DB_HOST) {
      throw new Error('Error in DB_HOST env')
    }
    process.env['DB_HOST'] = envFile.DB_HOST
  }
}

export default loadSecrets
