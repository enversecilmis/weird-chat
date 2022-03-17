import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

import {  MdSend } from 'react-icons/md'
import colors from '../utils/Colors'



const Messages = ({ users, selected, messages }) => {
    const classes = useStyles()
    const [textMessage, setTextMessage] = useState('')


    return (
        <div className={classes.container}>
            <h1>Mesajlar</h1>

            {selected &&
            <div className={classes.messageSection}>

                <div className={classes.messagesContainer}>
                    {messages[selected]?.map(( { uid, msg, isImg }, index ) => 
                        isImg?
                        <div className={classes.imgMessage}>
                            Image
                        </div>
                        :
                        <div className={classes.textMessage}>
                            {msg}
                        </div>
                    )
                    ||
                    <p>Henüz Mesaj Yok</p>
                    }
                </div>

                <div className='sendTextBox'>
                    <input
                        value={ textMessage }
                        onChange={ (e) => setTextMessage(e.target.value) }
                        placeholder={ 'mesaj...' }
                    />
                    <MdSend className='sendIcon' style={{
                        color: textMessage? colors.green : colors.darklighterlighterlighter,
                    }}/>
                </div>
            </div>

            }
        </div>
    )
}





const useStyles = createUseStyles({
    container:{
        backgroundColor: 'red',
        '& h1': {
            textAlign: 'center',
            fontSize: 40,
        },
    },
    messageSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        '& .sendTextBox': {
            marginBottom: 20,
            position: 'relative',

            '& input': {
                border: 'none',
                borderRadius: 11,
                padding: [0,30,4,10],
                
                fontSize: 18,
                color: colors.darklighter,


                '&:focus': {
                    outline:'none',
                }
            },
            '& .sendIcon': {
                fontSize: 22,
                position: 'absolute',
                right: 5,
                top: '10%',
                transition: 'color 250ms linear',
            }
        },
    },
    messagesContainer: {

        
    },
    textMessage: {

    },
    imgMessage: {

    },
})


export default Messages