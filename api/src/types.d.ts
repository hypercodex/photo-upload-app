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


export enum FileType {
  Jpg = 'JPG',
  Png = 'PNG'
}

export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  url: Scalars['String'];
  name: Scalars['String'];
  kind: FileType;
  size: Scalars['String'];
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
};

export type PostFileInput = {
  name: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  postFile: File;
};


export type MutationPostFileArgs = {
  input: PostFileInput;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}
