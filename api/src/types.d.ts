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
  originalUrl: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  extension: FileType;
  size: Scalars['Int'];
  uploadedOn: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type UploadPayload = {
  file: Scalars['Upload'];
  size: Scalars['Int'];
};

export type PostFileInput = {
  files: Array<UploadPayload>;
};

export type SearchFileInput = {
  search: Scalars['String'];
};

export type DeleteFileInput = {
  id: Scalars['ID'];
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

export type DeleteFileMutationResponse = {
  __typename?: 'DeleteFileMutationResponse';
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postFiles?: Maybe<Array<File>>;
  deleteFile?: Maybe<DeleteFileMutationResponse>;
};


export type MutationPostFilesArgs = {
  input: PostFileInput;
};


export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

