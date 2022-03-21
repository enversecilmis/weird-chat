import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import {  MdSend, MdPermMedia } from 'react-icons/md'

import colors from '../utils/Colors'




const TextInput = ({
    onSubmit = function(text=''){},
    placeholder='',
    avoidEmptyText=true
}) => {
    const classes = useStyles()
    const [text, setText] = useState('')

    return (
        <form
            className={classes.container}
            onSubmit={(e) => {
                e.preventDefault()
                if(avoidEmptyText && text === '')
                    return
                onSubmit(text)
                setText('')
            }}
        >
            <input
                value={ text }
                onChange={ (e) => setText(e.target.value) }
                placeholder={ placeholder }
            />
            <MdSend
                className='sendIcon'
                style={{ color: text? colors.green : colors.darklighterlighterlighter }}
                onClick={() => {
                    if(avoidEmptyText && text === '')
                        return
                    onSubmit(text)
                    setText('')
                }}
            />

        </form>
    )
}





const useStyles = createUseStyles({
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        width:'100%', // ********************************
        
        padding: [0,0,2,10],
        borderRadius: 11,
        backgroundColor: colors.light,
        
        '& input': {
            width:'100%', // ********************************
            
            border: 'none',
            background: 'transparent',
            fontSize: 18,
            color: colors.darklighter,

            '&:focus': {
                outline:'none',
            }
        },
        '& .sendIcon': {
            fontSize: 21,
            marginTop:3,
            marginRight:4,
            transition: 'color 250ms linear',
            cursor: 'pointer',
        }
    },
})


export default TextInput