import React, { Component } from 'react'
import NavBar from './NavBar'
import Chat from './Chat'
import Chats from './Chats'
import Contacts from './Contacts'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getInvites, getContacts, getCurrentUser, getChats } from '../../store/actions/userActions';

class MainInterface extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        if (this.props.userId) {
            this.props.getInvites(this.props.location.state.userId)
            this.props.getContacts(this.props.location.state.userId)
            this.props.getCurrentUser(this.props.location.state.userId)
            this.props.getChats(this.props.location.state.userId, this.props.currentUser)
        }
    }
    render() {
        if (!this.props.userId) return <Redirect to="/" />
        return (
            <div>
                <NavBar user={this.props.currentUser}/>
                <Switch>
                    <Route exact path="/messenger" component={Chats} />
                    <Route path="/messenger/contacts" component={Contacts} />
                    <Route path="/messenger/chat/:chat" component={Chat} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        userId: state.auth.userId,
        currentUser: state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getInvites: (user) => dispatch(getInvites(user)), 
        getContacts: (user) => dispatch(getContacts(user)),
        getCurrentUser: (user) => dispatch(getCurrentUser(user)),
        getChats: (user) => dispatch(getChats(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainInterface)