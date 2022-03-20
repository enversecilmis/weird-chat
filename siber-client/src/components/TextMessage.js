import React from 'react'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors';





const TextMessage = ({ msg, className }) => {
    const classes = useStyles()
    console.log(classes);


    return (
        <div className={ classes.container + " " + className }>
            { msg }
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
        backgroundColor: colors.green,
        borderRadius: 12,
        padding:5,
    },
})


export default TextMessage