import {createSignal} from 'solid-js';

function App() {
    const [time, setTime] = createSignal(Date.now());

    setInterval(() => {
        setTime(Date.now());
    }, 1000);

    const timeString = () => {
        return new Date(time()).toTimeString();
    };

    return (
        <div>
            <div>timeNumber{time()}</div>
            <div>timeString{timeString()}</div>
        </div>
    );
}

export default App;
