import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

import ParticleAnimation from 'react-particle-animation'

class Example extends Component {
    render() {
        return (
            <ParticleAnimation/>
        )
    }
}