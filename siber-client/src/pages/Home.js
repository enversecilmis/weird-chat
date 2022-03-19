import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import useSocket from '../client'
import UserList from '../components/UserList'
import Messages from '../components/Messages'
import colors from '../utils/Colors'




const Home = () => {
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
        socket.on('message', ({ id, msg, isImg }) => {
            setMessages(prev => {
                if(prev[id] === undefined)
                    prev[id] = []

                prev[id].push({ id, msg, isImg })
                return {...prev}
            })
        })



        // const msgs = {
        //     asSasdzZXadg: [
        //         { id: "asSasdzZXadg", msg: "asdsad", isImage: false },
        //         { id: "FGsdfXCaaadf", msg: "base64:/asdimage", isImage: true },
        //         { id: "asSasdzZXadg", msg: "asdsad", isImage: false },
        //     ],
        //     ZxAsdQWEsv: [
        //         { id: "ZxAsdQWEsv", msg: "asdsad", isImage: false },
        //         { id: "ZxAsdQWEsv", msg: "base64:/asdimage", isImage: true },
        //         { id: "FGsdfXCaaa", msg: "asdsad", isImage: false },
        //     ]
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    
    return (
        <div className={classes.container}>
            <div>
                <h1 className={classes.name}>{ name }</h1>
            </div>

            <Messages
                selected={ selectedUser }
                user={ users[selectedUser] }
                messages={ messages[selectedUser] }
            />
            
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