import React from 'react'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'
import ImageMessage from './ImageMessage'
import TextMessage from './TextMessage'




const Messages = ({ selfId, messages }) => {
    const classes = useStyles()


    return (
        <div className={classes.container}>

        {(messages &&
        messages.map(( { id, msg, isImg }, index ) => 
            isImg?
            <ImageMessage key={ index } className={selfId===id? 'self' : 'sender'} msg={ msg } />
            :
            <TextMessage key={ index } className={selfId===id? 'self' : 'sender'} msg={ msg } />
        ))
        ||
            <i>Henüz mesaj yok</i>
        }

        </div>
    )
}





const useStyles = createUseStyles({
    container: {
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 280,

        '& .sender': {
            alignSelf: 'start',
            borderRadius: [0,10,10,10],
            backgroundColor: colors.receivedMessageBG,
            marginBottom: 5,
            maxWidth: '70%',
        },
        '& .self': {
            alignSelf: 'end',
            borderRadius: [10,0,10,10],
            backgroundColor: colors.sentMessageBG,
            marginBottom: 5,
            maxWidth: '70%',
        },
        
    },
})


export default Messages