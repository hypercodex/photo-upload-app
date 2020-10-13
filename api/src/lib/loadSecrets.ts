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
    process.env['COOKIE_SECRET'] = envFile.COOKIE_SECRET
    process.env['KEY1'] = envFile.KEY1
    process.env['KEY2'] = envFile.KEY2
  }
}

export default loadSecrets
