import React, { Component } from 'react'
import styled from 'styled-components'
import AddFriend from './AddFriend'
import { NavLink } from 'react-router-dom'
import img from '../../userImg.jpg'

export default class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false
        }
    }
    handleClick = () => {
        this.setState({
            clicked:true
        })
        if (this.state.clicked === true) {
            this.setState({
                clicked: false
            })
        }
    }
    render() {
        return (
            <NavBarWrapper>
                <nav className="navbar nav">
                    <div className="nav-list">
                        <li className="nav-img-item my-1"><div className="nav-img mx-auto">{this.props.user && this.props.user.initials}</div></li>
                        <li className="nav-button my-1"><button className="addButton btn" onClick={this.handleClick}>Add Friend</button></li>
                        <li className="nav-item my-1"><NavLink to="/messenger/contacts">Contacts</NavLink></li>
                        <li className="nav-item my-1"><NavLink to="/messenger">Chats</NavLink></li>
                        <li className="nav-item my-1"></li>
                        <div className="nav-logo">Messenger</div>
                    </div>
                </nav>
                {this.state.clicked ? <AddFriend /> : null}
            </NavBarWrapper>
        )
    }
}

const NavBarWrapper = styled.div`
    position: fixed;
    .nav {
        position: fixed;
        top: 0%;
        left: 0%;
        width: 10rem;
        height: 100vh;
        background: white;
        box-shadow: 0px 0px 10px -4px grey;
        .nav-list {
            color: white;
            top: 3%;
            position: relative;
            text-decoration: none;
            list-style: none;
            text-align: center;
            width: 100%;
            height: 100%;
        }
        .nav-logo {
            position: fixed;
            bottom: 0%;
            left: 0%;
            width: 10rem;
            font-size: 1.5;
            font-family: 'Cairo', sans-serif;
            font-weight: bold;
            background: seagreen;
            padding: 0rem;
        }
        .nav-item {
            color: slategrey;
            cursor: pointer;
            text-decoration:none;
        }
        a {
            text-decoration: none;
            color: slategrey;
        }
        a:hover {
            color: seagreen;
        }
        .nav-item:hover {
            color: seagreen;
            background: white;
        }
        .nav-img {
            width: 3rem;
            height: 3rem;
            margin-bottom: 0.5rem;
            padding-top: 0.8rem;
            padding-left: 0.8rem;
            padding-right: 0.8rem;
            border: none;
            border-radius: 50%;
            color: seagreen;
            font-weight: bold;
            outline: none;
            background-image: url(${img});
            background-size: cover;
        }
        .addButton {
            background: seagreen;
            color: white;
            outline: none;
        }
    }
`