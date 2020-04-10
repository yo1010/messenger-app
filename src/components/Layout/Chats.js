import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import img from '../../userImg.jpg'
import  { openChat } from '../../store/actions/userActions'
import { Link } from 'react-router-dom'

class Chats extends Component {
    render() {
        const fullName = this.props.currentUser && this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName
        return (
            <ChatsWrapper>
                <div className='chatsContainer container'>
                    <h5 className="chatsTitle mx-auto">Chats</h5>
                    {this.props.chats && this.props.chats.map(chat => {
                        const chatLength = chat.chat.length
                        const chatDate = new Date(chat.dateCreated.seconds * 1000).toDateString()
                        console.log(chatLength)
                        return (
                            <div className="chatContainer" key={this.props.chats.indexOf(chat)} onClick={() => this.props.openChat(chat.participantId[0], chat.participantId[1])}>
                                <Link to={{pathname: `/messenger/chat/${chat.chatId}`, state: {chat: chat, fullName: fullName, initials: this.props.currentUser.initials }}}>
                                <div className="row">
                                    <div className="col-2">
                                        <div className="div-img">{chat.participantInitials[0] === this.props.currentUser.initials ? chat.participantInitials[1] : chat.participantInitials[0]}</div>
                                    </div>
                                    <div className="col-10">
                                        <div className="chatTitle">
                                            {chat.participantName[0] === fullName ? chat.participantName[1] : chat.participantName[0]}
                                        </div>
                                        <div className="chatBody">
                                            <p><span className="date">{chatDate}</span> {chat.chat[chatLength - 2].message}</p>
                                            <p className="lastMessage"><span className="date">{chatDate}</span> {chat.chat[chatLength - 1].message}</p>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </ChatsWrapper>
        )
    }
}

const mapStateToProps = state => {
    return  {
        chats: state.user.chats,
        currentUser: state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openChat: (participant1, participant2) => dispatch(openChat(participant1, participant2))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chats)

const ChatsWrapper = styled.div`
    a {
        text-decoration: none;
        color: seagreen;
    }
    .chatsContainer {
        padding-left: 10rem;
        text-align: center;
        transition: background 0.5s;
    }
    .chatsTitle {
        font-size: 2rem;
        color: slategrey;
    }
    .chatContainer {
        padding: 1rem;
        .chatTitle {
            font-size: 1.1rem; 
            font-weight: bold;
        }
        .chatBody {
            color: black !important;
            font-size: 0.9rem;
            text-align: left;
            p {
                padding: 0;
                margin-top: -0.5rem;
            }
            .lastMessage {
                margin-top: -1rem;
            }
            .date {
                color: grey;
            }
        }
    }
    .div-img {
        width: 4rem;
        height: 4rem;
        margin-bottom: 0.5rem;
        padding-top: 0.8rem;
        padding-left: 0.8rem;
        padding-right: 0.8rem;
        border: none;
        border-radius: 50%;
        color: seagreen;
        font-weight: bold;
        outline: none;
        background-image: url(${img});
        background-size: cover;
    }
`
