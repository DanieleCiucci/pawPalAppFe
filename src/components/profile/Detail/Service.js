import * as React from "react";
import { useState, useEffect } from "react";
import infoIcon from "../../../assets/infoIcon.svg";
import { updateServices } from "../services/UpdateSkills";

const Service = (props) => {
    const [checkedState, setCheckedState] = useState(new Array(6).fill(false));
    const [isModified, setIsModified] = useState(false);

    const handleCheckboxChange = (index) => {

        if (props.sitterId) return;

        const updatedCheckedState = checkedState.map((item, i) =>
            i === index ? !item : item
        );
        setCheckedState(updatedCheckedState);
        setIsModified(true);
    };

    useEffect(() => {
        if (props.profile && props.profile.services) {
            const initialCheckedState = new Array(6).fill(false);
            props.profile.services.forEach(service => {
                const serviceIndex = service.id; // Assuming id maps directly to checkbox index
                if (serviceIndex >= 0 && serviceIndex < initialCheckedState.length) {
                    initialCheckedState[serviceIndex] = true;
                }
            });
            setCheckedState(initialCheckedState);
        }
    }, [props.profile.services]);

    // Collect IDs of checked services
    const getCheckedServiceIds = () => {
        return checkedState
            .map((isChecked, index) => (isChecked ? index : null))
            .filter(id => id !== null);
    };

    const handleUpdateClick = async () => {
        try {
            const checkedServiceIds = getCheckedServiceIds();
            await updateServices(checkedServiceIds);
            setIsModified(false);
        } catch (error) {
            console.error("Update failed.");
        }
    };

    return (
        <div className="row mt-5">
            <div className="col-1"></div>

            <div className="col-10 boxPhoto position-relative">
                <div className="photoGallery">
                    <div className="row">
                        <div className="col-8">
                            <div className="d-flex align-items-center m-2">
                                <img src={infoIcon} alt="info icon" />
                                <h5 className="p-3 mb-0">
                                    <strong>Service</strong>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 mb-4">
                        <div className="col-6 d-flex align-items-center mb-3">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox1"
                                    checked={checkedState[0]}
                                    onChange={() => handleCheckboxChange(0)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox1" className="form-check-label">
                                    <strong>Daily Pet Sitting</strong> <br />
                                    Providing daily care and companionship for pets while the owner is away.
                                </label>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center mb-3">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox2"
                                    checked={checkedState[1]}
                                    onChange={() => handleCheckboxChange(1)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox2" className="form-check-label">
                                    <strong>In-Home Pet Sitting</strong> <br />
                                    Caring for pets in the comfort of their own home while the owner is away.
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 mb-5">
                        <div className="col-6 d-flex align-items-center mb-3">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox3"
                                    checked={checkedState[2]}
                                    onChange={() => handleCheckboxChange(2)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox3" className="form-check-label">
                                    <strong>Pet Sitting at Sitter's Home</strong> <br />
                                    Offering pet care at the sitter's residence, ensuring a safe environment.
                                </label>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center mb-3">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox4"
                                    checked={checkedState[3]}
                                    onChange={() => handleCheckboxChange(3)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox4" className="form-check-label">
                                    <strong>Dog Walking</strong> <br />
                                    Providing regular walks to keep dogs active and healthy.
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Conditionally render the update button */}
                    {isModified && (
                        <div className="text-end m-3">
                            <button
                                className="btn btn-primary mb-3"
                                onClick={handleUpdateClick}
                            >
                                Update
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Service;
