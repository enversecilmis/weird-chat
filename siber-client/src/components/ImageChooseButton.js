import React, { useRef } from 'react'
import { MdPermMedia } from 'react-icons/md'
import { createUseStyles } from 'react-jss'

import colors from '../utils/Colors'



const ImageChooseButton = ({ className, onLoad=(img64='')=>{} }) => {
    const classes = useStyles()

    const hiddenInput = useRef()

    return (
        <div className={classes.container}>
            <input ref={hiddenInput} type="file" accept="image/*" style={{display: 'none'}} 
                onChange={(event) => {
                    const reader = new FileReader()
                    // reader.onload = () => {onLoad(reader.result)}
                    reader.onload = (e) => {onLoad(e.target.result)}
                    reader.readAsDataURL(event.target.files[0])
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