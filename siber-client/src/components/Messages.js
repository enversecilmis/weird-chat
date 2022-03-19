import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import TextInput from './TextInput'




const Messages = ({ user, messages, selected }) => {
    const classes = useStyles()


    useEffect(() => {
        console.log(messages);

    })


    return (
        <div className={classes.container}>
            <h1>Mesajlar</h1>

            {user &&
            <div className={classes.messageSection}>

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
                <TextInput selected={ selected } />
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
        display: 'flex',
        flexDirection: 'column',
    },
    messageSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,

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