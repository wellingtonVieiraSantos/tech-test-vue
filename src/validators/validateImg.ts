export const validateImg = (img: string) => {
    if(img.startsWith('http') && /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(img)) return true
    return false
}