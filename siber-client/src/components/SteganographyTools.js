import React, { useState } from 'react'
import { MdDoubleArrow } from 'react-icons/md'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'
import TextInput from './TextInput'




const SteganographyTools = ({  }) => {
    const classes = useStyles()

    const [encodeImgSrc, setEncodeImgSrc] = useState('')
    const [decodeImgSrc, setDecodeImgSrc] = useState('')



    return (
        <div className={classes.container}>
            <div className={classes.encode} >
                <TextInput/>
                <img src={encodeImgSrc} width={150} height={150} />
                <MdDoubleArrow className='icon' />

            </div>

            <div className={classes.decode} >
                <img src={decodeImgSrc} width={150} height={150} />
                <MdDoubleArrow className='icon' />

            </div>
            
        </div>
    )
}





const useStyles = createUseStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    encode: {
        display: 'flex',
        alignItems: 'center',

        '& .icon': {
            fontSize: 40,
            cursor: 'pointer',
            transition: 'color 200ms linear',

            '&:hover': {
                color: colors.green,
            },
        },
    },
    decode: {
        display: 'flex',
        alignItems: 'center',

        '& .icon': {
            fontSize: 40,
            cursor: 'pointer',
            transition: 'color 200ms linear',

            '&:hover': {
                color: colors.green,
            },
        },
    }
})


export default SteganographyTools