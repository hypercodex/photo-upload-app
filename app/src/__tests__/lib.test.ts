import { 
  precisionRound,
  toKilobytes,
  toMegabytes,
  computeFileStats
} from '../lib'


test('test: precisionRound function', () => {

  // javascript floats... Yikes! 
  // certainlly more edge cases but not critical for this app..
  
  const gamma = 0.577215664
  const theAnswer = 42
  const bitcoinMktCap = 210560257096.00 

  // fraction
  expect(precisionRound(gamma)).toStrictEqual(1)
  expect(precisionRound(gamma, -2)).toStrictEqual(0)
  expect(precisionRound(gamma, -1)).toStrictEqual(0)
  expect(precisionRound(gamma, 0)).toStrictEqual(1)
  expect(precisionRound(gamma, 1)).toStrictEqual(0.6)
  expect(precisionRound(gamma, 2)).toStrictEqual(0.58)
  expect(precisionRound(gamma, 3)).toStrictEqual(0.577)
  expect(precisionRound(gamma, 4)).toStrictEqual(0.5772)
  expect(precisionRound(gamma, 5)).toStrictEqual(0.57722)
  expect(precisionRound(gamma, 6)).toStrictEqual(0.577216)
  expect(precisionRound(gamma, 7)).toStrictEqual(0.5772157)

  // integer
  expect(precisionRound(theAnswer)).toStrictEqual(42)
  expect(precisionRound(theAnswer, 2)).toStrictEqual(42)
  expect(precisionRound(theAnswer, -2)).toStrictEqual(0)

  // big float
  expect(precisionRound(bitcoinMktCap)).toStrictEqual(210560257096)

  expect(precisionRound(bitcoinMktCap, 0)).toStrictEqual(210560257096)
  expect(precisionRound(bitcoinMktCap, -1)).toStrictEqual(210560257100)
  expect(precisionRound(bitcoinMktCap, -2)).toStrictEqual(210560257100)
  expect(precisionRound(bitcoinMktCap, -3)).toStrictEqual(210560257000)
  expect(precisionRound(bitcoinMktCap, -4)).toStrictEqual(210560260000)
  expect(precisionRound(bitcoinMktCap, -5)).toStrictEqual(210560300000)
  expect(precisionRound(bitcoinMktCap, -6)).toStrictEqual(210560000000)
  expect(precisionRound(bitcoinMktCap, -7)).toStrictEqual(210560000000)

  expect(precisionRound(bitcoinMktCap, 1)).toStrictEqual(210560257096.0)
  expect(precisionRound(bitcoinMktCap, 2)).toStrictEqual(210560257096.00)
  expect(precisionRound(bitcoinMktCap, 3)).toStrictEqual(210560257096.000)
  expect(precisionRound(bitcoinMktCap, 4)).toStrictEqual(210560257096.0000)
  expect(precisionRound(bitcoinMktCap, 5)).toStrictEqual(210560257096.00000)
  expect(precisionRound(bitcoinMktCap, 6)).toStrictEqual(210560257096.000000)
  expect(precisionRound(bitcoinMktCap, 7)).toStrictEqual(210560257096.0000000)
})

test('test: toKilobytes function', () => {
  const bytes = 654321
  expect(toKilobytes(bytes)).toBe('654kb')
})

test('test: toMegabytes function', () => {
  const bytes = 7654321
  expect(toMegabytes(bytes)).toBe('7.7Mb')
})

test('test: computeFileStats function', () => {

  const mockFiles = [
    {size: 100, id: '', ulid: '', url: '', originalUrl: '', filename: '', mimetype: '', extension: '', uploadedOn: new Date()},
    {size: 100, id: '', ulid: '', url: '', originalUrl: '', filename: '', mimetype: '', extension: '', uploadedOn: new Date()},
    {size: 100, id: '', ulid: '', url: '', originalUrl: '', filename: '', mimetype: '', extension: '', uploadedOn: new Date()},
    {size: 100, id: '', ulid: '', url: '', originalUrl: '', filename: '', mimetype: '', extension: '', uploadedOn: new Date()},
    {size: 100, id: '', ulid: '', url: '', originalUrl: '', filename: '', mimetype: '', extension: '', uploadedOn: new Date()},
    {size: 100, id: '', ulid: '', url: '', originalUrl: '', filename: '', mimetype: '', extension: '', uploadedOn: new Date()},
  ]

  // Mock the action creator
  const actionCreator = jest.fn()

  computeFileStats(mockFiles, actionCreator)
  expect(actionCreator).toHaveBeenCalledTimes(1)
  expect(actionCreator).toHaveBeenCalledWith(mockFiles.length, 600)
})
