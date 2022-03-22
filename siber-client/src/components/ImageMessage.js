import React from 'react'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'





const ImageMessage = ({ msg, className }) => {
    const classes = useStyles()

    return (
        <div className={ classes.container + " " + className }>
            <img src={msg} width={150} height={150} />
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
        backgroundColor: colors.sentMessageBG,
        borderRadius: 10,
        padding:5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default ImageMessage