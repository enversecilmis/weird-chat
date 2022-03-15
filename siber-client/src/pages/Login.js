import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import colors from '../utils/Colors'


const Login = ({}) => {


    const [name, setName] = useState('')
    const navigate = useNavigate()
    const classes = useStyles()

    const login = (e) => {
        e.preventDefault()
        
        name && navigate('/home', { state: name })
    }
    
    return (
        <div className={classes.container}>
            <form onSubmit={login} >
                <input
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    placeholder={ 'Display Name' }
                />
            </form>
        </div>
    )
}



const useStyles = createUseStyles({
    container:{
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',

        height: '70%',
        width: '100%',

        '& input': {
            border: 'none',
            borderRadius: 13,
            padding: [5,10,5,15],
            
            fontSize: 25,
            color: colors.dark,
            
            '&:focus': {
                outline:'none',
            }
        }
    }
})


export default Login