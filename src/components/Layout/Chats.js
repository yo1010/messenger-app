import React, { Component } from 'react'
import styled from 'styled-components'

export default class Chats extends Component {
    render() {
        return (
            <ChatsWrapper>
                <div className='chatsContainer container'>
                    <h5 className="chatsTitle mx-auto">Chats</h5>
                </div>
            </ChatsWrapper>
        )
    }
}

const ChatsWrapper = styled.div`
    .chatsContainer {
        padding-left: 10rem;
        text-align: center;
    }
    .chatsTitle {
        font-size: 2rem;
        color: slategrey;
    }
`
