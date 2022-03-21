import React from 'react'
import { createUseStyles } from 'react-jss'
import {  MdSend, MdPermMedia } from 'react-icons/md'

import colors from '../utils/Colors'




const TextInput = ({ text, setText, submit, placeholder }) => {
    const classes = useStyles()


    return (
        <form onSubmit={submit} className={classes.container}>
            <input
                value={ text }
                onChange={ (e) => setText(e.target.value) }
                placeholder={ placeholder }
            />
            <MdSend onClick={submit} className='sendIcon' style={{
                color: text? colors.green : colors.darklighterlighterlighter,
            }}/>
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