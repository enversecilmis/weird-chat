import React, { useEffect, useRef, useState } from 'react'
import { MdDoubleArrow } from 'react-icons/md'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'
import { getImage, getRGBA, setRGBA } from '../utils/utils'
import ImageChooseButton from './ImageChooseButton'




const SteganographyTools = ({  }) => {
    const classes = useStyles()

    const [encImgSrc, setEncImgSrc] = useState('')
    const [decImgSrc, setDecImgSrc] = useState('')
    const [decdMessage, setDecdMessage] = useState('')
    const [message, setMessage] = useState('')

    const encImg = useRef()
    const decImg = useRef()


    // Component did mount
    useEffect(() => {

        encImg.current.addEventListener("dragenter",(e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        encImg.current.addEventListener("dragover",(e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        encImg.current.addEventListener('drop', async (e) => {
            e.stopPropagation()
            e.preventDefault()

            const bitmap = await getImage(e)

            const context = encImg.current.getContext('2d')
            context.drawImage(bitmap,0,0,150,150)
        })

        decImg.current.addEventListener("dragenter",(e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        decImg.current.addEventListener("dragover",(e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        decImg.current.addEventListener('drop', async (e) => {
            e.stopPropagation()
            e.preventDefault()

            const bitmap = await getImage(e)

            const context = decImg.current.getContext('2d')
            context.drawImage(bitmap,0,0,150,150)
        })

    }, [])


    const encodeImage = () => {

        const context = encImg.current.getContext('2d')
        const imgData = context.getImageData(0,0,150,150)
        const data = imgData.data

        // Frame Start
        data[0] = 17
        data[1] = 17
        data[2] = 17
        data[3] = 255

        let r,g,b
        for(let i=1; i<=message.length; i++){
            [r,g,b] = getRGBA(imgData, i,i)
            r = message.charCodeAt(i)

            const pos = i * (imgData.width * 4) + i * 4
            data[pos] = r
            data[pos+1] = g
            data[pos+2] = b
            data[pos+3] = 255
        }

        const pos = (message.length+1) * (imgData.width * 4) + (message.length+1) * 4
        // Frame End
        data[pos] = 17
        data[pos+1] = 17
        data[pos+2] = 17
        data[pos+3] = 255
        context.putImageData(imgData, 0, 0)
    }



    const decodeImage = () => {
        const context = decImg.current.getContext('2d')
        const imgData = context.getImageData(0,0,150,150)
        let decmsg = ''
        
        const fstart = getRGBA(imgData, 0,0)
        console.log(fstart);
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
        console.log(decmsg);
        setDecdMessage( decmsg )
    }


    return (
        <div className={classes.container}>
            <h2>Veri Gizle</h2>
            
            <div className={classes.encode} >
                <input
                    className='message'
                    value={message}
                    onChange={ e => setMessage(e.target.value) }
                />
                <MdDoubleArrow className='icon' onClick={encodeImage}/>
                <canvas ref={encImg} width={150} height={150} />
                <ImageChooseButton onLoad={ bitmap => {
                    const context = encImg.current.getContext('2d')
                    context.drawImage(bitmap,0,0,150,150)
                }} />
            </div>

            <h2>Veri Çıkart</h2>
            <div className={classes.decode} >
                <ImageChooseButton onLoad={ bitmap => {
                    const context = decImg.current.getContext('2d')
                    context.drawImage(bitmap,0,0,150,150)
                }} />
                <canvas ref={decImg} width={150} height={150} />
                <MdDoubleArrow className='icon' onClick={decodeImage}/>
                <input className='message' readOnly value={decdMessage} />
            </div>
            
        </div>
    )
}




const useStyles = createUseStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',

        '& h2': {
            alignSelf: 'center',
            marginBottom: 50,
        },
    },
    encode: {
        display: 'flex',
        alignItems: 'center',

        
        '& .icon': {
            fontSize: 40,
            cursor: 'pointer',
            transition: 'color 200ms linear',

            '&:hover': {
                color: colors.green,
            },
        },
        '& .message': {
            border: 'none',
            outline: 'none',
        },


    },
    decode: {
        display: 'flex',
        alignItems: 'center',

        '& .icon': {
            fontSize: 40,
            cursor: 'pointer',
            transition: 'color 200ms linear',

            '&:hover': {
                color: colors.green,
            },
        },
        '& .message': {
            border: 'none',
            outline: 'none',
        },
    }
})


export default SteganographyTools