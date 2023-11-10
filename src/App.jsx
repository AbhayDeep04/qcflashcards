import React, { useState } from 'react';
import './App.css';
import Card from "./components/Card.jsx";
import FuzzySet from 'fuzzyset';

const App = () => {
  const flashcardsData = [
    {
      question: "What is the phenomenon where two qubits affect each other's state?",
      answer: "Entanglement"
    },
    {
      question: "What is the basic unit of quantum information?",
      answer: "Qubit"
    },
    {
      question: "What property allows qubits to be in multiple states at once?",
      answer: "Superposition"
    },
    {
      question: "What is the name of the flagship Quantum computing module created by IBM?",
      answer: "QISKIT"
    },
    {
      question: "What is the process called when a qubit's state is measured?",
      answer: "Collapse"
    },
    {
      question: "What type of gates manipulate qubit states?",
      answer: "Quantum gates"
    },
    {
      question: "What is it called when quantum computers perform many calculations at once?",
      answer: "Parallelism"
    },
    {
      question: "What is the name of the famous algorithm for factoring integers in quantum computing?",
      answer: "Shor's algorithm"
    },
    {
      question: "What is error correction in quantum computing aimed at fixing?",
      answer: "Quantum decoherence"
    },
    {
      question: "What is a large collection of qubits known as?",
      answer: "Quantum register"
    }
  ];
  

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const checkGuess = () => {
    const correctAnswer = flashcardsData[currentCardIndex].answer.toLowerCase();
    const userGuessLower = userGuess.toLowerCase();
    
    const fs = FuzzySet([correctAnswer]);

    const similarity = fs.get(userGuessLower);

    const threshold = 0.8; 

    if (similarity && similarity[0][0] >= threshold) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
    setShowAnswer(false);
    setUserGuess('');
    setIsCorrect(null);
  };

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length);
    setShowAnswer(false);
    setUserGuess('');
    setIsCorrect(null);
  };

  return (
    <div className='container'>
      <div className='title'>
        <h1>Quantum Computing Flash Cards</h1>
        <h3>Test your knowledge of Quantum Computing! Type in the answer or click on the card to see the answer. Click on the card again to go back to question mode.</h3>
        <h4>Number of cards: {flashcardsData.length}</h4>
      </div>
      <div>
        <Card
          question={flashcardsData[currentCardIndex].question}
          answer={flashcardsData[currentCardIndex].answer}
          showAnswer={showAnswer}
          toggleAnswer={toggleAnswer}
        />
        {!showAnswer && (
          <div>
            <input
              type="text"
              placeholder="Enter your guess"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
            />
            <button onClick={checkGuess}>Submit</button>
            {isCorrect === true && <p>Correct!</p>}
            {isCorrect === false && <p>Incorrect!</p>}
          </div>
        )}
        <button onClick={goToPreviousCard}>Previous</button>
        <button onClick={goToNextCard}>Next</button>
      </div>
    </div>
  );
}

export default App;
