
import type { File } from '../../api/src/types'
import type { SetStatsAction } from './containers/StateContainer'




// Decimal rounding
export const precisionRound = (
  value: number,
  precision: number
): number => {
  const factor = Math.pow(10, precision || 0)
  return Math.round(value * factor) / factor
}

// File size conversions
export const toKilobytes = (bytes: number): string => {
  return `${Math.round(bytes/1000).toString()}kb`
}

export const toMegabytes = (bytes: number): string => {
  return `${precisionRound(bytes/1000000, 1).toString()}Mb`
}

/*
 *  Aggregate file statistics
 */
interface SetFileStatsInterface {
  (
    files: File[],
    setStatsAction: SetStatsAction 
  ): void
}

export const computeFileStats: SetFileStatsInterface = (
  files,
  setStatsAction
) => {
  if (!files) return
  const totalSize = files.reduce((a: number, v: File) => {
    return a + v.size
  }, 0)
  setStatsAction(files.length, totalSize)
}
