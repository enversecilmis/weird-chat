import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import {  MdSend, MdPermMedia } from 'react-icons/md'

import colors from '../utils/Colors'
import TextInput from './TextInput'
import ImageChooseButton from './ImageChooseButton'




const GeneralInput = ({
    placeholder='',
    avoidEmptyText=true,
    showImagePreview=true,
    onSubmit = function(text=''){},
    onImageLoad=(img64='')=>{},
}) => {
    const classes = useStyles()
    const [imgSrc, setImgSrc] = useState('')

    return (
        <div className={classes.container}>
            <img id={placeholder} src={imgSrc}
                style={{
                    display: imgSrc? 'block':'none',
                    backgroundColor: 'red',
                    maxWidth: 200,
                    maxHeight: 200,
                }} />
                
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
    }
})


export default GeneralInput