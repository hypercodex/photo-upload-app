export interface ObjectStringMap {
    [key: string]: string | number
}

export const filesInternal: ObjectStringMap[] = [
  {
    "id": "0",
    "ulid": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "url": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.jpg",
    "filename": "having_fun.jpg",
    "mimetype": "image/jpg",
    "extension": "jpg",
    "size": 5000000,
    "uploadedOn": "2020-02-05T08:00:00.000Z",
    "title": "Having Fun",
    "description": "Having fun on the glacier.",
  },
  {
    "id": "1",
    "ulid": "000XAL6S41ACTAV9WEVGEMMVR8", 
    "url": "http://localhost:4000/public/000XAL6S41ACTAV9WEVGEMMVR8.png",
    "filename": "having_fun_2.png",
    "mimetype": "image/png",
    "extension": "png",
    "size": 10000000,
    "uploadedOn": "2020-07-05T07:00:00.000Z",
    "title": "Having Fun 2",
    "description": "Having fun in the sun.",
  }
]

const internalToFileType: ObjectStringMap = {
    'image/jpg': 'JPG',
    'image/png': 'PNG'
}

export const filesExternal: ObjectStringMap[] = filesInternal.map(file => {
    return {...file, mimetype: internalToFileType[file.mimetype]}
})
