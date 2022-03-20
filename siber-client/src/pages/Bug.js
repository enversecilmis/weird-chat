import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'





const Bug = ({  }) => {
    const classes = useStyles()

    const [obj, setObj] = useState({})
    const [text, setText] = useState('')

    const send = (e) => {
        e.preventDefault()

        setObj(prev => {
            if(prev['helo'] === undefined)
                prev['helo'] = []

            console.log([...prev['helo']]);
            prev['helo'].push(text)
            console.log([...prev['helo']]);


            return {...prev}
        })
        
        setText('')
    }


    return (
        <form onSubmit={send}>
            <input
                value={text}
                onChange={ (e) => setText(e.target.value) }
            />

        </form>
    )
}





const useStyles = createUseStyles({
    container:{

    }
})


export default Bug