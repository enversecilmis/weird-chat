import React from 'react'
import { createUseStyles } from 'react-jss'




const Messages = ({ users, selected, messages }) => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <h1>Mesajlar</h1>

            {selected && 
            <div className={classes.messagesContainer}>
                {messages[selected]?.map(( { uid, msg, isImg }, index ) => 
                    isImg &&
                    <div className={classes.imgMessage}>
                        Image
                    </div>
                    ||
                    <div className={classes.textMessage}>
                        {msg}
                    </div>
                )
                }
            </div>

            }
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
        '& h1': {
            textAlign: 'center',
            fontSize: 40,
        },
    },
    messagesContainer: {
        backgroundColor: 'green'
    },
    textMessage: {

    },
    imgMessage: {

    },
})


export default Messages