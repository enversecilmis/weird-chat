import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { MdSend, MdOutlineCancel } from 'react-icons/md'

import colors from '../utils/Colors'
import TextInput from './TextInput'
import ImageChooseButton from './ImageChooseButton'
import { getImage, getRGBA } from '../utils/utils'




const GeneralInput = ({
    placeholder = '',
    avoidEmptyText = true,
    onSubmit = function (text = '') { },
    onImageSubmit = (bitmap = '') => { },
}) => {
    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('')
    const inputsDiv = useRef()
    const imagePreview = useRef()


    // Component did mount
    useEffect(() => {
        inputsDiv.current.addEventListener("dragenter", (e) => {
            e.stopPropagation()
            e.preventDefault()
            setIsOpen(true)
        }, false)
        inputsDiv.current.addEventListener("dragover", (e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        inputsDiv.current.addEventListener("drop", async (e) => {
            e.stopPropagation()
            e.preventDefault()

            const bitmap = await getImage(e)

            const context = imagePreview.current.getContext('2d')
            context.drawImage(bitmap, 0, 0, 150, 150)
            setIsOpen(true)

        }, false)


    }, [])


    const encodeImage = () => {

        const context = imagePreview.current.getContext('2d')
        const imgData = context.getImageData(0, 0, 150, 150)
        const data = imgData.data

        // Frame Start
        data[0] = 17
        data[1] = 17
        data[2] = 17
        data[3] = 255

        let r, g, b
        for (let i = 1; i <= text.length; i++) {
            [r, g, b] = getRGBA(imgData, i, i)
            r = text.charCodeAt(i)

            const pos = i * (imgData.width * 4) + i * 4
            data[pos] = r
            data[pos + 1] = g
            data[pos + 2] = b
            data[pos + 3] = 255
        }

        const pos = (text.length + 1) * (imgData.width * 4) + (text.length + 1) * 4
        // Frame End
        data[pos] = 17
        data[pos + 1] = 17
        data[pos + 2] = 17
        data[pos + 3] = 255
        context.putImageData(imgData, 0, 0)
    }


    return (
        <div className={classes.container}>

            <div className={classes.imagePreviewCont} style={{ display: isOpen ? 'flex' : 'none', }}>

                <canvas ref={imagePreview} width={150} height={150} />

                <div className='previewButtonsDiv'>
                    <MdSend className='sendButton' onClick={() => {
                        encodeImage()

                        const data = imagePreview.current.getContext('2d').getImageData(0, 0, 150, 150).data
                        onImageSubmit(data)

                        setText('')
                        setIsOpen(false)
                    }} />
                    <MdOutlineCancel className='cancelButton' onClick={() => {
                        setIsOpen(false)
                    }} />

                </div>
            </div>

            <div className={classes.inputs} ref={inputsDiv}>
                <ImageChooseButton
                    onLoad={(bitmap) => {
                        const context = imagePreview.current.getContext('2d')
                        context.drawImage(bitmap, 0, 0, 150, 150)
                        console.log("icb ol", isOpen);
                        setIsOpen(true)
                    }}
                />

                <input value={text}
                    onChange={(e) => setText(e.target.value)} />
            </div>
        </div>
    )
}





const useStyles = createUseStyles({
    container: {
        width: "100%",
        padding: 10,
        backgroundColor: "#444",
        borderRadius: 15,
        overflow: "hidden",
        margin: 15
    },
    inputs: {
        display: 'flex',
        alignItems: 'center',
    },
    imagePreviewCont: {
        backgroundColor: colors.darklighter,
        padding: 10,
        borderRadius: 15,
        justifyContent: 'space-around',
        alignItems: 'center',

        '& .previewButtonsDiv': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        '& .sendButton': {
            color: colors.green,
            fontSize: 30,
            borderRadius: '50%',
            padding: 10,
            cursor: 'pointer',
            transition: 'background-color 250ms linear',


            '&:hover': {
                backgroundColor: colors.darklighterlighter
            }
        },
        '& .cancelButton': {
            color: colors.red,
            fontSize: 30,
            borderRadius: '50%',
            padding: 10,
            cursor: 'pointer',
            transition: 'background-color 250ms linear',

            '&:hover': {
                backgroundColor: colors.darklighterlighter
            }
        }

    }
})


export default GeneralInput