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
        if (text == '') {
            return
        }

        const frame = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
        //header
        let crntPos = 0
        for (let i = 0; i < 16; i++) {
            if ((crntPos + 1) % 4 == 0)
                crntPos++


            frame[i] ?
                data[crntPos] = data[crntPos] | 1 :
                data[crntPos] &= ~1

            crntPos++
        }

        // data
        for (let i = 0; i < text.length; i++) {
            let bitString = text.charCodeAt(i).toString(2)

            // başını 0 doldurarak 16'ya tamamla
            while (bitString.length < 16) {
                bitString = "0" + bitString
            }

            for (let j = 0; j < 16; j++) {
                if ((crntPos + 1) % 4 == 0)
                    crntPos++

                if (bitString.charAt(j) == "1") {
                    console.log("true: ", bitString.charAt(j));
                    data[crntPos] = data[crntPos] | 1
                }
                else {
                    console.log("false: ", bitString.charAt(j));
                    data[crntPos] &= ~1
                }

                crntPos++
            }
        }

        // trailer
        for (let i = 0; i < 16; i++) {
            if ((crntPos + 1) % 4 == 0)
                crntPos++

            frame[i] ?
                data[crntPos] = data[crntPos] | 1 :
                data[crntPos] &= ~1

            crntPos++
        }

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