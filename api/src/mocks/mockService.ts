import { filesInternal as files } from './mockData'
import type { ObjectStringMap } from './mockData'

interface ObjectFunction {
    (...args: unknown[]): FunctionalObject |
        ObjectStringMap[] |
        number
}

interface FunctionalObject {
    [key: string]: ObjectFunction  
}

const db: FunctionalObject = {
    collection: () => ({
        estimatedDocumentCount: () => {
            return 42
        },
        find: () => ({
            toArray: () => files,
            sort: () => ({
                project: () => ({
                    toArray: () => files
                })
            })
        })
    })
}

export default db
