

export function cleanFilename(name: string, ext: string) {
  const maxLength = 255
  const clean = String(name)
  if (clean.length > maxLength){
    return `${clean.slice(0, 255)}.${ext}`
  }
  return clean
}
