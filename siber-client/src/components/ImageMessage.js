import React from 'react'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'





const ImageMessage = ({ msg, className }) => {
    const classes = useStyles()

    return (
        <div className={ classes.container + " " + className }>
            <img src={msg} width={100} height={100} />
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
        backgroundColor: colors.sentMessageBG,
        borderRadius: 10,
        padding:5,
    },
})


export default ImageMessage