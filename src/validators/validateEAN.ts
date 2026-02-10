export const validateEAN = (ean: string) => { 
 if (!ean) return false
  if (ean.length !== 13) return false
  if (!/^[0-9]+$/.test(ean)) return false
  return true
}
    