export interface ObjectStringMap {
    [key: string]: string | number
}

export const filesInternal: ObjectStringMap[] = [
  {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "ulid": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "url": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    "filename": "having_fun.jpg",
    "mimetype": "image/jpg",
    "extension": "jpg",
    "size": 5000000,
    "uploadedOn": "2020-02-05T08:00:00.000Z",
    "title": "Having Fun",
    "description": "Having fun on the glacier.",
  },
  {
    "id": "000XAL6S41ACTAV9WEVGEMMVR8", 
    "ulid": "000XAL6S41ACTAV9WEVGEMMVR8", 
    "url": "http://localhost:4000/public/000XAL6S41ACTAV9WEVGEMMVR8.webp",
    "filename": "having_fun_2.png",
    "mimetype": "image/png",
    "extension": "png",
    "size": 10000000,
    "uploadedOn": "2020-07-05T07:00:00.000Z",
    "title": "Having Fun 2",
    "description": "Having fun in the sun.",
  }
]

export const mockFile = {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "ulid": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "url": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    "filename": "having_fun.jpg",
    "mimetype": "image/jpg",
    "extension": "jpg",
    "size": 5000000,
    "uploadedOn": "2020-02-05T08:00:00.000Z",
    "title": "Having Fun",
    "description": "Having fun on the glacier.",
}

const internalToFileType: ObjectStringMap = {
    'jpg': 'JPG',
    'png': 'PNG'
}

export const filesExternal: ObjectStringMap[] = filesInternal.map(file => {
    return {...file, extension: internalToFileType[file.extension]}
})
