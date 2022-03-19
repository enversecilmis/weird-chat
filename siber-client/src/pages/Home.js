import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import useSocket from '../client'
import UserList from '../components/UserList'
import Messages from '../components/Messages'
import colors from '../utils/Colors'
import TextInput from '../components/TextInput'




const Home = () => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [users, setUsers] = useState({})
    const [selectedUser, setSelectedUser] = useState()
    const [messages, setMessages] = useState({})
    const [textMessage, setTextMessage] = useState('')


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

    const sendTextMessage = (e) => {
        e.preventDefault()
        textMessage && socket.emit('message', { id: socket.id, msg: textMessage, isImg: false })
        setTextMessage('')
    }
    
    return (
        <div className={classes.container}>
            <div>
                <h1 className={classes.name}>{ name }</h1>
            </div>

            <div className={classes.messagesSection}>
                <h1>Mesajlar</h1>
                {

                selectedUser &&
                <>
                <Messages
                    user={ users[selectedUser] }
                    messages={ messages[selectedUser] }
                />
                <TextInput
                    placeholder='Mesaj...'
                    text={textMessage}
                    setText={setTextMessage}
                    submit={sendTextMessage}
                />
                </>
            }</div>
            
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

    messagesSection: {
        '& h1': {
            textAlign: 'center',
            fontSize: 40,
        },
    },
    name: {
        fontSize: 40,
    },
    
})


export default Home