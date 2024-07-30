import React, { useEffect, useState } from "react";

const AlertDetailPopUp = ({ show, handleClose }) => {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (show) {
            setAlert({ type: 'success', message: 'Image updated successfully!' });
            setTimeout(() => {
                setAlert(null);
                handleClose();
            }, 1500);
        }
    }, [show, handleClose]);

    if (!show) return null;

    return (
        <div className="popup-overlay overlayStyle">
            <div className="popup-content popupStyle">
                <div className="row">
                    <div className="col-12">
                        <div className="alert-container">
                            {alert && (
                                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                                    {alert.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertDetailPopUp;
