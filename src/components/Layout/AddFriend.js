import React, { Component } from 'react'
import styled from 'styled-components'
import { sendInvite } from '../../store/actions/userActions';
import { connect } from 'react-redux'

class AddFriend extends Component {
    constructor() {
        super();
        this.state = {
            email: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    render() {
        console.log(this.props.currentUser)
        return (
            <AddFriendWrapper>
                <div className="addFriendWindow">
                    <h5 className="addFriendTitle">Add a friend <span className="grey">via email</span></h5>
                    <div className="inputDiv" onChange={this.handleChange}>
                        <input type="email"/>
                        <button className="submitFriendButton btn ml-1" onClick={() => this.props.sendInvite(this.state.email, this.props.currentUser)}>Add</button>
                    </div>
                    <div className="responseMessage">
                        {this.props.errorMessage ? this.props.errorMessage : this.props.successMessage && this.props.successMessage}
                    </div>
                </div>
            </AddFriendWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.userId,
        successMessage: state.user.inviteSuccess,
        errorMessage: state.user.inviteWrong,
        currentUser: state.user.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendInvite: (email, user) => dispatch(sendInvite(email, user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
const AddFriendWrapper = styled.div`
    position: fixed;
    top: 0%;
    left: 0%;
    background: none;
    padding-top: 4rem;
    padding-left: 10rem;
    z-index: -1;
    .grey {
        color: grey;
    }
    .addFriendWindow {
        position: relative;
        width: 16rem;
        padding: 1rem;
        z-index: 1;
        background: white;
        .addFriendTitle {
            color: seagreen;
        }
        input {
            border: none;
            border-bottom: solid 3px seagreen;
            outline: none;
        }
        .btn {
            background: seagreen;
            color: white;
            padding: 0.1rem;
            padding-left: 0.4rem;
            padding-right: 0.4rem;
            outline: none;
        }
    }
    .responseMessage {
        font-size: 0.8rem;
    }
`