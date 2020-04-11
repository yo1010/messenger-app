import React, { Component } from 'react'
import styled from 'styled-components'
import  { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp, clearError } from '../../store/actions/authActions.js'
import AuthNav from './AuthNav'
import AuthError from './AuthError'

class Register extends Component{
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    handleClick = (e) => {
        e.target.parentNode.childNodes[0].className = "clicked"
        console.log(e.target.parentNode.childNodes[0])
    }
    render() {
        if (this.props.userId) return <Redirect to={{pathname: '/messenger', state: {userId: this.props.userId}}} />
        return (
            <RegisterWrapper>
                <AuthNav />
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="mx-auto">
                        <h5 className="formHeader">
                            Create an account
                        </h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input className="" type="email" id="email" onChange={this.handleChange} onFocus={this.handleClick}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input className="" type="password" id="password" onChange={this.handleChange} onFocus={this.handleClick}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="firstName">First Name</label>
                            <input className="" type="text" id="firstName" onChange={this.handleChange} onFocus={this.handleClick}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name</label>
                            <input className="" type="text" id="lastName" onChange={this.handleChange} onFocus={this.handleClick}/>
                        </div>
                        <div className="input-field">
                            <button className="btn">Sign up</button>
                        </div>
                    </form>
                </div>
                {this.props.authError ? <AuthError auth="Signup Error" err={this.props.authError} clearError={this.props.clearError} /> : null}
            </RegisterWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        clearError: () => dispatch(clearError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

const RegisterWrapper = styled.div`
    .container {
        form {
            margin-top: 4rem;
            width: 70%;
            .formHeader {
                text-align: center;
                margin-bottom: 1rem;
                font-size: 2rem;
                color: seagreen;
            }
            .input-field {
                margin-top: 1rem;
                margin-bottom: 1rem;
                width: 100%;
                height: 3rem;
                text-align: center;
                label {
                    margin-top: 1rem;
                    margin-bottom: 0rem;
                    position: relative;
                    top: 90%;
                    left: 0%;
                    z-index: 1;
                    font-size: 1rem;
                    transition: top 0.5s, font-size 0.5s, color 0.5s;
                    color: slategrey;
                }
                input {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    width: 100%;
                    border: none;
                    border-bottom: solid 1px seagreen;
                    outline: none;
                }
                input:focus {
                    border-bottom: solid 1px crimson;
                }
                .clicked {
                    color: grey;
                    top: 40%;
                    font-size: 0.9rem;
                    animation: jump 0.3s ease;
                    animation-delay: 0.4s;
                }
            }
            .btn {
                background: seagreen;
                color: white;
                margin-top: 3rem;
                transition: transform 0.2s;
            }
            .btn:hover {
                transform: scale(1.1);
            }
        }
    }
    @keyframes jump {
        0% {transform: rotate(0deg)}
        25% {transform: rotate(-5deg)}
        75% {transform: rotate(5deg)}
        100% {transform: rotate(0deg)}
    }
`

