import React from 'react'
import { createUseStyles } from 'react-jss'




const Messages = ({ user, messages }) => {
    const classes = useStyles()


    return (
        <div className={classes.container}>
            <div className={classes.messagesContainer}>
                {(messages && messages.map(( { id, msg, isImg }, index ) => 
                    isImg?
                    <div key={index} className={classes.imgMessage}>
                        Image
                    </div>
                    :
                    <div key={index} className={classes.textMessage}>
                        {msg}
                    </div>
                ))
                ||
                <i>Henüz mesaj yok</i>
                
                }
            </div>
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
        display: 'flex',
        flexDirection: 'column',
        flex:1,
    },
    messagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
})


export default Messages