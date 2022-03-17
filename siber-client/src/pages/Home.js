import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import useSocket from '../client'
import UserList from '../components/UserList'
import Messages from '../components/Messages'
import colors from '../utils/Colors'




const Home = ({}) => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [users, setUsers] = useState({})
    const [selectedUser, setSelectedUser] = useState()
    const [messages, setMessages] = useState({})


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
        socket.on('message', ({ uid, msg, isImg }) => {
            setMessages(prev => {
                prev[uid].push({ uid, msg, isImg })
            })
        })


        // const msgs = {
        //     asSasdzZXadg: [
        //         { uid: "asSasdzZXadg", msg: "asdsad", isImage: false },
        //         { uid: "FGsdfXCaaadf", msg: "base64:/asdimage", isImage: true },
        //         { uid: "asSasdzZXadg", msg: "asdsad", isImage: false },
        //     ],
        //     ZxAsdQWEsv: [
        //         { uid: "ZxAsdQWEsv", msg: "asdsad", isImage: false },
        //         { uid: "ZxAsdQWEsv", msg: "base64:/asdimage", isImage: true },
        //         { uid: "FGsdfXCaaa", msg: "asdsad", isImage: false },
        //     ]
        // }

    }, [])

    
    
    return (
        <div className={classes.container}>
            <div>
                <h1 className={classes.name}>{ name }</h1>
            </div>

            <Messages users={users} selected={selectedUser} messages={messages} />
            
            <UserList users={users} select={setSelectedUser} selected={selectedUser} />
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
    },
    messagesSection: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',


        '& .messageBox': {
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
    
})


export default Home