import React from 'react'
import { createUseStyles } from 'react-jss'




const UserList = ({ users, select, selected }) => {
    const classes = useStyles()


    const userCards = []
    for (let user in users){
        const isSelected = user == selected
        userCards.push(
            <div
                key={user}
                onClick={() => { select( user === selected? null : user ) }}
                style={{backgroundColor: isSelected? '#444':''}}
            >
                { users[user] }
            </div>
        )
    }


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
            spread:10,
            blur:10,
            color: '#262626'
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
            cursor: 'pointer',


            boxShadow:{
                x:0,
                y:0,
                spread:5,
                blur:20,
                color: '#242424'
            },

            '&:hover': {
                backgroundColor: '#333',
            }
        }
    },
    selected: {
        backgroundColor: '#999'
    }
})


export default UserList