import * as React from 'react';
import { request } from '../axios_helper';

export default class AuthContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],  // Ensure the initial state is an array
            isAuthenticated: true // Assuming a mechanism to check if the user is authenticated
        };
    };

    componentDidMount() {
        if (this.state.isAuthenticated) {
            request(
                "GET",
                "/messages",
                {}
            ).then((response) => {
                if (Array.isArray(response.data)) {
                    this.setState({ data: response.data });
                } else {
                    console.error("Response data is not an array:", response.data);
                    // Optionally set an error state here if needed
                }
            }).catch((error) => {
                console.error("Error fetching data:", error);
                // Optionally set an error state here if needed
            });
        } else {
            console.error("User is not authenticated.");
            // Optionally set an error state here if needed
        }
    };

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-4">
                    <div className="card" style={{width: "18rem"} }>
                        <div className="card-body">
                            <h5 className="card-title"> Back end response</h5>
                            <p className="card-text">content: </p>
                            <ul>
                            {this.state.data.length > 0 ? (
                                this.state.data.map((line, index) => <li key={index}>{line}</li>)
                            ) : (
                                <p>No messages available or user not authenticated.</p>
                            )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
