"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef  } from 'react';
import '../../styles/wordleResult.css';
import axios from 'axios';
const WordleResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [greenLetters, setGreenLetters] = useState(Array(5).fill(''));
  const [yellowLetters, setYellowLetters] = useState(Array(5).fill(''));
  const [greyLetters, setGreyLetters] = useState('');
  const [nytWordle, setNytWordle] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieving data from the search params as a JSON object
    const greenLettersData = JSON.parse(decodeURIComponent(searchParams.get('greenLetters') || '{"green1": "", "green2": "", "green3": "", "green4": "", "green5": ""}'));
    const yellowLettersData = JSON.parse(decodeURIComponent(searchParams.get('yellowLetters') || '{"yellow1": "", "yellow2": "", "yellow3": "", "yellow4": "", "yellow5": ""}'));
    const greyLettersData = decodeURIComponent(searchParams.get('greyLetters') || '');
    const nytWordleData = searchParams.get('nytWordle') === 'true';
  
    // Convert the JSON object into an array using Object.values() method
    const greenLettersArray = Object.values(greenLettersData);
    const yellowLettersArray = Object.values(yellowLettersData);
  
    // Set the state values
    setGreenLetters(greenLettersArray);
    setYellowLetters(yellowLettersArray);
    setGreyLetters(greyLettersData);
    setNytWordle(nytWordleData);
    setLoading(false);
  
    console.log(greenLettersArray); // You can see the green letters array in the console
  }, [searchParams]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const greenFilled = Object.values(greenLetters).some((letter) => letter.trim() !== '');
    const yellowFilled = Object.values(yellowLetters).some((letter) => letter.trim() !== '');

    if (!greenFilled && !yellowFilled) {
      setErrorMessage('Wordle Solver says at least one Green or Yellow letter is required.');
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      setErrorMessage('');
      // Form data can be processed or submitted here
    }
  };
  

  const handleGreyInputChange = (e) => {
    const value = e.target.value; // Get the input value from the event object
  
    // Check for duplicates in green and yellow letters before updating state
    let newGreyLetters = value;
    const greyLettersArray = value.toLowerCase().split('');
  
    greyLettersArray.forEach((letter) => {
      if (letter !== '') {
        const greenDuplicates = greenLetters.filter(input => input.toLowerCase() === letter);
        const yellowDuplicates = yellowLetters.filter(input => input.toLowerCase() === letter);
        if (greenDuplicates.length > 0 || yellowDuplicates.length > 0) {
          alert(`The letter '${letter.toUpperCase()}' is already used in another box. Please remove it.`);
          newGreyLetters = newGreyLetters.replace(letter, ''); // Remove the duplicate letter
        }
      }
    });
  
    setGreyLetters(newGreyLetters); // Update grey letters state
  
    // Change background color based on whether input is empty or not
    const greyInput = e.target; // Access the current input element
    if (newGreyLetters === '') {
      greyInput.style.backgroundColor = 'white'; // Keep background white if the input is empty
    } else {
      greyInput.style.backgroundColor = '#4B5563'; // Change to grey if input is not empty
    }
  };
  
  

  const greenRefs = useRef([]);
  const yellowRefs = useRef([]);
  const handleInputChange = (e, index, setLetters, letters, refs, greenLetters, yellowLetters, isGreen) => {
    const newLetters = [...letters];
    newLetters[index] = e.target.value;

    // Ensure greenLetters and yellowLetters are always arrays
    const safeGreenLetters = greenLetters || [];
    const safeYellowLetters = yellowLetters || [];

    // Check for duplicates in green or yellow letters before updating the state
    const color = isGreen ? '#16a34a' : '#eab308'; // Green or yellow background color
    const isValid = checkForDuplicates(e.target, safeGreenLetters, safeYellowLetters, color, isGreen);

    if (isValid) {
      setLetters(newLetters);
    } else {
      // Clear the input field if a duplicate is found
      e.target.value = '';
    }

    // Automatically focus on the next input if the current input is filled
    if (e.target.value && index < newLetters.length - 1) {
      const nextInput = refs.current[index + 1];
      if (nextInput) nextInput.focus();
    }

    // Handle backspace behavior: Move focus to the previous input if the current input is empty
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      const prevInput = refs.current[index - 1];
      if (prevInput) {
        prevInput.focus();  // Focus previous input in the same group
      }
    }
  };

  // Function to check for duplicates
  const checkForDuplicates = (input, greenLetters, yellowLetters, color, isGreen) => {
    const letter = input.value ? input.value : '';
    if (letter !== '') {
      // Check for duplicates between green and yellow letters only (case-insensitive)
      if (!isGreen) {
        if (greenLetters.some(i => i.toLowerCase() === letter.toLowerCase())) {
          alert(`The letter '${letter.toUpperCase()}' is already used in the green box. Please remove it.`);
          return false; // Return false to prevent setting the value in state
        }
      } else {
        if (yellowLetters.some(i => i.toLowerCase() === letter.toLowerCase())) {
          alert(`The letter '${letter.toUpperCase()}' is already used in the yellow box. Please remove it.`);
          return false; // Return false to prevent setting the value in state
        }
      }
    }
    
    // Set background color based on whether the input has a value
    input.style.backgroundColor = input.value === '' ? 'white' : color;
  
    return true; // Return true if no duplicates are found
  };
  const handleKeyDown = (e, index, refs) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      const prevInput = refs.current[index - 1];
      if (prevInput) {
        prevInput.focus();  // Focus previous input in the same group
      }
    }
  };
  
  const setInitialColors = (inputs, color = 'white') => {
  
    inputs.forEach(input => {
      input.value = ''; // Reset the input value
      input.style.backgroundColor = color; // Reset the background color
    });
  };
  
  const handleClearAll = () => {
    
    // Reset both green and yellow letter inputs
    setInitialColors(greenRefs.current);
    setInitialColors(yellowRefs.current);
    
    // Optionally reset state for green and yellow letters
    setGreenLetters(["", "", "", "", ""]);
    setYellowLetters(["", "", "", "", ""]);
    setGreyLetters("");
  };
  // Focus the input based on its index
  const handleFocus = (index, letters, refs) => {
    // Safely focus the input element at the specified index
    if (letters[index] === "" && refs.current[index]) {
      refs.current[index].focus();
    }
  };
  useEffect(() => {
    // This runs once after initial render to set initial background colors
    const inputs = Array.from(document.querySelectorAll('.input'));
    inputs.forEach(input => {
      if (input.value !== '') {
        input.style.backgroundColor = input.classList.contains('green') ? '#16a34a' : '#eab308';
      }
    });
  }, []);

  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);
 // Fetch today's Wordle solution on page load
useEffect(() => {
    const fetchWordleSolution = async () => {
      try {
        const response = await axios.get('http://localhost:3001/wordle');
        console.log(response);
        // Check if the response has the solution
        if (response.data && response.data.solution) {
          setSolution(response.data.solution); // Store the solution
         
        } else {
          throw new Error('Wordle solution not found');
        }
      } catch (error) {
        setError(error.message); // Handle any error
      }
    };
    console.log(solution);
    fetchWordleSolution(); // Run the fetch on page load
  }, []); // Empty dependency array means this effect runs once when the component mounts
  
  return (
    <main className="relative hero-results mb-6">
      {errorMessage && (
        <div
          id="error-message"
          className="absolute top-2 right-10 z-10 bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-md border border-red-700 opacity-100 transition-all duration-500 ease-in-out"
        >
          {errorMessage}
        </div>
      )}
      <div className="relative z-8 sm:px-6 md:px-8 flex flex-col items-center w-full">
        <h1 className="text-3xl text-center font-bold my-6 mx-auto animate-fadeInUp">
          Potential Wordle Answers
        </h1>

        <div className="z-10 px-4 sm:px-6 md:px-8 mt-8 gap-4 max-w-[1400px] w-full flex flex-col md:flex-row justify-center items-start mx-auto">
          {/* Left Column (Form Column) */}
          <form
  id="wordle-form"
  className="glass-card p-4 rounded-lg shadow-xl md:w-full mx-auto max-w-md bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg flex flex-col gap-4 md:sticky top-8"
>
<div className="flex flex-col w-full relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-4 h-4 rounded-sm bg-green-600"></span>
          <h2 className="text-lg font-bold">Enter Green Letters</h2>
          <span className="tooltip">
            <span className="tooltip-text">Enter letters that are correct and in the right position.</span>
            <span className="tooltip-icon">?</span>
          </span>
        </div>
        <div className="flex gap-1 w-full">
        {[...Array(5)].map((_, i) => (
  <input
    key={`green-${i}`}
    type="text"
    className="letter-input border border-green-600 text-black focus:border-black focus:outline-none"
    maxLength="1"
    autoComplete="off"
    value={greenLetters[i] || ''}
    onChange={(e) => handleInputChange(e, i, setGreenLetters, greenLetters, greenRefs, greenLetters, yellowLetters, true)}
    onFocus={(e) => handleFocus(i, greenLetters, greenRefs)}
    style={{ backgroundColor: greenLetters[i] ? '#16a34a' : 'white' }}
    ref={(el) => greenRefs.current[i] = el} // Assign ref for green inputs
    onKeyDown={(e) => handleKeyDown(e, i, greenRefs)}
  />
))}
        </div>
      </div>

      {/* Yellow Letters Input Row */}
      <div className="flex flex-col w-full relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-4 h-4 rounded-sm bg-yellow-500"></span>
          <h2 className="text-lg font-bold">Enter Yellow Letters</h2>
          <span className="tooltip">
            <span className="tooltip-text">Enter letters that are in today's Wordle but in the wrong position.</span>
            <span className="tooltip-icon">?</span>
          </span>
        </div>
        <div className="flex gap-1 w-full">
          {yellowLetters.map((letter, index) => (
            <input
              key={`yellow-${index}`} 
              type="text"
              className="letter-input border border-yellow-500 text-black focus:border-black focus:outline-none"
              maxLength="1"
              autoComplete="off"
              value={yellowLetters[index] || ''} 
              onChange={(e) => handleInputChange(e, index, setYellowLetters, yellowLetters, yellowRefs, greenLetters, yellowLetters, false)}
              onFocus={(e) => handleFocus(index, yellowLetters, yellowRefs)}  
              style={{ backgroundColor: yellowLetters[index] ? '#eab308' : 'white' }} 
              ref={(el) => yellowRefs.current[index] = el} // Assign ref for yellow inputs
              onKeyDown={(e) => handleKeyDown(e, index, yellowRefs)}
            />
          ))}
        </div>
      </div>

  {/* Grey Letters Input Row */}
  <div className="flex flex-col w-full relative">
    <div className="flex items-center gap-2 mb-2">
      <span className="inline-block w-4 h-4 rounded-sm bg-gray-600"></span>
      <h2 className="text-lg font-bold">Enter Grey Letters</h2>
      <span className="tooltip">
        <span className="tooltip-text">Enter letters that are not in the word at all.</span>
        <span className="tooltip-icon">?</span>
      </span>
    </div>
    <div className="flex w-full">
      <input
        type="text"
        className="letter-input border border-gray-600 text-black w-full focus:border-black focus:outline-none"
        value={greyLetters}
        onChange={(e) => {
          setGreyLetters(e.target.value);  // This will directly update the state
          handleGreyInputChange(e);  // Pass the event object to the handler
        }}
        style={{ width: "100%", textAlign: "left", paddingLeft: "10px" }}
      />
    </div>
  </div>

  {/* Today's Wordle checkbox */}
  <div className="flex items-center gap-2 mt-4">
    <label className="flex items-center cursor-pointer gap-5">
      <input
        type="checkbox"
        checked={nytWordle}
        onChange={() => setNytWordle((prev) => !prev)}
        className="hidden peer"
      />
      <span className="peer-checked:!bg-orange-web shrink-0 transform w-[1.625rem] h-[1.625rem] border-[7px] border-white bg-white shadow-radio transition-all duration-300"></span>
      <span className="text-black font-semibold">Today's Wordle Answers Only</span>
    </label>
    <span className="tooltip">
      <span className="tooltip-text">Keep this enabled if you're playing today's Wordle game.</span>
      <span className="tooltip-icon">?</span>
    </span>
  </div>

  {/* Buttons */}
  <div className="flex flex-col gap-4 w-full mt-2">
    <button
      onClick={handleClearAll}
      type='reset'
      className="button-orange w-full p-2 bg-red-500 text-white font-bold rounded-full shadow-md"
    >
      Clear All
    </button>
    <button
      type="submit"
      className="button-orange w-full p-2 bg-blue-500 text-white font-bold rounded-full shadow-md"
    >
      Find Wordle
    </button>
  </div>
</form>


          {/* Right Column (Results) */}
          <div id="resultDiv" className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full md:min-w-2/3">
            {/* Results or Loader */}
            {loading ? (
              <div id="loader" className="loading mx-auto"></div>
            ) : (
              <div>
                {/* Render results here */}
                <p>Results will appear here. </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WordleResult;
