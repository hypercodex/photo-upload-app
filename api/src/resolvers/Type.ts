import { GraphQLScalarType } from 'graphql'
import type { File } from '../types'

import { EnumFileType }  from './EnumFileType'


const FILE_SERVICE = 'http://localhost:4000'
const ROOT_PATH = 'public'


const Type = {
  FileType: {
    JPG: EnumFileType.JPG,
    PNG: EnumFileType.PNG 
  },
  File: {
    id: (root: File): string => root.ulid,
    url: (root: File): string => `${FILE_SERVICE}/${ROOT_PATH}/${root.ulid}.${'webp'}`,
    originalUrl: (root: File): string => `${FILE_SERVICE}/${ROOT_PATH}/${root.ulid}.${root.extension}`,
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
