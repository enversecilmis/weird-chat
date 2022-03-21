import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import useSocket from '../client'
import UserList from '../components/UserList'
import Messages from '../components/Messages'
import TextInput from '../components/TextInput'
import colors from '../utils/Colors'
import ImageChooseButton from '../components/ImageChooseButton'




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
            setMessagePacks(prev => {
                prev[id] || (prev[id] = [])
                const next = {...prev}
                next[id] = [...next[id], { id: id, msg: msg, isImg: isImg }]
                return next
            })
        })

        // const msgs = {
        //     asSasdzZXadg: [
        //         { id: "asSasdzZXadg", msg: "asdsad", isImage: false },
        //         { id: "FGsdfXCaaadf", msg: "base64:/asdimage", isImage: true },
        //     ],
        // }
    }, [socket, state])

    const sendTextMessage = (textMessage) => {
            
        socket.emit('sendMessage', { id: selectedUID, msg: textMessage, isImg: false })

        setMessagePacks(prev => {
            prev[selectedUID] || (prev[selectedUID] = [])
            const next = {...prev}
            next[selectedUID] = [...next[selectedUID], { id: socket.id, msg: textMessage, isImg: false }]
            return next
        })
    }
    
    return (
        <div className={classes.container}>

            <UserList users={users} select={setSelectedUID} selected={selectedUID} />


            <div className={classes.messagesDiv}>
                <h1>Mesajlar</h1>
                {selectedUID &&
                <>
                <Messages selfId={ socket.id } messages={ messagePacks[selectedUID] }/>
                <div className={classes.inputDiv}>
                    <ImageChooseButton onLoad={(img64) => console.log(img64)} />
                    <TextInput  placeholder='Mesaj...' onSubmit={sendTextMessage} />
                </div>
                </>}
            </div>


            <div>
                <h1 className={classes.name}>{ name }</h1>

            </div>

            
        </div>
    )
}







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
    inputDiv: {
        display: 'flex',
        alignItems: 'center',
    },
    
})


export default Home