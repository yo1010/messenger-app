import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { acceptInvite } from '../../store/actions/userActions'


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
                            return (
                                <div className="contactCard" key={this.props.contacts.indexOf(contact)}>
                                    <span className="contactName">
                                        {contact.firstName} {contact.lastName}
                                    </span>
                                    <button className="chatButton ml-1"><i className="far fa-comments"/></button>
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
                                        <button className="inviteButton btn mx-1" onClick={() => this.props.acceptInvite(this.props.user, invite)}>Accept</button>
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
    return {
        invites: state.user.invites,
        user: state.auth.userId,
        contacts: state.user.contacts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptInvite: (user, invite) => dispatch(acceptInvite(user, invite))
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
