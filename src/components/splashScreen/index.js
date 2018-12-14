import React, { Component } from "react";
import "./style.css";

class splashscreen extends Component {
    
    render() {
        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 140" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <mask id="mask" x="0" y="0" width="100%" height="100%" >
                            <rect x="0" y="0" width="100%" height="100%" />
                            <text x="40" y="80">GoTroughFiles</text>
                        </mask>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" />
                </svg>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        );
    }
}

export default splashscreen;