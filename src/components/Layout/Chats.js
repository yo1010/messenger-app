import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import img from '../../userImg.jpg'
import  { openChat, getChats, getCurrentUser, getInvites, getContacts } from '../../store/actions/userActions'
import { Link } from 'react-router-dom'

class Chats extends Component {
    constructor() {
        super()
        this.state = {
            mounted: 0
        }
        this.dayOfWeekArray = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    }
    componentDidMount() {
        this.setState({mounted: this.state.mounted + 1})
        setTimeout(() => {
            this.setState({mounted: this.state.mounted + 1})
        }, 500)
    }
    componentDidUpdate() {
        this.props.getChats(this.props.userId)
    }
    shouldComponentUpdate(nextProps, nextState) {
        const chatLength = this.props.chats ? this.props.chats.length : 0
        console.log(chatLength)
        const nextLength = nextProps.chats && nextProps.chats.length
        console.log(nextLength)
        return nextLength > chatLength || this.state.mounted < nextState.mounted
    }
    render() {
        console.log(this.state.mounted)
        console.log('rendering chats')
        const fullName = this.props.currentUser && this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName
        return (
            <ChatsWrapper>
                <div className='chatsContainer container'>
                    <h5 className="chatsTitle mx-auto">Chats
                        <p className="helpText">Click on chat to send and view messages in real time</p>
                    </h5>
                    {this.props.chats && this.props.chats.map(chat => {
                        const chatLength = chat.chat.length
                        const chatDateLast = chat.chat[chatLength -1]  && new Date(chat.chat[chatLength -1].time.seconds * 1000)
                        const chatMinutesLast = chat.chat[chatLength -1]  && chatDateLast.getMinutes()
                        const chatHoursLast = chat.chat[chatLength -1]  && chatDateLast.getHours()
                        const dayOfWeek = chat.chat[chatLength -1]  && chatDateLast.getDay()
                        const chatDateSecondLast = chat.chat[chatLength -2]  &&new Date(chat.chat[chatLength -2].time.seconds * 1000)
                        const chatHoursSecondLast = chat.chat[chatLength -2]  && chatDateSecondLast.getHours()
                        const chatMinutesSecondLast = chat.chat[chatLength -2]  && chatDateSecondLast.getMinutes()
                        const dayOfWeekSecond = chat.chat[chatLength -2]  && chatDateLast.getDay()
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
                                            <p className={chat.chat.length > 0 ? "message" : "hidden"}><span className="date">{this.dayOfWeekArray[dayOfWeek]} {chatHoursLast}:{chatMinutesLast > 10 ? chatMinutesLast : `0${chatMinutesLast}`}</span> {chat.chat[chatLength-1] && chat.chat[chatLength-1].message}</p>
                                            <p className={chat.chat.length > 1 ? "lastMessage" : "hidden"}><span className="date">{this.dayOfWeekArray[dayOfWeekSecond]} {chatHoursSecondLast}:{chatMinutesSecondLast > 10 ? chatMinutesSecondLast : `0${chatMinutesSecondLast}`}</span> {chat.chat[chatLength - 2] && chat.chat[chatLength - 2].message}</p>
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
        currentUser: state.user.currentUser,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openChat: (participant1, participant2) => dispatch(openChat(participant1, participant2)), 
        getInvites: (user) => dispatch(getInvites(user)), 
        getContacts: (user) => dispatch(getContacts(user)),
        getCurrentUser: (user) => dispatch(getCurrentUser(user)),
        getChats: (user) => dispatch(getChats(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chats)

const ChatsWrapper = styled.div`
    .hidden {
        display: none;
    }
    a {
        text-decoration: none;
        color: seagreen;
    }
    .chatsContainer {
        padding-left: 10rem;
        text-align: center;
        transition: background 0.5s;
        z-index: -2;
    }
    .chatsTitle {
        font-size: 2rem;
        color: slategrey;
        text-align: center;
        .helpText {
            color: slategrey;
            text-align: center;
            font-size: 0.8rem;
        }
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
        transition: transform 0.5s;
    }
    .chatContainer:hover {
        transform: scale(1.1);
    }
    .row {
        z-index: -2;
        .col-2 {
            z-index: -2;
        }
        .col-10 {
            z-index: -2;
        }
    }
    .div-img {
        z-index: -2;
        width: 4rem;
        height: 4rem;
        margin-bottom: 0.5rem;
        padding-top: 1.3rem;
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
