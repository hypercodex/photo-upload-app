export type File = {
  _id: string;
  ulid: string;
  filename: string;
  mimetype: string;
  size: number;
  uploadedOn: Date;
  title?: string;
  description?: string;
}
