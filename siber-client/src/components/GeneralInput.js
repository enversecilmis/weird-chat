import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import {  MdSend, MdOutlineCancel } from 'react-icons/md'

import colors from '../utils/Colors'
import TextInput from './TextInput'
import ImageChooseButton from './ImageChooseButton'
import { getImage } from '../utils/utils'




const GeneralInput = ({
    placeholder='',
    avoidEmptyText=true,
    onSubmit = function(text=''){},
    onImageLoad=(img64='')=>{},
    onImageSubmit=(img64='')=>{},
}) => {
    const classes = useStyles()
    const [imgSrc, setImgSrc] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const inputsDiv = useRef()
    const imagePreview = useRef()

    useEffect(() => {
        setIsOpen( (imgSrc && true) )
    }, [imgSrc])
    

    // Component did mount
    useEffect(() => {
        inputsDiv.current.addEventListener("dragenter",(e) => {
            e.stopPropagation()
            e.preventDefault()
            setIsOpen(true)
        }, false)
        inputsDiv.current.addEventListener("dragover",(e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        inputsDiv.current.addEventListener("drop",(e) => {
            e.stopPropagation()
            e.preventDefault()

            getImage(e, (img64) => {
                setImgSrc(img64)
            })

        }, false)

        imagePreview.current.addEventListener("dragenter",(e) => {
            e.stopPropagation()
            e.preventDefault()
            setIsOpen(true)
        }, false)
        imagePreview.current.addEventListener("dragover",(e) => {
            e.stopPropagation()
            e.preventDefault()
        }, false)
        imagePreview.current.addEventListener('drop', (e) => {
            e.stopPropagation()
            e.preventDefault()

            getImage(e, (img64) => {
                setImgSrc(img64)
            })            
        })
        imagePreview.current.addEventListener('dragleave', (e) => {
            e.stopPropagation()
            e.preventDefault()

            setIsOpen(false)
        })
    }, [])


    return (
        <div className={classes.container}>
            
            <div ref={imagePreview} className={classes.imagePreview} style={{display: isOpen? 'flex':'none',}}>
                
                {imgSrc?
                <>
                <img src={imgSrc} width={150} height={150} />

                <div className='previewButtonsDiv'>
                    <MdSend className='sendButton' onClick={() => {
                        onImageSubmit(imgSrc)
                        setImgSrc('')
                    }}/>
                    <MdOutlineCancel className='cancelButton' onClick={() => {
                        setImgSrc('')
                    }}/>
                    
                </div>
                </>:
                <p>Drop Here</p>
                }
            </div>
                
            <div className={classes.inputs} ref={inputsDiv}>
                <ImageChooseButton
                    onLoad={(img64) => {
                        onImageLoad(img64)
                        setImgSrc(img64)
                    }}
                />
                <TextInput
                    avoidEmptyText={avoidEmptyText}
                    placeholder={placeholder}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
    },
    inputs: {
        display: 'flex',
        alignItems: 'center',
    },
    imagePreview: {
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