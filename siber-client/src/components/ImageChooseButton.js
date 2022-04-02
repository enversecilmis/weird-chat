import React, { useRef } from 'react'
import { MdPermMedia } from 'react-icons/md'
import { createUseStyles } from 'react-jss'

import colors from '../utils/Colors'
import { getImage } from '../utils/utils'



const ImageChooseButton = ({ className, onLoad=(bitmap)=>{} }) => {
    const classes = useStyles()

    const hiddenInput = useRef()

    return (
        <div className={classes.container}>
            <input ref={hiddenInput} type="file" accept="image/*" style={{display: 'none'}} 
                onChange={ async (event) => {
                    const bitmap = await getImage(event, onLoad )
                    onLoad(bitmap)
                }}
            />
            <MdPermMedia
                className={classes.chooseImageButton + " " + className}
                onClick={() => hiddenInput.current.click() }
            />
        </div>
    )
}





const useStyles = createUseStyles({
    container: {
        margin: 0,
        padding:0,
        display: 'inline-flex'
    },
    chooseImageButton: {
        fontSize: 21,
        marginRight: 4,
        cursor: 'pointer',

        '&:hover': {
            color: colors.greenellow
        }
    },
    hiddenInput: {

    }
})


export default ImageChooseButton