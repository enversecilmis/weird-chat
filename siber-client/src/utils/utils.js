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

const getImage = (event, onLoad = (img64) => {}, width=150, height=150) => {

    const data = event.dataTransfer?.getData("text/plain")
    if(data){
        const img = document.createElement('img')
        img.onload = () => {
            onLoad( resizeImage(img, width, height) )
        }
        img.src = data
        return
    }


    const reader = new FileReader()
    reader.onload = () => {
        const img = document.createElement('img')
        img.onload = () => onLoad( resizeImage(img, width, height) )
        img.src = reader.result
        // console.log(reader.result);
    }
    
    event.dataTransfer?
    reader.readAsDataURL(event.dataTransfer.files[0]):  
    reader.readAsDataURL(event.target.files[0])
    
    // event.dataTransfer?
    // reader.readAsArrayBuffer(event.dataTransfer.files[0]):  
    // reader.readAsArrayBuffer(event.target.files[0])
}



const resizeImage = (img, width, height) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)

    
    return canvas.toDataURL('image/jpg')
}


export { getRGBA, setRGBA, getImage }