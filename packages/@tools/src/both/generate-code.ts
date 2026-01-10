export function generateCode({ length }: { length: number }): string {
  if (length <= 0) {
    throw new Error('length must be greater than 0')
  }
  if (length > 18) {
    throw new Error('length must be less than 18')
  }
  const min = 10 ** (length - 1)
  const max = 10 ** length - 1
  const random = Math.random() * (max - min) + min
  return Math.floor(random).toString()
}
