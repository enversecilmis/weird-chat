import React, { useEffect, useRef, useState } from 'react'
import { MdDoubleArrow } from 'react-icons/md'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'
import { getImage, getRGBA, setRGBA } from '../utils/utils'




const SteganographyTools = ({  }) => {
    const classes = useStyles()

    const [encImgSrc, setEncImgSrc] = useState('')
    const [encdImgSrc, setEncdImgSrc] = useState('')
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
        encImg.current.addEventListener('drop', (e) => {
            e.stopPropagation()
            e.preventDefault()

            getImage(e, setEncImgSrc)
        })

        decImg.current.addEventListener("dragenter",(e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        decImg.current.addEventListener("dragover",(e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        decImg.current.addEventListener('drop', (e) => {
            e.stopPropagation()
            e.preventDefault()

            getImage(e, setDecImgSrc )
        })

    }, [])


    const encodeImage = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 150
        canvas.height = 150
        const context = canvas.getContext('2d')
        context.drawImage(encImg.current,0,0,150,150)
        const imgData = context.getImageData(0,0,150,150)
        const buf8 = imgData.data
        const data = new Uint32Array(buf8.buffer)
        console.log(data);


        // data[y * canvas.width + x]
        // console.log("Encoding ***********");
        // for(let i=0; i<message.length; i++){
        //     let rgba = getRGBA(imgData, i,i)
        //     console.log(rgba);
        // }
        
        
        let r,g,b,a
        for(let i=0; i<message.length; i++){
            [r,g,b,a] = getRGBA(imgData, i,i)
            r = message.charCodeAt(i)
            data[i * canvas.width + i] = (a << 24) | (r << 16) | (g << 8) | b
        }
        console.log(data);
        setEncImgSrc(canvas.toDataURL('image/jpeg'))


        // console.log("Encoded ***********");
        // for(let i=0; i<message.length; i++){
        //     let rgba = getRGBA(imgData, i,i)
        //     console.log(rgba);
        // }
        canvas.remove()
    }



    const decodeImage = () => {
        if(!decImg)
            return

        const canvas = document.createElement('canvas')
        canvas.width = 150
        canvas.height = 150
        const context = canvas.getContext('2d')
        context.drawImage(decImg.current,0,0,150,150)
        const imgData = context.getImageData(0,0,150,150)
        let decmsg = ''
        
        console.log("Got The Encoded ***********");
        for(let i=0; i<message.length; i++){
            let rgba = getRGBA(imgData, i,i)
            console.log(rgba);
            decmsg += String.fromCharCode(rgba[0])
        }
        setDecdMessage( decmsg )

        canvas.remove()
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
                <img ref={encImg} src={encImgSrc} width={150} height={150} />

            </div>

            <h2>Veri Çıkart</h2>
            <div className={classes.decode} >
                <img ref={decImg} src={decImgSrc} width={150} height={150} />
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