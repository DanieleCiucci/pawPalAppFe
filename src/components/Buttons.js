import * as React from 'react'

export default function Buttons(props) {

    return (
        <div className="row">

            <div className="col-md-12 text-center" style={{marginTop: '30px'}}>

            <button onClick={props.login} className="btn btn-primary" style={{margin:"10px"}}> Login </button>
            <button onClick={props.logout} className="btn btn-dark" style={{margin:"10px"}}> Logout </button>

            </div>
        </div>
    )

}