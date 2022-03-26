import React, { useEffect, useRef, useState } from 'react'
import { MdDoubleArrow } from 'react-icons/md'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'
import { getRGBA, setRGBA } from '../utils/utils'




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

            const data = e.dataTransfer.getData("text/plain")
            if(data){
                setEncImgSrc(data)
                return
            }

            const reader = new FileReader()
            reader.onload = e => setEncImgSrc(e.target.result)
            reader.readAsDataURL(e.dataTransfer.files[0])
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

            const data = e.dataTransfer.getData("text/plain")
            if(data){
                setDecImgSrc(data)
                return
            }

            const reader = new FileReader()
            reader.onload = e => setDecImgSrc(e.target.result)
            reader.readAsDataURL(e.dataTransfer.files[0])
        })
    }, [])


    const encodeImage = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 150
        canvas.height = 150
        const context = canvas.getContext('2d')
        context.drawImage(encImg.current,0,0,150,150)
        const imgData = context.getImageData(0,0,150,150)


        for(let i=0; i<message.length; i++){
            let rgba = getRGBA(imgData, i,i)
            rgba[3] = message.charCodeAt(i)
            setRGBA(context, imgData, i, i, rgba)
        }
        setRGBA(context, imgData, message.length+1,message.length+1, [1,2,3,4])
        setEncdImgSrc(canvas.toDataURL('image/jpeg'))



        console.log("Encoded ***********");
        for(let i=0; i<message.length; i++){
            let rgba = getRGBA(imgData, i,i)
            console.log(rgba);
        }
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
        
        console.log("Got The Encoded ***********");
        for(let i=0; i<message.length; i++){
            let rgba = getRGBA(imgData, i,i)
            console.log(rgba);
        }

        // let i = 0;
        // while(true){
            
        //     i += 1;
        // }
        canvas.remove()
    }


    return (
        <div className={classes.container}>
            <h2>Veri Gizle</h2>
            
            <div className={classes.encode} >

                <img ref={encImg} src={encImgSrc} width={150} height={150} />
                <div className='transform'>
                    <MdDoubleArrow className='icon' onClick={encodeImage}/>
                    <input
                        className='message'
                        value={message}
                        onChange={ e => setMessage(e.target.value) }
                    />
                </div>
                <img src={encdImgSrc} width={150} height={150} />

            </div>

            <h2>Veri Çıkart</h2>
            <div className={classes.decode} >
                <img ref={decImg} src={decImgSrc}  />
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

        '& .transform': {
            display: 'flex',
            flexDirection: 'column',
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