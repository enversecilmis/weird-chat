import React from 'react'
import { createUseStyles } from 'react-jss'




const UserList = ({ users }) => {
    const classes = useStyles()


    const userCards = []
    for (let user in users)
        userCards.push(
            <div key={user}>
                { users[user] }
            </div>
        )


    return (
        <div className={classes.container}>
            <h1>Kullanıcılar</h1>
            {userCards}
        </div>
    )
}





const useStyles = createUseStyles({
    container:{

        width: 300,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        overflow:'scroll',
        scrollbarWidth:'none',

        boxShadow:{
            x:0,
            y:0,
            spread:20,
            blur:10,
            color: '#222'
        },
        '& h1': {
            textAlign: 'center',
            fontSize: 40,
        },
        '& div': {
            padding: [30, 0],  
            marginTop: 30,
            borderRadius: 20,
            width: '90%',
            textAlign: 'center',
            fontSize: 30,


            boxShadow:{
                x:0,
                y:0,
                spread:5,
                blur:20,
                color: '#222'
            },
        }

    }
})


export default UserList