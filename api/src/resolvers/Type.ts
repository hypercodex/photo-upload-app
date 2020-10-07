import { GraphQLScalarType } from 'graphql'
import { File } from '../types'


const Type = {
  File: {
    url: ( parent: File ) => `http://localhost:4000/public/${parent.id}.${parent.kind.toLowerCase()}`,
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid datetime value',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    // @ts-ignore
    parseLiteral: ast => ast.value
  })
}

export default Type
