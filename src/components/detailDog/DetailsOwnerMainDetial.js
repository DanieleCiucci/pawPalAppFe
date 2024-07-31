import React from "react";
import profileDefaultImage from "../../assets/profileImageDefault.png"

const DetailsOwnerMainDetail = (props) => {


    return (
        <div>
            <div className="row">
                <div className="col-2">
                    <img
                        src={profileDefaultImage}
                        alt="Profile image"
                        style={{
                            height: '8.5rem',
                            width: '100%',
                            border: '1px solid white',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <div className="col-10 d-flex align-items-center">
                    <h3 className="mb-0">
                        {props.dog.ownerName} {" " + props.dog.surname}
                    </h3>
                    <p className="mt-4 ms-3 cpoyOwnerGray">
                        {"Owner of " + props.dog.name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetailsOwnerMainDetail;
