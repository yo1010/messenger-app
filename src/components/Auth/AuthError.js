import React from 'react'
import styled from 'styled-components'

export default function AuthError(props) {
    return (
        <AuthErrorWrapper>
            <div className="errorContainer">
                <h5 className="errorTitle">
                    {props.auth}
                </h5>
                <div className="errorText">
                    <p className="errorMessage">
                        {props.err}
                    </p>
                </div>
                <button className="errorButton btn" onClick={() => props.clearError()}>Got it!</button>
            </div>
        </AuthErrorWrapper>
    )
}

const AuthErrorWrapper = styled.div`
    z-index: 1;
    padding: 15rem;
    position: fixed;
    background: none;
    border-radius: 5px;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    .errorContainer {
        background: white;
        padding: 2rem;
        text-align: center;
        width: 100%;
        box-shadow: 0 0 10px -4px grey;
    }
    .errorTitle {
        color: slategrey;
    }
    .errorMessage {
        color: crimson;
    }
    .errorButton {
        background: seagreen;
        color: white;
    }
`