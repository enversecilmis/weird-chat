import React from 'react'
import { MdPermMedia } from 'react-icons/md'
import { createUseStyles } from 'react-jss'

import colors from '../utils/Colors'



const ImageChooseButton = ({ className, onLoad }) => {
    const classes = useStyles()

    return (
        <>
            <input id='selectImage' type="file" accept="image/*" style={{display: 'none'}} 
                onChange={(event) => {
                    const reader = new FileReader()
                    reader.onload = () => onLoad(reader.result)
                    reader.readAsDataURL(event.target.files[0])
                }}
            />
            <MdPermMedia
                className={classes.chooseImageButton + " " + className}
                onClick={() => document.querySelector('#selectImage').click() }
            />
        </>
    )
}





const useStyles = createUseStyles({
    chooseImageButton: {
        fontSize: 21,
        marginRight: 4,
        cursor: 'pointer',

        '&:hover': {
            color: colors.greenellow
        }
    },
})


export default ImageChooseButton