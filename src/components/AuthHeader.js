import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoBackground from "../assets/logoBackgroud.svg";
import logo from "../assets/appLogo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function AuthHeader({ logout }) {
    const navbarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                const navbarCollapse = document.getElementById("smallScreenNav");
                if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                    // Manually remove the 'show' class to collapse the menu
                    navbarCollapse.classList.remove("show");
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navbarRef]);

    return (
        <div className="container">
            {/* Logos for larger screens */}
            <img
                className=""
                src={logoBackground}
                alt="Logo Background"
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '100',
                    height: '6rem',
                    width: 'auto',
                }}
            />
            <img
                className=""
                src={logo}
                alt="App Logo"
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: '100',
                    height: '3rem',
                    width: 'auto',
                }}
            />
            <div className="row">
                <div className="col-2 d-none d-sm-block"></div>
                <div className="col-8 d-none d-sm-block">
                    <header className="py-3 mb-4 d-none d-sm-block">
                        <nav className="navbar navbar-expand-lg navbar-light p-0 d-none d-sm-block">
                            {/* Navbar toggle for small screens */}
                            <button
                                className="navbar-toggler d-sm-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {/* Navbar content */}
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="nav col-12 col-md-auto mb-2 justify-content-center customHeader p-2 mt-3">
                                    <li><Link to="/auth" className="nav-link link-secondary">Home</Link></li>
                                    <li><Link to="/appointment" className="nav-link link-dark">Appointment</Link></li>
                                    <li><Link to="/yourdogs" className="nav-link link-dark">Your Dogs</Link></li>
                                    <li><Link to="/findnewowner" className="nav-link link-dark">Find a new owner</Link></li>
                                    <li><Link to="/profile" className="nav-link link-dark">Profile</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </div>
                <div className="col-2 d-none d-lg-block">
                    <div className="col-md-3 text-end mt-3">
                        <button onClick={logout} className="btn btn-sm btn-dark btn-custom-logout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Fullscreen overlay menu for small screens */}
            <div ref={navbarRef} className="d-lg-none">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid justify-content-end">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#smallScreenNav"
                        aria-controls="smallScreenNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse overlay" id="smallScreenNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item"><Link to="/auth" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to="/appointment" className="nav-link">Appointment</Link>
                            </li>
                            <li className="nav-item"><Link to="/yourdogs" className="nav-link">Your Dogs</Link></li>
                            <li className="nav-item"><Link to="/findnewowner" className="nav-link">Find a new
                                owner</Link></li>
                            <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
                            <li className="nav-item mt-3">
                                <button onClick={logout} className="btn btn-sm btn-dark btn-custom-logout">Logout
                                </button>
                            </li>
                        </ul>
                    </div>
            </div>
        </nav>
</div>
</div>
    );
}

export default AuthHeader;
