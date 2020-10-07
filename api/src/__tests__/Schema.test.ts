import { readFileSync } from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'

// the actual resolvers
import resolvers from '../resolvers'
// mock db service
import mockService from '../mocks/mockService'
// mock data responses
import { files } from '../mocks/mockData'

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
        url
        name
        created
        description
        kind
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
        url
        name
        created
        description
        kind
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
  // array of all test contextases, just 1 for now
  const cases = [
      testCaseTotal,
      testCaseAllFiles,
      testCaseSearchFiles
  ]
  // reading the actual schema
  const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')
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
