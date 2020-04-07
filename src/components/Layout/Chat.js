import React, { Component } from 'react'
import styled from 'styled-components'

export default class Chat extends Component {
    constructor() {
        super();
        this.array = [
            {message: "Hello man, how are you? Where are you now?", user: "user1"},
            {message: "Hi man, how are you? Where are you now?", user: "user2"},
            {message: "Sup", user: "user1"},
            {message: "Nothing", user: "user2"},
            {message: "Cool", user: "user1"},
            {message: "Safe", user: "user2"}
        ]
    }
    render() {
        return (
            <ChatWrapper>
                <div className="chatContainer">
                    <div className="chatBody">
                        {this.array.map(message => {
                            return (
                                <div className="row my-1" key={this.array.indexOf(message)}>
                                    {message.user === "user1" ?
                                        <React.Fragment>
                                            <div className={message.user === "user1" ? "messageContainer sendDiv col-6 mb-3" : "messageContainer receiveDiv col-6 mb-3"}>
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
                                            <div className={message.user === "user1" ? "messageContainer sendDiv col-6 mb-3" : "messageContainer receiveDiv col-6 mb-3"}>
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
                        <form className="row">
                            <input className="chatInput col-9 col-md-10 col-lg-11 mx-auto" placeholder="Type a message"/>
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

const ChatWrapper = styled.div`
    position: fixed;
    width:100%;
    height:100vh;
    top: 0%:
    left: 0%;
    z-index: -1;
    .chatContainer {
        position: fixed;
        width:100vw;
        height:100vh;
        top: 0%:
        left: 0%;
    }
    .chatInputContainer {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        z-index: -1;
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