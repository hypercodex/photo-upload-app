import { EnumFileType } from './src/resolvers/EnumFileType';
import FileType = EnumFileType;
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A valid datetime value */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export { FileType };

export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  ulid: Scalars['String'];
  url: Scalars['String'];
  filename: Scalars['String'];
  mimetype: FileType;
  extension: Scalars['String'];
  size: Scalars['Int'];
  uploadedOn: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type PostFileInput = {
  name?: Maybe<Scalars['String']>;
  files: Array<Scalars['Upload']>;
  description?: Maybe<Scalars['String']>;
};

export type SearchFileInput = {
  search: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  totalFiles: Scalars['Int'];
  allFiles: Array<File>;
  searchFiles: Array<File>;
};


export type QuerySearchFilesArgs = {
  input: SearchFileInput;
};

export type UploadMutationReponse = {
  __typename?: 'UploadMutationReponse';
  message?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postFiles: Array<File>;
};


export type MutationPostFilesArgs = {
  input: PostFileInput;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

