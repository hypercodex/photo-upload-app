import prompter from './prompter'
import generateSecrets from './genSecrets'
import createEnvironment from './makeEnv'



const devEnv = {
  dbName: 'photo_upload_db',
  dbUser: 'photo',
  apiHost: 'localhost:27017'
}

const intro = () => {
  console.log('    --- Welcome to the File Upload App! ---')
  console.log('Please enter a seed to generate the application secrets.')
}

const outtro = () => {

  console.log('\n                 Thank you!')
  console.log('\n           ------------------------\n')
  console.log('Secrets for the DEV environment are now written!')
  console.log('\nYou can run the full stack with "yarn devAll" or look in the README for examples of how to run services individually.')
  console.log('\nHappy file uploading... Cheers\n')
}

type FourSecrets = [string, string, string, string];

const composeEnv = (seed: string) => {
  const secretGenerator = generateSecrets(seed)
  const secrets = []
  for (let i = 0; i < 4; i++) {
    secrets.push(secretGenerator.next().value)
  }
  createEnvironment(devEnv, secrets as FourSecrets)
  outtro()
}

// run cli
intro()
prompter(composeEnv)
