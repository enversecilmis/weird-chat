import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import {  MdSend } from 'react-icons/md'

import colors from '../utils/Colors'
import useSocket from '../client'




const TextInput = ({ selected }) => {
    const classes = useStyles()

    const [textMessage, setTextMessage] = useState('')

    const socket = useSocket()
    

    const sendMessage = (e) => {
        e.preventDefault()

        socket.emit('message', { id: selected, msg: textMessage, isImg: false })
        console.log("wtf");
        setTextMessage('')
    }
    return (
        <form onSubmit={sendMessage}>
            <div className={classes.container}>

                <input
                    value={ textMessage }
                    onChange={ (e) => setTextMessage(e.target.value) }
                    placeholder={ 'mesaj...' }
                />
                <MdSend className='sendIcon' style={{
                    color: textMessage? colors.green : colors.darklighterlighterlighter,
                }}/>
            </div>
        </form>
    )
}





const useStyles = createUseStyles({
    container:{
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
})


export default TextInput