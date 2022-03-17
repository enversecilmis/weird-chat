import React from 'react'
import { createUseStyles } from 'react-jss'




const Messages = ({ users, selected, mesages }) => {
    const classes = useStyles()



    return (
        <div className={classes.container}>
            <h1>Mesajlar</h1>
        </div>
    )
}





const useStyles = createUseStyles({
    container:{

        
        '& h1': {
            textAlign: 'center',
            fontSize: 40,
        },

    }
})


export default Messages