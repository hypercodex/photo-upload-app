import { readFileSync } from 'fs'
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'apollo-server-express'

// the actual resolvers
import resolvers from '../resolvers'
// mock db service
import mockService from '../__mocks__/mockService'
// mock data responses
import { filesExternal as files } from '../__mocks__/mockData'

const testCaseTotal = {
  id: 'query totalFiles',
  query: `
    query {
      totalFiles
    }
  `,
  variables: { },
  // inject the mock db service with dummy responses
  context: { db: mockService },
  // expected result 
  expected: { data: { totalFiles: 42 } }
}

const testCaseAllFiles = {
  id: 'query allFiles',
  query: `
    query {
      allFiles {
        id
        ulid
        url
        filename
        mimetype
        extension
        size
        uploadedOn
        title
        description
      }
    }
  `,
  variables: { },
  // inject the mock db service with dummy responses
  context: { db: mockService },
  // expected result 
  expected: { data: { allFiles: [...files] } }
}

const testCaseSearchFiles = {
  id: 'query searchFiles',
  query: `
    query SearchFiles($input: SearchFileInput!) {
      searchFiles(input: $input) {
        id
        ulid
        url
        filename
        mimetype
        extension
        size
        uploadedOn
        title
        description
      }
    }
  `,
  variables: { "input": { "search": "Fun" } 	},
  // inject the mock db service with dummy responses
  context: { db: mockService },
  // expected result 
  expected: { data: { searchFiles: [...files] } }
}

describe('Schema Test Cases', () => {
  const cases = [
      testCaseTotal,
      testCaseAllFiles,
      testCaseSearchFiles
  ]
  // reading the actual schema
  const _typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')
  // workaround Apollo injecting Upload scalar in service..
  const typeDefs = 'scalar Upload\n' + _typeDefs
  // make schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  
  // run the test for each case in the cases array
  cases.forEach(obj => {
    const { id, query, variables, context, expected } = obj

    test(`test: ${id}`, async () => {
      const result = await graphql(schema, query, null, context, variables)
      return expect(result).toEqual(expected)
    })
  })
})
