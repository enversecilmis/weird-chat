import React, { useEffect, useRef, useState } from 'react'
import { MdDoubleArrow } from 'react-icons/md'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'
import { getRGBA } from '../utils/utils'





const ImageMessage = ({ bitmap, className }) => {
    const classes = useStyles()
    const cnvs = useRef()
    const [msg, setMsg] = useState('')

    const decodeImage = () => {
        const context = cnvs.current.getContext('2d')
        const imgData = context.getImageData(0,0,150,150)
        let decmsg = ''
        
        const fstart = getRGBA(imgData, 0,0)
        // check start
        if(fstart[0] === 17 && fstart[1] === 17 && fstart[2] === 17){
            for(let i=1; i<100; i++){
                let rgba = getRGBA(imgData, i,i)
                // check end
                if(rgba[0] === 17 && rgba[1] === 17 && rgba[2] === 17)
                    break
                else
                    decmsg += String.fromCharCode(rgba[0])
            }
        }
        setMsg( decmsg )
    }

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
            <MdDoubleArrow className='icon' onClick={decodeImage}/>
            <p>{msg}</p>
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