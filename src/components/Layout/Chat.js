import React, { Component } from 'react'
import styled from 'styled-components'
import img from '../../userImg.jpg'
import { connect } from 'react-redux';
import { sendMessage, getMessages } from '../../store/actions/userActions'

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            input: ''
        }
        this.array = [
            {message: "Hello man, how are you? Where are you now?", user: "user1"},
            {message: "Hi man, how are you? Where are you now?", user: "user2"},
            {message: "Sup", user: "user1"},
            {message: "Nothing", user: "user2"},
            {message: "Cool", user: "user1"},
            {message: "Safe", user: "user2"}
        ]
    }
    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }
    handleSubmit = (e) => {
        console.log(this.props.fullName)
        e.preventDefault()
        if (!this.state.input.length == 0) {
            const inputObject = {
                message: this.state.input,
                sender: this.props.location.state.fullName,
                time: new Date()
            }
            const docId = this.props.location.state.chat.chatId
            this.props.sendMessage(inputObject, docId)
        }
        this.setState({
            input: ''
        })
        console.log(this.state)
    }
    componentDidMount() {
        this.props.getMessages(this.props.location.state.chat.chatId)
        var objDiv = document.getElementById("messagesContainer");
        if (objDiv != null) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }
    componentDidUpdate() {
        this.props.getMessages(this.props.location.state.chat.chatId)
        var objDiv = document.getElementById("messagesContainer");
        if (objDiv != null) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const currentMessages = this.props.messages ? this.props.messages.length : 0
        console.log(currentMessages)
        const nextMessages = nextProps.messages && nextProps.messages.length
        console.log(nextMessages)
        return nextMessages > currentMessages || this.state.input != nextState.input
    }
    render() {
        const date = new Date(this.props.location.state.chat.dateCreated.seconds * 1000).toDateString()
        console.log(this.props.messages)
        return (
            <ChatWrapper>
                <div className="chatContainer">
                    <div className="chatHeader">
                        <div className="row">
                            <div className="col-2">
                                <div className="div-img">{this.props.location.state.chat.participantInitials[0] === this.props.location.state.initials ? this.props.location.state.chat.participantInitials[1] : this.props.location.state.chat.participantInitials[0]}</div>
                            </div>
                            <div className="col-10">
                                <div className="chatTitle">
                                    {this.props.location.state.chat.participantName[0] === this.props.location.state.fullName ? this.props.location.state.chat.participantName[1] : this.props.location.state.chat.participantName[0]}
                                </div>
                                <div className="chatDate">
                                    {date}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chatBody" id="messagesContainer">
                        {this.props.messages && this.props.messages.map(message => {
                            return (
                                <div className="row my-1" key={this.props.messages.indexOf(message) + 88}>
                                    {message.sender === this.props.location.state.fullName ?
                                        <React.Fragment>
                                            <div className={message.sender === this.props.location.state.fullName ? "messageContainer sendDiv col-6 mb-3" : "messageContainer receiveDiv col-6 mb-3"}>
                                                <div className="messageText">
                                                    <div className="messageLeft messageP">
                                                        {message.message}
                                                        <div className="leftPointerContainer">
                                                            <div className="leftPointer">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="emptyCol col-6"></div>
                                        </React.Fragment>
                                        : 
                                        <React.Fragment>
                                            <div className="emptyCol col-6"></div>
                                            <div className={message.sender === this.props.location.state.fullName ? "messageContainer sendDiv col-6 mb-3" : "messageContainer receiveDiv col-6 mb-3"}>
                                                <div className="messageText">
                                                    <div className="messageRight messageP">
                                                        {message.message}
                                                        <div className="rightPointerContainer">
                                                            <div className="rightPointer">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>}
                                </div>
                            )
                        })}
                    </div>
                    <div className="chatInputContainer">
                        <form className="row" onSubmit={this.handleSubmit}>
                            <input className="chatInput col-9 col-md-10 col-lg-11 mx-auto" placeholder="Type a message" onChange={this.handleChange} value={this.state.input}/>
                            <div className="col-2 col-md-1 col-lg-1 mx-auto text-center">
                                <button className="sendBtn mx-auto"><i className="fas fa-paper-plane"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </ChatWrapper> 
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.user.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: (input, docId) => dispatch(sendMessage(input, docId)), 
        getMessages: (docId) => dispatch(getMessages(docId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat)

const ChatWrapper = styled.div`
    position: fixed;
    width:100%;
    height:100vh;
    top: 0%:
    left: 0%;
    z-index: -1;
    .chatHeader {
        margin-left: 10rem;
        padding: 1rem;
        height: 15vh;
        background: gainsboro; 
        box-shadow: 0px 0px 10px -5px grey;
        .div-img {
            width: 4rem;
            text-align: center;
            padding-top: 1.2rem;
            height: 4rem;
            margin-bottom: 0.5rem;
            padding-left: 0.8rem;
            padding-right: 0.8rem;
            border: none;
            border-radius: 50%;
            color: seagreen;
            font-weight: bold;
            font-size: 1.2rem;
            outline: none;
            background-image: url(${img});
            background-size: cover;
        }
        .chatTitle {
            margin-top: 1rem;
            color: seagreen;
            font-weight: bold;
            text-align: right;
        }
        .chatDate {
            font-weight: bold;
            font-size: 0.8rem;
            color: white;
            text-align: right;
        }
    }
    .chatContainer {
        position: fixed;
        width:100vw;
        height:100vh;
        top: 0%:
        left: 0%;
    }
    .chatInputContainer {
        height:10vh;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        z-index: -10;
        position: fixed;
        bottom: 0%;
        left: 0%;
        width: 100%;
        background: gainsboro;
        .row {
            padding-right: 1rem;
            padding-left: 10rem;
            margin-left: 1rem;
            .chatInput {
                border-radius: 25px;
                border: none;
                outline: none;
            }
        }
        .sendBtn {
            background: seagreen;
            border: none;
            border-radius: 50px;
            color: white;
            padding: 0.5rem;
            padding-left: 0.8rem;
            padding-right: 0.8rem;
        }
    }
    .chatBody {
        margin-left: 10rem;
        overflow-y: scroll;
        height: 75vh;
    }
    .messageText {
        width: 100%;
        height: 2rem;
    }
    .messageP { 
        display: inline-block;
        padding: 0.2rem;
        background: gainsboro;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border-radius: 15px;
        border: solid 1px gainsboro;
    }
    .messageLeft {
        border: solid 1px gainsboro;
        background: gainsboro;
    }
    .messageRight {
        border: solid 1px #bee3b0;
        background: #bee3b0;
    }
    .leftPointerContainer {
        position: relative;
    }
    .leftPointer {
        position: absolute;
        margin-left: -0.7rem;
        margin-top: -0.3rem;
        width: 1.1rem;
        height: 1.1rem;
        background: gainsboro;
        clip-path: polygon(40% 0, 0% 81%, 78% 38%);
    }
    .rightPointerContainer {
        position: relative;
        top: 10%;
    }
    .rightPointer {
        position: absolute;
        margin-top: -0.3rem;
        left: 100%;
        width: 1.1rem;
        height: 1.1rem;
        background: #bee3b0;
        clip-path: polygon(0 38%, 81% 78%, 31% 7%);;
    }
    .sendDiv {
        padding-left: 1.3rem;
    }
    .receiveDiv {
        text-align: right;
        padding-right: 1.3rem;
    }
`