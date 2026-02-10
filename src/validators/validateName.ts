export const validateName = (name: string) => {
    if(!name) return false
    if(name.length < 3) return false
    if (name.length > 100) return false
    return true
}