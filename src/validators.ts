import { Grid, Color } from './paintSlice'

export interface PaintFile {
  name: string
  data: Grid
}

const isColor = (maybeColor: unknown): maybeColor is Color => true

export const isPaintFile = (maybeFile: unknown): maybeFile is PaintFile => {
  const file = maybeFile as PaintFile
  return (
    file &&
    typeof file.name == 'string' &&
    file.data &&
    file.data.every(r => r.length && r.every(el => isColor(el)))
  )
}
