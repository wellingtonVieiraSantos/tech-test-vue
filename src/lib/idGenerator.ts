export const idGenerator = () => {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  const digits = Math.floor(Math.random() * 10000000).toString().padStart(7, '0')
  return `${letter}${digits}`
}
