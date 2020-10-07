import { readFileSync } from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
// the actual resolvers
import resolvers from '../resolvers'
// the mock service
import mockService from '../mocks/mockService'

const testCase = {
    id: 'Hello graphql test case',
    query: `
      query {
        helloGraphQL 
      }
    `,
    variables: { },

    // injecting the mock service with dummy responses
    context: { service: mockService },

    // expected result 
    expected: { data: { helloGraphQL: 'Hello GraphQL' } }
}

describe('Schema Test Cases', () => {
    // array of all test cases, just 1 for now
    const cases = [testCase]
    // reading the actual schema
    const typeDefs = readFileSync('./_typeDefs.graphql', 'utf-8')
    // make schema and resolvers executable
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    
    // run the test for each case in the cases array
    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj

        test(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })
})
