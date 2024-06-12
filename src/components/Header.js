import * as React from 'react';


export default function Header(props) {

    return(
        <header className="App-header">
            <img src = {props.logoSrc} className="App-logo" alt="logo" />
            <h1 className="App-title">{props.pageTitile}</h1>
        </header>
    )
}