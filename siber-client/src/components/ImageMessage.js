import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'





const ImageMessage = ({ bitmap, className }) => {
    const classes = useStyles()
    const cnvs = useRef()

    useEffect(() => {

        
        const buf8 = new Uint8ClampedArray(bitmap)
        const context = cnvs.current.getContext('2d')
        const imgData = context.getImageData(0,0,150,150)
        imgData.data.set(buf8)
        context.putImageData(imgData,0,0)

        // drag images as files
        // cnvs.current.toBlob(blob => {
        //     cnvs.current.addEventListener('dragstart', (event) => {

        //     })
        //     console.log(blob);
        // })
    }, [])

    return (
        <div className={ classes.container + " " + className }>
            <canvas ref={cnvs} width={150} height={150} />
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
        backgroundColor: colors.sentMessageBG,
        borderRadius: 10,
        padding:5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default ImageMessage