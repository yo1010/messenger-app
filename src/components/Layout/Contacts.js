import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { acceptInvite, startChat } from '../../store/actions/userActions'
import { Link } from 'react-router-dom'


class Contacts extends Component {
    constructor() {
        super()
    }
    render() {
        console.log(this.props.invites)
        return (
            <ContactsWrapper>
                <div className="contactsContainer">
                    <h5 className="contactsTitle">Contacts</h5>
                    <div className="contactsList">
                        {this.props.contacts && this.props.contacts.map(contact => {
                            console.log(contact)
                            return (
                                <div className="contactCard" key={this.props.contacts.indexOf(contact)}>
                                    <span className="contactName">
                                        {contact.firstName} {contact.lastName}
                                    </span>
                                    <button className="chatButton ml-1"><Link to="/messenger/chat" onClick={() => this.props.startChat(this.props.user, contact)}><i className="far fa-comments"/></Link></button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="invitesContainer">
                        <h5 className="invitesTitle">Invites</h5>
                        <div className="invitesList">
                            {this.props.invites && this.props.invites.map(invite => {
                                return (
                                    <div className="inviteCard my-3" key={this.props.invites.indexOf(invite)}>
                                        <span className="inviteText"><i className="far fa-bell"></i> {invite.message}</span>
                                        <button className="inviteButton btn mx-1" onClick={() => this.props.acceptInvite(this.props.user.userId, invite)}>Accept</button>
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
        startChat: (currentUser, user) => dispatch(startChat(currentUser, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)

const ContactsWrapper = styled.div`
    .contactsContainer {
        padding-left: 10rem;
        h5 {
            text-align: center;
        }
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
    }
    .chatButton {
        background: none;
        border: none;
        outline: none;
        color: seagreen;
    }
    .contactCard {
        margin-top: 0.5rem;
        background: gainsboro;
    }
`
