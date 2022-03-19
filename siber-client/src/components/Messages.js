import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import TextInput from './TextInput'




const Messages = ({ user, messages }) => {
    const classes = useStyles()


    useEffect(() => {
        console.log(messages);

    })


    return (
        <div className={classes.container}>

            {user &&
            <div className={classes.messagesContainer}>
                {messages && messages.map(( { id, msg, isImg }, index ) => 
                    isImg?
                    <div key={index} className={classes.imgMessage}>
                        Image
                    </div>
                    :
                    <div key={index} className={classes.textMessage}>
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
        display: 'flex',
        flexDirection: 'column',
    },
    messagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    textMessage: {

    },
    imgMessage: {

    },
})


export default Messages