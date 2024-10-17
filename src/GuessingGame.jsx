import  { useState } from 'react';

const GuessingGame = () => {
    const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [attempts, setAttempts] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedNumbers, setSelectedNumbers] = useState(new Array(100).fill(false));

    const handleGuess = (number) => {
        if (selectedNumbers[number - 1]) {
            setMessage('Ya has seleccionado este número, intenta con otro.');
            return;
        }

        const newSelectedNumbers = [...selectedNumbers];
        newSelectedNumbers[number - 1] = true;
        setSelectedNumbers(newSelectedNumbers);

        setAttempts([...attempts, number]);

        if (number === secretNumber) {
            setMessage(`Felicidades, adivinaste el número secreto: ${secretNumber}. Intentos: ${attempts.join(', ')}, incluyendo ${number}.`);
        } else {
            setMessage('¡Oh no! el número secreto es incorrecto, vuelve a intentarlo.');
        }
    };

    const handleRestart = () => {
        setSecretNumber(Math.floor(Math.random() * 100) + 1);
        setAttempts([]);
        setMessage('');
        setSelectedNumbers(new Array(100).fill(false));
    };

    return (
        <div>
            <h1>Juego de Adivinanza</h1>
            <div className="buttons-container">
                {Array.from({ length: 100 }, (_, index) => {
                    const number = index + 1;
                    return (
                        <button
                            key={number}
                            onClick={() => handleGuess(number)}
                            style={{
                                backgroundColor: selectedNumbers[number - 1] ? 'gray' : 'lightgray',
                                margin: '5px',
                                padding: '10px',
                                color: 'black',
                            }}
                            disabled={selectedNumbers[number - 1]}
                        >
                            {number}
                        </button>
                    );
                })}
            </div>
            <p>{message}</p>
            {message && <button onClick={handleRestart}>Volver a jugar</button>}
        </div>
    );
};

export default GuessingGame;
