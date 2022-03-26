const getRGBA = (imageData, x, y) => {
    const i = y * (imageData.width * 4) + x * 4
    const colors = imageData.data
    const [ red, green, blue, alpha ] = [ colors[i], colors[i+1], colors[i+2], colors[i+3] ]
    
    return [ red, green, blue, alpha ]
}


const setRGBA = (context, imgData, x, y, rgba) => {
    const data = imgData.data
    const i = y * (imgData.width * 4) + x * 4
    
    data[i] = rgba[0]
    data[i+1] = rgba[1]
    data[i+2] = rgba[2]
    data[i+3] = rgba[3]

    context.putImageData(imgData, 0, 0)
}


export { getRGBA, setRGBA }