import React from 'react'
import { createUseStyles } from 'react-jss'





const ImageMessage = ({ msg }) => {
    const classes = useStyles()


    return (
        <div className={classes.container}>
            { msg }
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
        
    },
})


export default ImageMessage