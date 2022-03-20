import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import useSocket from '../client'
import UserList from '../components/UserList'
import Messages from '../components/Messages'
import TextInput from '../components/TextInput'




const Home = () => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [users, setUsers] = useState({})
    const [selectedUID, setSelectedUID] = useState()
    const [messagePacks, setMessagePacks] = useState({})
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
            console.log("received message");
            setMessagePacks(prev => {
                if(prev[id] === undefined)
                    prev[id] = []
                prev[id].push({ id: id, msg: msg, isImg: isImg })
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
    }, [socket, state])

    const sendTextMessage = (e) => {
        e.preventDefault()
        if(textMessage === '')
            return
            
        socket.emit('sendMessage', { id: selectedUID, msg: textMessage, isImg: false })

        setMessagePacks(prev => {
            if(prev[selectedUID] === undefined)
                prev[selectedUID] = []

            prev[selectedUID].push({ id: socket.id, msg: textMessage, isImg: false })
            return {...prev}
        })

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
                selectedUID &&
                <>
                {console.log(messagePacks[selectedUID])}
                <Messages
                    user={ users[selectedUID] }
                    messages={ messagePacks[selectedUID] }
                />
                <TextInput
                    placeholder='Mesaj...'
                    text={textMessage}
                    setText={setTextMessage}
                    submit={sendTextMessage}
                />
                </>
            }</div>
            
            <UserList users={users} select={setSelectedUID} selected={selectedUID} />
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

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