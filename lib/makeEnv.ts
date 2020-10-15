import * as fs from 'fs'


interface Environment {
  dbName: string;
  dbUser: string;
  apiHost: string;
}

interface MakeRootEnv {
  (
    env: Environment,
    dbRootSec: string,
    dbUserSec: string
  ): string[][]
}

const makeRootEnv: MakeRootEnv = (env, dbRootSec, dbUserSec) => ([
  ["MONGO_INITDB_ROOT_USERNAME", "root"],
  ["MONGO_INITDB_ROOT_PASSWORD", dbRootSec],
  ["MONGO_USER_USERNAME", env.dbUser],
  ["MONGO_USER_PASSWORD", dbUserSec],
  ["DATABASE_NAME", env.dbName]
])

const writeRootEnv = (rootEnv: string[][]) => {
  const envStr = rootEnv.reduce((a, v) => {
    const line = v.join('=')
    return a + line + '\n'
  }, '')

  fs.writeFileSync('./.env', envStr)
}

interface MakeApiEnv {
  (
    env: Environment,
    dbUserSec: string,
    sec1: string,
    sec2: string,
  ): { [key: string]: string }
}

const makeApiEnv: MakeApiEnv = (env, dbUserSec, keySec1, keySec2) => ({ 
  "DB_HOST": `mongodb://${env.dbUser}:${dbUserSec}@${env.apiHost}/${env.dbName}`,
  "KEY1": keySec1,
  "KEY2": keySec2,
})

const writeApiEnv = (apiEnv: { [key: string]: string }) => {
  fs.writeFileSync('./api/.env.json', JSON.stringify(apiEnv, null, ' '))
}

interface CreateEnvironment {
  (
    env: Environment,
    secrets: [string, string, string, string]
  ): void;
}

const createEnvironment: CreateEnvironment = (env, secrets) => {
  writeRootEnv(makeRootEnv(env, secrets[0], secrets[1]))
  writeApiEnv(makeApiEnv(env, secrets[1], secrets[2], secrets[3]))
}

export default createEnvironment
