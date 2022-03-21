import React from 'react'
import { createUseStyles } from 'react-jss'



const IconButton = ({ icon, onClick }) => {
    const classes = useStyles()


    return (
        <div className={classes.container}>
            { icon }
        </div>
    )
}





const useStyles = createUseStyles({
    container:{

    },
})


export default IconButton