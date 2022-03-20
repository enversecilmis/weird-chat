import React, { useState } from 'react'



const Bug = ({  }) => {

    const [obj, setObj] = useState({})
    const [text, setText] = useState('')

    const send = (e) => {
        e.preventDefault()

        setObj(prev => {
            if(prev['helo'] === undefined)
                prev['helo'] = []

            const newOb = {...prev}
            newOb['helo'] = [...newOb['helo'], text]

            // prev['helo'].push(text)  } => causes bug, 
            // return {...prev}         } => https://stackoverflow.com/questions/69834561/react-setstate-array-is-appending-the-same-item-twice-on-second-call-onward

            return newOb
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


export default Bug