import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { acceptInvite, startChat, getChats, getContacts } from '../../store/actions/userActions'
import { Link } from 'react-router-dom'


class Contacts extends Component {
    constructor() {
        super();
        this.state = {
            inviteAccepted: 0
        }
    }
    handleStartChat = (contact) => {
        this.props.startChat(this.props.user, contact)
        this.props.getChats(this.props.user.userId)
    }
    handleAcceptInvitation = (invite) => {
        this.props.acceptInvite(this.props.user, invite)
        this.props.getContacts(this.props.user.userId)
        this.setState({inviteAccepted: this.state.inviteAccepted + 1})
    }
    componentDidUpdate() {
        this.props.getContacts(this.props.user.userId)
    }
    shouldComponentUpdate(nextProps, nextState) {
        const contactsLength = this.props.contacts ? this.props.contacts.length : 0
        console.log(contactsLength)
        const nextLength = nextProps.contacts && nextProps.contacts.length
        console.log(nextLength)
        const nextInviteAccepted = nextState.inviteAccepted ? nextState.inviteAccepted : 0
        return contactsLength < nextLength || this.state.inviteAccepted < nextInviteAccepted
    }
    render() {
        console.log(this.props.user)
        return (
            <ContactsWrapper>
                <div className="contactsContainer">
                    <h5 className="contactsTitle">Contacts
                        <p className="helpText">Click on contact to start chat or view existing one</p>
                    </h5>
                    <div className="contactsList">
                        {this.props.contacts && this.props.contacts.map(contact => {
                            console.log(contact)
                            return (
                                <Link to="/messenger" key={this.props.contacts.indexOf(contact)} onClick={() => this.handleStartChat(contact)}>
                                    <div className="contactCard mx-auto">
                                        <span className="contactName">
                                            <i className="far fa-comments"/> {contact.firstName} {contact.lastName}
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="invitesContainer mx-auto">
                        <h5 className="invitesTitle mx-auto">Invites
                            <p className="helpText">Accept invite to add friend and start chatting</p>
                        </h5>
                        <div className="invitesList">
                            {this.props.invites && this.props.invites.map(invite => {
                                return (
                                    <div className="inviteCard my-3" key={this.props.invites.indexOf(invite)}>
                                        <span className="inviteText"><i className="far fa-bell"></i> {invite.message}</span>
                                        <button className="inviteButton btn mx-1" onClick={() => this.handleAcceptInvitation(invite)}>Accept</button>
                                        <button className="inviteButton btn mx-1">Decline</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </ContactsWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    state.user.currentUser.userId = state.auth.userId
    console.log(state)
    return {
        invites: state.user.invites,
        contacts: state.user.contacts,
        user: state.user.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptInvite: (user, invite) => dispatch(acceptInvite(user, invite)),
        startChat: (currentUser, user) => dispatch(startChat(currentUser, user)),
        getChats: (user) => dispatch(getChats(user)),
        getContacts: (user) => dispatch(getContacts(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)

const ContactsWrapper = styled.div`
    a {
        text-decoration: none;
        color: seagreen;
    }
    .contactsContainer {
        margin: 0;
        padding-left: 10rem;
        h5 {
            text-align: center;
            font-weight: bold;
        }
    .contactsList {
        text-align: center;
    }
    .contactsTitle {
        font-size: 2rem;
        color: slategrey;
    }
    .inviteCard {
        padding: 1rem;
        .inviteText {
            i {
                color: seagreen;
            }
        }
    }
    .inviteButton {
        padding: 0.1rem;
        background: seagreen;
        color: white;
    }
    .invitesContainer {
        margin-top: 4rem;
        .invitesTitle {
            text-align: center;
        }
    }
    .helpText {
        color: slategrey;
        text-align: center;
        font-size: 0.8rem;
    }
    .chatButton {
        background: none;
        border: none;
        outline: none;
        color: seagreen;
    }
    .contactCard {
        margin-top: 0rem;
        .contactTitle {
            color: seagreen;
        }
        transition: transform 0.5s;
        width: 80%;
        padding: 0.5rem;
        cursor: pointer;
        font-weight: bold;
    }
    .contactCard:hover {
        transform: scale(1.2);
    }
`
