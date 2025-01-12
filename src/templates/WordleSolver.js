'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';
import '../styles/wordleSolver.css';
const WordleSolver = ({pageData}) => {
  const [greenLetters, setGreenLetters] = useState({ green1: '', green2: '', green3: '', green4: '', green5: '' });
  const [yellowLetters, setYellowLetters] = useState({ yellow1: '', yellow2: '', yellow3: '', yellow4: '', yellow5: '' });
  const [greyLetters, setGreyLetters] = useState('');
  const [nytWordle, setNytWordle] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams()
  useEffect(() => {
    const handleInputNavigation = (inputs, color) => {
      inputs.forEach((input, index) => {
        const element = document.getElementById(input);
        if (element) {
          element.addEventListener('input', () => {
            element.style.backgroundColor = element.value === '' ? 'white' : color;
            if (element.value.length === 1 && index < inputs.length - 1) {
              document.getElementById(inputs[index + 1]).focus();
            }
          });

          element.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && element.value.length === 0 && index > 0) {
              document.getElementById(inputs[index - 1]).focus();
            }
          });
        }
      });
    };

    const greenInputs = Object.keys(greenLetters).map((key) => key);
    const yellowInputs = Object.keys(yellowLetters).map((key) => key);

    handleInputNavigation(greenInputs, '#047857');
    handleInputNavigation(yellowInputs, '#eab308');

    const greyElement = document.getElementById('grey-letters');
    if (greyElement) {
      greyElement.addEventListener('input', () => {
        const greyLettersArray = greyElement.value.toLowerCase().split('');
        greyLettersArray.forEach((letter) => {
          if (letter) {
            const greenDuplicates = greenInputs.some((input) => document.getElementById(input).value.toLowerCase() === letter);
            const yellowDuplicates = yellowInputs.some((input) => document.getElementById(input).value.toLowerCase() === letter);
            if (greenDuplicates || yellowDuplicates) {
              alert(`The letter '${letter.toUpperCase()}' is already used in another box. Please remove it.`);
              greyElement.value = greyElement.value.replace(letter, '');
            }
          }
        });
        greyElement.style.backgroundColor = greyElement.value === '' ? 'white' : '#4B5563';
      });
    }

    const checkForDuplicates = (input, otherInputs, color) => {
      const element = document.getElementById(input);
      if (element) {
        element.addEventListener('input', () => {
          const letter = element.value.toLowerCase();
          if (letter && (greyElement.value.toLowerCase().includes(letter) || otherInputs.some((otherInput) => document.getElementById(otherInput).value.toLowerCase() === letter))) {
            alert(`The letter '${letter.toUpperCase()}' is already used in another box. Please remove it.`);
            element.value = '';
          }
          element.style.backgroundColor = element.value === '' ? 'white' : color;
        });
      }
    };

    greenInputs.forEach((input) => checkForDuplicates(input, yellowInputs, '#16a34a'));
    yellowInputs.forEach((input) => checkForDuplicates(input, greenInputs, '#eab308'));

  }, [greenLetters, yellowLetters]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const greenFilled = Object.values(greenLetters).some((letter) => letter.trim() !== '');
    const yellowFilled = Object.values(yellowLetters).some((letter) => letter.trim() !== '');
    const errorMessage = document.getElementById('error-message');

    if (!greenFilled && !yellowFilled) {
      errorMessage.textContent = 'Wordle Solver says at least one Green or Yellow letter is required.';
      errorMessage.classList.remove('hidden');
      errorMessage.classList.add('opacity-100');
      errorMessage.classList.remove('opacity-0');

      setTimeout(() => {
        errorMessage.classList.add('opacity-0');
        errorMessage.classList.remove('opacity-100');
        setTimeout(() => errorMessage.classList.add('hidden'), 500);
      }, 3000);
    } else {
      errorMessage.classList.add('hidden');

      // Prepare form data to pass
      const formData = {
        greenLetters: encodeURIComponent(JSON.stringify(greenLetters)),  // Encoding greenLetters
        yellowLetters: encodeURIComponent(JSON.stringify(yellowLetters)), // Encoding yellowLetters
        greyLetters: encodeURIComponent(greyLetters),  // Encoding greyLetters
        nytWordle: nytWordle,  // Passing boolean as is
      };

      // Create query string from form data
      const searchParams = new URLSearchParams(formData).toString();

      // Use useRouter to navigate and pass the data in search params
      router.push(`/wordle-results?${searchParams}`);
    }
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value.toUpperCase() }));
  };
  const handleReset = () => {
    // Reset state values
    setGreenLetters({ green1: '', green2: '', green3: '', green4: '', green5: '' });
    setYellowLetters({ yellow1: '', yellow2: '', yellow3: '', yellow4: '', yellow5: '' });
    setGreyLetters('');
    setNytWordle(true);
  
    // Reset input colors to white
    const greenInputs = document.querySelectorAll('input[name^="green"]');
    const yellowInputs = document.querySelectorAll('input[name^="yellow"]');
    const greyInput = document.querySelector('input[name="greyLetters"]');
  
    greenInputs.forEach(input => input.style.backgroundColor = 'white');
    yellowInputs.forEach(input => input.style.backgroundColor = 'white');
    if (greyInput) {
      greyInput.style.backgroundColor = 'white';
    }
  };
  
  return (
    <main className="hero relative h-[75vh]">
      <div className="mobile-screen-shape"></div>
      <div id="error-message" 
    className="hidden absolute top-2 right-10 z-10 bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-md border border-red-700 opacity-0 transition-all duration-500 ease-in-out">
</div>
      <div className="relative z-10 px-4 sm:px-6 mb-12 md:px-6 xs:px-6 flex flex-col items-center w-full max-w-screen-lg h-full justify-center">
        <div className="text-center mb-2">
          <h1 className="text-5xl font-bold mb-2">{pageData.hero_title}</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-lg mx-auto">
          {pageData.hero_text}
          </p>
        </div>
    <form onSubmit={handleSubmit} className="glass-card px-6 py-4 rounded-lg border-2 border-black max-w-xl flex justify-center gap-2 w-full bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg flex flex-col items-center relative">
      {/* Green Letters Input Row */}
      <div className="flex flex-col w-full relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-4 h-4 rounded-sm bg-green-600"></span>
          <h2 className="text-lg font-bold">Enter Green Letters</h2>
          <span className="tooltip">
            <span className="tooltip-text">
              Enter letters that are correct and in the right position. Make sure they are in the same position as in the Wordle.
            </span>
            <span className="tooltip-icon">?</span>
          </span>
        </div>
        <div className="flex justify-between gap-2 w-full">
          {Object.keys(greenLetters).map((key, index) => (
            <input
              key={index}
              type="text"
              id={key}
              name={key}
              value={greenLetters[key]}
              onChange={(e) => handleInputChange(e, setGreenLetters)}
              className="letter-input border border-green-700 text-white focus:border-black focus:outline-none"
              maxLength="1"
              autoComplete="off"
            />
          ))}
        </div>
      </div>

      {/* Yellow Letters Input Row */}
      <div className="flex flex-col w-full relative">
        <div className="flex items-center mb-2">
          <span className="inline-block mr-2 w-4 h-4 rounded-sm bg-yellow-500"></span>
          <h2 className="text-lg font-bold">Enter Yellow Letters</h2>
          <span className="tooltip">
            <span className="tooltip-text">
              Enter letters that are in today's Wordle but in the wrong position. The yellow letters field is NOT position dependent.
            </span>
            <span className="tooltip-icon">?</span>
          </span>
        </div>
        <div className="flex justify-between gap-2 w-full">
          {Object.keys(yellowLetters).map((key, index) => (
            <input
              key={index}
              type="text"
              id={key}
              name={key}
              value={yellowLetters[key]}
              onChange={(e) => handleInputChange(e, setYellowLetters)}
              className="letter-input border border-yellow-500 text-white focus:border-black focus:outline-none"
              maxLength="1"
              autoComplete="off"
            />
          ))}
        </div>
      </div>

      {/* Grey Letters Input Row */}
      <div className="flex flex-col w-full relative">
        <div className="flex items-center mb-2">
          <span className="inline-block mr-2 w-4 h-4 rounded-sm bg-gray-600"></span>
          <h2 className="text-lg font-bold">Enter Grey Letters</h2>
          <span className="tooltip">
            <span className="tooltip-text">
              Enter letters that are not in the word at all. You can input up to 25 letters at once.
            </span>
            <span className="tooltip-icon">?</span>
          </span>
        </div>
        <input
          type="text"
          id="grey-letters"
          name="grey"
          value={greyLetters}
          onChange={(e) => setGreyLetters(e.target.value.toUpperCase())}
          style={{ width: '100%', textAlign: 'left', paddingLeft: '10px' }}
          className="letter-input border border-gray-600 text-white w-full focus:border-black focus:outline-none"
          autoComplete="off"
        />
      </div>

      {/* Checkbox for New York Times Wordle Answers */}
      <div className="flex items-center gap-2 mt-4">
        <label className="flex items-center cursor-pointer gap-2">
          <input
            type="checkbox"
            id="wordle-answer"
            name="nyt_wordle"
            checked={nytWordle}
            onChange={() => setNytWordle(!nytWordle)}
            className="hidden peer"
          />
          <span className="peer-checked:!bg-orange-web shrink-0 transform w-[1.625rem] h-[1.625rem] border-[7px] border-white bg-white shadow-radio transition-all duration-300"></span>
          <span className="text-black font-semibold">New York Times Wordle Answers Only</span>
        </label>
        <span className="tooltip">
          <span className="tooltip-text">
            Keep this option enabled if you're playing today's Wordle game. If not or playing Wordle Unlimited, disable it.
          </span>
          <span className="tooltip-icon">?</span>
        </span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col w-1/2 gap-4 mt-2">
        <button type="reset" onClick={handleReset} className="button-orange p-2 bg-red-500 text-white font-bold rounded-full shadow-md">
          Clear All
        </button>
        <button type="submit" className="button-orange p-2 text-white font-bold rounded-full shadow-md">
          Find Wordle
        </button>
      </div>
    </form>
    </div>
    </main>
  );
};

export default WordleSolver;
