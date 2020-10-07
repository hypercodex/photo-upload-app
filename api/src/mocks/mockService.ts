import { files } from './mockData'


const db = {
    collection: (anything: unknown) => ({
        estimatedDocumentCount: () => {
            return 42
        },
        find: (anything: unknown) => ({
            toArray: () => files,
            sort: (anything: unknown) => ({
                project: (anything: unknown) => ({
                    toArray: () => files
                })
            })
        })
    })
}


export default db
