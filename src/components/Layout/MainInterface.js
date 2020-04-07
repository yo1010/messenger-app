import React, { Component } from 'react'
import NavBar from './NavBar'
import Chat from './Chat'
import Chats from './Chats'
import Contacts from './Contacts'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getInvites, getContacts, getCurrentUser } from '../../store/actions/userActions';

class MainInterface extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        if (this.props.user) {
            this.props.getInvites(this.props.user)
            this.props.getContacts(this.props.user)
            this.props.getCurrentUser(this.props.user)
        }
    }
    render() {
        console.log(this.props.currentUser)
        console.log(this.props.contacts)
        //if (!this.props.user) return <Redirect to="/" />
        return (
            <div>
                <NavBar user={this.props.currentUser}/>
                <Switch>
                    <Route exact path="/messenger" component={Chats} />
                    <Route path="/messenger/contacts" component={Contacts} />
                    <Route path="/messenger/chat" component={Chat} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.userId,
        currentUser: state.user.currentUser,
        contacts: state.user.contacts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getInvites: (user) => dispatch(getInvites(user)), 
        getContacts: (user) => dispatch(getContacts(user)),
        getCurrentUser: (user) => dispatch(getCurrentUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainInterface)