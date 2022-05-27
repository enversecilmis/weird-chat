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
        const data = imgData.data

        const frame ='1010101010101010'
        let crntPos = 0
        let decmsg = ''

        // check start of frame
        let fStart = ''
        for(let i=0; i<16; i++){
            if ((crntPos + 1) % 4 == 0)
                crntPos++
            
            const bit = data[crntPos] & 1
            fStart += bit
            crntPos++
        }
        if(fStart !== frame){
            return
        }
        console.log();
        console.log("===== frame start =========");
        console.log(fStart);
        console.log("===========================");
        console.log();
        
        // extract data
        while(crntPos < data.length){
            let bits = ''

            for(let i=0; i<16; i++){
                if ((crntPos + 1) % 4 == 0)
                    crntPos++
                
                const bit = data[crntPos] & 1
                bits += bit
                crntPos++
            }
            // check end of frame
            if(bits === frame){
                console.log();
                console.log("===== frame end =========");
                console.log(bits);
                console.log("=========================");
                break
            }
            console.log(bits);

            let charCode = parseInt(bits,2)
            let char = String.fromCharCode(charCode)
            decmsg += char

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