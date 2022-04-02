import React from 'react'
import colors from '../utils/Colors'
import { createUseStyles } from 'react-jss'
import ImageMessage from './ImageMessage'
import TextMessage from './TextMessage'




const Messages = ({ selfId, messages }) => {
    const classes = useStyles()


    return (
        <div className={classes.container}>
    {
        (messages &&
        messages.map(( { id, msg, isImg }, index ) => 
            isImg?
            <ImageMessage key={ index } className={selfId===id? 'sent' : 'received'} bitmap={ msg } />
            :
            <TextMessage key={ index } className={selfId===id? 'sent' : 'received'} msg={ msg } />
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
        width: 350,
        overflow: 'scroll',
        scrollbarWidth: 'none',

        '& .received': {
            alignSelf: 'start',
            borderRadius: [0,10,10,10],
            backgroundColor: colors.receivedMessageBG,
            marginBottom: 5,
            maxWidth: '70%',
        },
        '& .sent': {
            alignSelf: 'end',
            borderRadius: [10,0,10,10],
            backgroundColor: colors.sentMessageBG,
            marginBottom: 5,
            maxWidth: '70%',
        },
        
    },
})


export default Messages