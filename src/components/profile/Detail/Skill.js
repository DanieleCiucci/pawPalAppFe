import * as React from "react";
import { useState } from "react";
import infoIcon from "../../../assets/infoIcon.svg";

const Skill = (props) => {
    // Define state to manage the checked status of each checkbox
    const [checkedState, setCheckedState] = useState(
        new Array(6).fill(false)
    );

    // Handle change event for checkboxes
    const handleCheckboxChange = (index) => {
        const updatedCheckedState = checkedState.map((item, i) =>
            i === index ? !item : item
        );
        setCheckedState(updatedCheckedState);
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
                                    <strong>Skills</strong>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 mb-4">
                        <div className="col-6 d-flex align-items-center">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox1"
                                    checked={checkedState[0]}
                                    onChange={() => handleCheckboxChange(0)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox1" className="form-check-label">
                                    <strong>Oral drug administration</strong> <br />
                                    Administering medication by mouth to ensure correct dosing and effectiveness.
                                </label>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox2"
                                    checked={checkedState[1]}
                                    onChange={() => handleCheckboxChange(1)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox2" className="form-check-label">
                                    <strong>Drug administration injection</strong> <br />
                                    Giving injections for precise medication delivery and treatment.
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 mb-4">
                        <div className="col-6 d-flex align-items-center">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox3"
                                    checked={checkedState[2]}
                                    onChange={() => handleCheckboxChange(2)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox3" className="form-check-label">
                                    <strong>First aid</strong> <br />
                                    Providing initial care for injuries and emergencies before veterinary help.
                                </label>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox4"
                                    checked={checkedState[3]}
                                    onChange={() => handleCheckboxChange(3)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox4" className="form-check-label">
                                    <strong>Experience with dogs under one year</strong> <br />
                                    Handling and caring for puppies with specific needs.
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 mb-5">
                        <div className="col-6 d-flex align-items-center mb-5">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox5"
                                    checked={checkedState[4]}
                                    onChange={() => handleCheckboxChange(4)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox5" className="form-check-label">
                                    <strong>Experience with adult dogs</strong> <br />
                                    Managing the health and care of fully-grown dogs.
                                </label>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center mb-5">
                            <div className="form-check w-100 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox6"
                                    checked={checkedState[5]}
                                    onChange={() => handleCheckboxChange(5)}
                                    className="form-check-input customCheck me-2"
                                />
                                <label htmlFor="checkbox6" className="form-check-label">
                                    <strong>Can do exercise to the dog</strong> <br />
                                    Creating and implementing exercise routines to keep dogs fit and active.
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skill;
