import './App.css';
import logo from '../logo.svg';
import AppContent from "./AppContent";

function App() {
    return (
        <div>
            {/* <Header pageTitle="Front end authenticated with JWT" logoSrc={logo} /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <AppContent />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
