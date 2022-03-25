import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import useSocket from '../client'
import UserList from '../components/UserList'
import Messages from '../components/Messages'
import colors from '../utils/Colors'
import GeneralInput from '../components/GeneralInput'
import SteganographyTools from '../components/SteganographyTools'




const Home = () => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [users, setUsers] = useState({})
    const [selectedUID, setSelectedUID] = useState()
    const [messagePacks, setMessagePacks] = useState({})


    const { state } = useLocation()
    const socket = useSocket()


    useEffect(() => {
        const userName = state || 'Kullanıcı'
        setName( userName )
        document.title = userName

        socket.emit( 'login', userName )

        socket.on('users', users => {
            delete users[socket.id]
            setUsers(users)
        })

        socket.on('message', ({ id, msg, isImg }) => {
            addToMessageHistory(id, msg, isImg, false)
        })
    }, [socket, state])


    const addToMessageHistory = (id, msg, isImg, isSent) => {
        setMessagePacks(prev => {
            prev[id] || (prev[id] = [])
            const next = {...prev}
            next[id] = [...next[id], {id: isSent? socket.id : id, msg, isImg }]
            return next
        })
    }

    const sendTextMessage = (textMessage) => {
        socket.emit('sendMessage', { id: selectedUID, msg: textMessage, isImg: false })
        addToMessageHistory(selectedUID, textMessage, false, true)
    }


    const sendImage = (img64) => {
        socket.emit('sendMessage', { id: selectedUID, msg: img64, isImg: true })
        addToMessageHistory(selectedUID, img64, true, true)
    }


    return (
        <div className={classes.container}>
            <UserList users={users} select={setSelectedUID} selected={selectedUID} />

            <div className={classes.messagesDiv}>
                <h1>Mesajlar</h1>
                {selectedUID &&
                <>
                <Messages selfId={ socket.id } messages={ messagePacks[selectedUID] }/>
                <GeneralInput onImageSubmit={sendImage} onSubmit={sendTextMessage} placeholder='Mesaj...' />
                </>}
            </div>

            <div className={classes.toolsDiv}>
                <h1>Araçlar</h1>
                <SteganographyTools  />
            </div>
        </div>
    )
}




        // const msgs = {
        //     asSasdzZXadg: [
        //         { id: "asSasdzZXadg", msg: "asdsad", isImage: false },
        //         { id: "FGsdfXCaaadf", msg: "base64:/asdimage", isImage: true },
        //     ],
        // }




const useStyles = createUseStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
    },

    messagesDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        '& h1': {
            textAlign: 'center',
            fontSize: 40,
        },
    },


    toolsDiv: {
        display: 'flex',
        flexDirection: 'column',

        padding: 20,
        boxShadow:{
            x:0,
            y:0,
            spread:10,
            blur:10,
            color: '#262626'
        },

        '& h1': {
            textAlign: 'center',
            fontSize: 40,
        },
    },
    
    
})


export default Home