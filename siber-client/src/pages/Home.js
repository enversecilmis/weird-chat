import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import useSocket from '../client'
import UserList from '../components/UserList'




const Home = ({}) => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [users, setUsers] = useState({})
    const { state } = useLocation()
    const socket = useSocket()


    useEffect(() => {
        const userName = state || 'Kullanıcı'
        setName( userName )

        socket.emit( 'login', userName )
        socket.on('users', users => {
            delete users[socket.id]
            setUsers(users)
        })

    }, [])
    
    
    return (
        <div className={classes.container}>
            <div>
                <h1 className={classes.name}>{ name }</h1>
            </div>
            

            <UserList users={users} />
        </div>
    )
}







const useStyles = createUseStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',

        height: '100%',

    },
    name: {
        fontSize: 40,
    }
})


export default Home