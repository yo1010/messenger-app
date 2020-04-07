import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export default function AuthNav() {
    return (
        <AuthNavWrapper>
            <nav className="navbar">
                <h5 className="appTitle">Messenger</h5>
                <NavLink to="/" className="mr-1 ml-auto"><button>Sign in</button></NavLink>
                <NavLink to ="/signup"><button>Sign up</button></NavLink>
            </nav>
        </AuthNavWrapper>
    )
}

const AuthNavWrapper = styled.nav`
    button {
        background: slategrey;
        outline: none;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        color: white;
        transition: background 0.5s;
    }
    .appTitle {
        color: seagreen;
        font-size: 1.5rem;
        font-weight: bold;
    }
    button:hover {
        background: seagreen;
    }
`
