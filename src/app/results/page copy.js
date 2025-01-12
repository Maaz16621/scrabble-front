"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Results() {
    const [scrabbleLetters, setScrabbleLetters] = useState("");
    const [dictionary, setDictionary] = useState("uk");
    const [starts, setStarts] = useState("");
    const [ends, setEnds] = useState("");
    const [contains, setContains] = useState("");
    const [length, setLength] = useState("");
    const [sortAlphabet, setSortAlphabet] = useState("a-z");
    const [sortBy, setSortBy] = useState("length");
  
    
  const [wordList, setWordList] = useState([]);
  const [groupedWords, setGroupedWords] = useState({});
  const [currentWordCount, setCurrentWordCount] = useState({});

  useEffect(() => {
    // Parse URL parameters when the component mounts
    const urlParams = new URLSearchParams(window.location.search);

    // Set the form state from URL parameters if available
    setScrabbleLetters(urlParams.get("scrabbleInput") || "");
    setDictionary(urlParams.get("dictionary") || "uk");
    setStarts(urlParams.get("startsWith") || "");
    setEnds(urlParams.get("endsWith") || "");
    setContains(urlParams.get("contains") || "");
    setLength(urlParams.get("length") || "");
    setSortAlphabet(urlParams.get("sortAlphabet") || "a-z");
    setSortBy(urlParams.get("sortBy") || "length");
  }, []); // Run once on mount

//   const fetchWordList = async () => {
//     try {
//       const response = await axios.get(`words.php?dictionary=${dictionary}`);
//       const fetchedWords = response.data;
//       setWordList(fetchedWords);
//       updateResults();
//     } catch (error) {
//       console.error('Error fetching word list:', error);
//     }
//   };

//   const updateResults = () => {
//     let words = [...wordList];
//     const maxWordLength = scrabbleLetters ? scrabbleLetters.length : Infinity;

//     if (scrabbleLetters) {
//       words = words.filter(word => canFormWord(word, scrabbleLetters.toLowerCase()));
//     }
//     if (starts) {
//       words = words.filter(word => word.startsWith(starts.toLowerCase()));
//     }
//     if (ends) {
//       words = words.filter(word => word.endsWith(ends.toLowerCase()));
//     }
//     if (contains) {
//       words = words.filter(word => matchesPattern(word.toUpperCase(), contains.toUpperCase()));
//     }
//     if (length) {
//       words = words.filter(word => word.length === parseInt(length));
//     } else {
//       words = words.filter(word => word.length <= maxWordLength);
//     }

//     words = words.filter(word => word.length > 1);

//     const sortedKeys = Object.keys(groupedWords).sort((a, b) => b - a);

//     const newGroupedWords = {};
//     words.forEach(word => {
//       const points = calculatePoints(word);
//       const length = word.length;

//       if (!newGroupedWords[points]) {
//         newGroupedWords[points] = [];
//       }
//       newGroupedWords[points].push(word);
//     });

//     setGroupedWords(newGroupedWords);
//     setCurrentWordCount({});

//     sortedKeys.forEach(key => {
//       if (!currentWordCount[key]) {
//         setCurrentWordCount(prevState => ({ ...prevState, [key]: 16 }));
//       }
//     });

//     displayWords(sortBy);
//   };

//   const displayWords = () => {
//     const resultDiv = document.getElementById('resultDiv');
//     resultDiv.innerHTML = '';

//     const sortedKeys = Object.keys(groupedWords).sort((a, b) => b - a);

//     sortedKeys.forEach(key => {
//       const wordDiv = document.createElement('div');
//       wordDiv.className = 'result-card w-full bg-white border border-gray-200 mb-5 rounded-lg shadow-md';

//       const topSection = document.createElement('div');
//       topSection.className = 'bg-orange-web text-white rounded-t-lg';
//       topSection.innerHTML = `<h2 class="font-bold text-xl p-4 text-left">${sortBy === 'points' ? 'Words with ' + key + ' points' : 'Words of length ' + key}</h2>`;
//       wordDiv.appendChild(topSection);

//       const wordsSection = document.createElement('div');
//       wordsSection.className = 'py-8 px-6';
//       const wordsFlex = document.createElement('div');
//       wordsFlex.className = 'flex flex-wrap gap-5';

//       const countToShow = currentWordCount[key];
//       const wordsToShow = groupedWords[key] ? groupedWords[key].slice(0, countToShow) : [];

//       wordsToShow.forEach(word => {
//         const points = calculatePoints(word);
//         const wordElement = document.createElement('div');
//         wordElement.className = 'relative';
//         const pointsSpan = document.createElement('span');
//         pointsSpan.className = 'absolute -top-4 -right-4 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full';
//         pointsSpan.textContent = points;

//         const wildcardCount = (contains.match(/\?/g) || []).length;
//         const regexPattern = contains.replace(/\?/g, '.');
//         const regex = new RegExp(regexPattern, 'gi');

//         const highlightedWord = word.replace(regex, (match) => {
//           return `<span class="text-orange-500 ">${match}</span>`;
//         });

//         const wordText = document.createElement('span');
//         wordText.className = 'bg-gray-200 text-gray-800 highlighted-text px-4 py-2 rounded-full border border-gray-300';
//         wordText.innerHTML = highlightedWord;

//         wordElement.appendChild(pointsSpan);
//         wordElement.appendChild(wordText);
//         wordsFlex.appendChild(wordElement);
//       });

//       wordsSection.appendChild(wordsFlex);
//       wordDiv.appendChild(wordsSection);

//       if (wordsToShow.length < (groupedWords[key] ? groupedWords[key].length : 0)) {
//         const showMoreButton = document.createElement('button');
//         showMoreButton.className = 'm-4 p-2 bg-orange-web text-white rounded-full';
//         showMoreButton.textContent = 'Show More';
//         showMoreButton.onclick = () => {
//           setCurrentWordCount(prevState => ({ ...prevState, [key]: prevState[key] + 16 }));
//           displayWords(sortBy);
//         };
//         wordDiv.appendChild(showMoreButton);
//       }

//       resultDiv.appendChild(wordDiv);
//     });
//   };

//   const calculatePoints = (word) => {
//     const letterValues = {
//       A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5,
//       L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4,
//       W: 4, X: 8, Y: 4, Z: 10
//     };

//     const wwfLetterValues = {
//       E: 1, A: 1, I: 1, O: 1, T: 1, R: 1, S: 1,
//       D: 2, N: 2, L: 2, U: 2,
//       H: 3, G: 3, Y: 3,
//       B: 4, C: 4, F: 4, M: 4, P: 4, W: 4,
//       V: 5, K: 5,
//       X: 8,
//       J: 10, Q: 10, Z: 10
//     };

//     if (dictionary === 'wwf') {
//       return word.toUpperCase().split('').reduce((total, letter) => total + (wwfLetterValues[letter] || 0), 0);
//     } else {
//       return word.toUpperCase().split('').reduce((total, letter) => total + (letterValues[letter] || 0), 0);
//     }
//   };

//   const canFormWord = (word, letters) => {
//     let availableLetters = letters.split('');
//     let wildcards = availableLetters.filter(l => l === '?').length;

//     for (let letter of word.toUpperCase()) {
//       if (availableLetters.includes(letter)) {
//         availableLetters.splice(availableLetters.indexOf(letter), 1);
//       } else if (wildcards > 0) {
//         wildcards--;
//       } else {
//         return false;
//       }
//     }
//     return true;
//   };

//   const matchesPattern = (word, pattern) => {
//     const wildcardCount = (pattern.match(/\?/g) || []).length;
//     const regexPattern = pattern.replace(/\?/g, '.');
//     const regex = new RegExp(regexPattern, 'gi');
//     return regex.test(word);
//   };

//   const handleScrabbleLettersChange = (e) => {
//     let newValue = e.target.value.toUpperCase();
//     let questionMarkCount = (newValue.match(/\?/g) || []).length;

//     if (questionMarkCount < 3) {
//       let remainingSpaces = 3 - questionMarkCount;
//       newValue = newValue.replace(/\s/g, (match) => (remainingSpaces-- > 0 ? '?' : ''));
//     } else {
//       newValue = newValue.replace(/\s/g, '');
//     }

//     const limitQuestionMarks = (str) => {
//       let count = 0;
//       return str.replace(/\?/g, (match) => (count++ < 3 ? '?' : ''));
//     };

//     newValue = limitQuestionMarks(newValue);
//     setScrabbleLetters(newValue);
//   };

//   const handleStartsChange = (e) => {
//     setStarts(e.target.value.toUpperCase());
//   };

//   const handleEndsChange = (e) => {
//     setEnds(e.target.value.toUpperCase());
//   };

//   const handleContainsChange = (e) => {
//     setContains(e.target.value.toUpperCase());
//   };

//   const handleLengthChange = (e) => {
//     setLength(e.target.value);
//   };

//   const handleDictionaryChange = (e) => {
//     setDictionary(e.target.value);
//   };

//   const handleSortByChange = (e) => {
//     setSortBy(e.target.value);
//     updateResults();
//   };

//   const handleSortAlphabetChange = (e) => {
//     updateResults();
//   };
  return (
    <div>
      <Head>
        <title>AI Word Solver - Results</title>
        <link rel="preload" href="/assets/css/style.min.css" as="style" />
        <link rel="stylesheet" href="/assets/css/custom-icons.css" media="print" onLoad="this.media='all'" />
        <noscript>
          <link rel="stylesheet" href="/assets/css/custom-icons.css" />
        </noscript>
        <style>
          {`
           /* Wave Animation */
      .highlighted-text {
  text-transform: uppercase;
}

/* HTML: <div class="loader"></div> */

.laoding {
    margin-left: auto;
    margin-right: auto;
    width: 40px;
    height: 40px;
    --c:no-repeat linear-gradient(orange 0 0);
    background: var(--c),var(--c),var(--c),var(--c);
    background-size: 21px 21px;
    animation: l5 1.5s infinite cubic-bezier(0.3,1,0,1);
}
@keyframes l5 {
   0%   {background-position: 0    0,100% 0   ,100% 100%,0 100%}
   33%  {background-position: 0    0,100% 0   ,100% 100%,0 100%;width:60px;height: 60px}
   66%  {background-position: 100% 0,100% 100%,0    100%,0 0   ;width:60px;height: 60px}
   100% {background-position: 100% 0,100% 100%,0    100%,0 0   }
}


/* Red Box for No Results */
.no-results {
    display: none; /* Initially hidden */
    background-color: rgba(255, 0, 0, 0.1);
    border: 1px solid red;
    color: red;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
}

          `}
        </style>
      </Head>
      <header>
        {/* Include your Navbar component here */}
      </header>
      <main className="relative hero hero-results">
        <div className="relative z-10 sm:px-6 md:px-8 flex flex-col w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 " >Results</h1>
          <div className='mt-8 mx-auto px-6 md:w-3/4 sm:w-full'>
          <form className="glass-card p-6 rounded-lg shadow-lg max-w-full w-full bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg mb-8">
      {/* Form Inputs */}
      <div className="w-full mb-4 flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="scrabble_letters" className="text-oxford-blue flex items-center mb-1">
            Enter Your Letters
            <span className="tooltip">?</span>
          </label>
          <input
            type="text"
            id="scrabble_letters"
            name="scrabble_letters"
            placeholder="Enter your scrambled letters..."
            value={scrabbleLetters}
            onChange={(e) => setScrabbleLetters(e.target.value.toUpperCase().replace(/[^A-Z?]/g, ''))}
            className="uppercase-input p-3 text-oxford-blue rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/3">
          <label htmlFor="dictionary" className="text-oxford-blue flex items-center mb-1">
            Dictionary
            <span className="tooltip">?</span>
          </label>
          <select
            id="dictionary"
            name="dictionary"
            value={dictionary}
            onChange={(e) => setDictionary(e.target.value)}
            className="w-full p-3 text-oxford-blue rounded-lg shadow-md"
          >
            <option value="uk">Scrabble UK</option>
            <option value="us">Scrabble US</option>
            <option value="wwf">Words with Friends</option>
          </select>
        </div>
      </div>
      {/* Additional Inputs */}
      <div className="w-full flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex flex-col w-full lg:w-1/5">
          <label htmlFor="starts" className="text-oxford-blue flex items-center mb-1">
            Start with
            <span className="tooltip">?</span>
          </label>
          <input
            type="text"
            id="starts"
            name="starts"
            placeholder="Start with..."
            value={starts}
            onChange={(e) => setStarts(e.target.value.toUpperCase().replace(/[^A-Z?]/g, ''))}
            className="uppercase-input p-3 text-oxford-blue rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/5">
          <label htmlFor="ends" className="text-oxford-blue flex items-center mb-1">
            Ends with
            <span className="tooltip">?</span>
          </label>
          <input
            type="text"
            id="ends"
            name="ends"
            placeholder="Ends with..."
            value={ends}
            onChange={(e) => setEnds(e.target.value.toUpperCase().replace(/[^A-Z?]/g, ''))}
            className="uppercase-input p-3 text-oxford-blue rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/5">
          <label htmlFor="contains" className="text-oxford-blue flex items-center mb-1">
            Contains
            <span className="tooltip">?</span>
          </label>
          <input
            type="text"
            id="contains"
            name="contains"
            placeholder="Contains letters..."
            value={contains}
            onChange={(e) => setContains(e.target.value.toUpperCase().replace(/[^A-Z?_]/g, ''))}
            className="uppercase-input p-3 text-oxford-blue rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/5">
          <label htmlFor="length" className="text-oxford-blue flex items-center mb-1">
            Length
            <span className="tooltip">?</span>
          </label>
          <input
            type="number"
            id="length"
            name="length"
            placeholder="Word Length..."
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="uppercase-input p-3 text-oxford-blue rounded-lg shadow-md"
            min="1"
            max="15"
          />
        </div>
        <button
          type="submit"
          className="w-full lg:w-1/5 p-3 h-2/3 mt-8 bg-orange-web text-white font-bold rounded-lg shadow-lg"
        >
          Find Words
        </button>
      </div>
      {/* Sorting Options */}
      <div className="w-full flex gap-4 mb-4">
        <div className="flex flex-col w-full">
          <label htmlFor="sortAlphabet" className="text-oxford-blue flex items-center mb-1">
            Sort In
            <span className="tooltip">?</span>
          </label>
          <select
            id="sortAlphabet"
            value={sortAlphabet}
            onChange={(e) => setSortAlphabet(e.target.value)}
            className="w-full p-3 text-oxford-blue rounded-lg shadow-md"
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="sortBy" className="text-oxford-blue flex items-center mb-1">
            Sort By
            <span className="tooltip">?</span>
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-3 text-oxford-blue rounded-lg shadow-md"
          >
            <option value="length">Word Length</option>
            <option value="points">Word Points</option>
          </select>
        </div>
      </div>
    </form>
         
        
          </div>
        </div>
      </main>
     
    </div>
  );
}
