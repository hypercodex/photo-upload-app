
export const mockFile = {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "ulid": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "url": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    "originalUrl": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.jpg",
    "filename": "having_fun.jpg",
    "mimetype": "image/jpg",
    "extension": "jpg",
    "size": 5000000,
    "uploadedOn": "2020-02-05T08:00:00.000Z",
    "title": "Having Fun",
    "description": "Having fun on the glacier.",
}

export const filesApi = [
  {
    "__typename": "File",
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "filename": "having_fun.jpg",
    "title": "Having Fun",
  },
  {
    "__typename": "File",
    "id": "000XAL6S41ACTAV9WEVGEMMVR8", 
    "filename": "having_fun_2.png",
    "title": "Having Fun 2",
  }
]

export const filesQueryResult = [
  {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "size": 100,
    "url": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
  },
  {
    "id": "000XAL6S41ACTAV9WEVGEMMVR8", 
    "size": 100,
    "url": "http://localhost:4000/public/000XAL6S41ACTAV9WEVGEMMVR8.webp",
  }
]

export const fileDeleteResult = {
  "id": "000XAL6S41ACTAV9WEVGEMMVR8"
}
