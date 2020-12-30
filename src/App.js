import logo from './logo.svg';
import './App.css';

function App() {
    const env = process.env.REACT_APP_ENV;
    console.log(env)
    return (
        <div className="App">
            <header className="App-header">
                <div>环境变量</div>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
