import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import useSocket from '../client'
import UserList from '../components/UserList'
import Messages from '../components/Messages'
import TextInput from '../components/TextInput'
import colors from '../utils/Colors'
import ImageChooseButton from '../components/ImageChooseButton'
import GeneralInput from '../components/GeneralInput'




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


    return (
        <div className={classes.container}>

            <UserList users={users} select={setSelectedUID} selected={selectedUID} />
            <img />
            <div className={classes.messagesDiv}>
                <h1>Mesajlar</h1>
                {selectedUID &&
                <>
                <Messages selfId={ socket.id } messages={ messagePacks[selectedUID] }/>
                <GeneralInput onSubmit={sendTextMessage} placeholder='Mmamamia' />
                </>}
            </div>


            <div>
                <h1 className={classes.name}>{ name }</h1>

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
    name: {
        fontSize: 40,
    },
    chooseImageButton: {
        fontSize: 21,
        marginRight: 4,
        cursor: 'pointer',

        '&:hover': {
            color: colors.greenellow
        }
    },
    
    
})


export default Home