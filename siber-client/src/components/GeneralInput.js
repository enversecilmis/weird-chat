import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import {  MdSend, MdOutlineCancel } from 'react-icons/md'

import colors from '../utils/Colors'
import TextInput from './TextInput'
import ImageChooseButton from './ImageChooseButton'




const GeneralInput = ({
    placeholder='',
    avoidEmptyText=true,
    showImagePreview=true,
    onSubmit = function(text=''){},
    onImageLoad=(img64='')=>{},
    onImageSubmit=(img64='')=>{},
}) => {
    const classes = useStyles()
    const [imgSrc, setImgSrc] = useState('')

    return (
        <div className={classes.container}>
            <div className={classes.imagePreview} style={{display: imgSrc? 'flex':'none',}}>
                <img id={placeholder} src={imgSrc}
                    style={{
                        backgroundColor: 'red',
                        maxWidth: 200,
                        maxHeight: 200,
                    }}
                    width={150} height={150}
                    />

                <div className='previewButtonsDiv'>
                    <MdSend className='sendButton' onClick={() => {
                        onImageSubmit(imgSrc)
                        setImgSrc('')
                    }}/>
                    <MdOutlineCancel className='cancelButton' onClick={() => {
                        setImgSrc('')
                    }}/>
                    
                </div>
            </div>
                
            <div className={classes.inputs}>
                <ImageChooseButton onLoad={(img64) => {
                    onImageLoad(img64)
                    showImagePreview && setImgSrc(img64)
                }} />
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