import React from "react";
import profileDefaultImage from "../../assets/profileImageDefault.png";

const DetailsOwnerMainDetail = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col-2">
                    <img
                        src={props.dog.photo ? `data:image/jpeg;base64,${props.dog.photo}` : profileDefaultImage}
                        alt="Profile"
                        style={{
                            height: '8.5rem',
                            width: '8.5rem',  // Adjust to keep aspect ratio as a circle
                            border: '1px solid white',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <div className="col-10 d-flex align-items-center">
                    <div>
                        <h3 className="mb-0">
                            {props.dog.ownerName} {" " + props.dog.surname}
                        </h3>
                        <p className="mt-2 ms-3 text-muted">
                            {"Owner of " + props.dog.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsOwnerMainDetail;
