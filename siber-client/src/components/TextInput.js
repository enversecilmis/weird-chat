import React from 'react'
import { createUseStyles } from 'react-jss'
import {  MdSend } from 'react-icons/md'

import colors from '../utils/Colors'




const TextInput = ({ text, setText, submit, placeholder }) => {
    const classes = useStyles()


    return (
        <form onSubmit={(e) => {
            console.log('====================================');
            console.log("heyooo ");
            console.log('====================================');
            console.log(text);
            submit(e)
        }} className={classes.container}>
            <input
                value={ text }
                onChange={ (e) => setText(e.target.value) }
                placeholder={ placeholder }
            />
            <MdSend className='sendIcon' style={{
                color: text? colors.green : colors.darklighterlighterlighter,
            }}/>
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
            transition: 'color 250ms linear',
            cursor: 'pointer',
        }
    },
})


export default TextInput