import * as readline from 'readline'
import { Writable } from 'stream'


interface MutableWritable extends Writable {
  muted?: boolean;
}

const MutableWritable = Object.defineProperty(
  Writable,
  'muted',
  { value: false, writable: true }
)

interface PrompterCallback {
  (seed: string): void | unknown
}


const prompter = (callback: PrompterCallback): void => {
  const mutedStdOut: MutableWritable = new MutableWritable({
    write: function(chunk, encoding, callback) {
      if (!this.muted) 
        process.stdout.write(chunk, encoding)
      callback()
    }
  })
  mutedStdOut.muted = false 

  const interaction = readline.createInterface({
    input: process.stdin,
    output: mutedStdOut, 
    terminal: true
  })

  interaction.on('SIGINT', () => {
    interaction.close()
  })

  interaction.question('seed: ', (seed) => {
    callback(seed)
    interaction.close()
  })

  mutedStdOut.muted = true
}

export default prompter
