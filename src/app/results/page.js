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
  
    const [filteredWords, setFilteredWords] = useState([]);
    const [wordList, setWordList] = useState([]);
    let groupedWords = {};
    let currentWordCount = {};
    const letterValues = {
        A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5,
        L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4,
        W: 4, X: 8, Y: 4, Z: 10
    };

    const wwfLetterValues = {
    E: 1, A: 1, I: 1, O: 1, T: 1, R: 1, S: 1, // 1 point: E ×13, A ×9, I ×8, O ×8, T ×7, R ×6, S ×5
    D: 2, N: 2, L: 2, U: 2, // 2 points: D ×5, N ×5, L ×4, U ×4
    H: 3, G: 3, Y: 3, // 3 points: H ×4, G ×3, Y ×2
    B: 4, C: 4, F: 4, M: 4, P: 4, W: 4, // 4 points: B ×2, C ×2, F ×2, M ×2, P ×2, W ×2
    V: 5, K: 5, // 5 points: V ×2, K ×1
    X: 8, // 8 points: X ×1
    J: 10, Q: 10, Z: 10 // 10 points: J ×1, Q ×1, Z ×1
    };
  

  
    // Calculate Scrabble points for a word
    const calculatePoints = (word) => {
      if (dictionary !== 'wwf') {
        return word.toUpperCase().split('').reduce((total, letter) => total + (letterValues[letter] || 0), 0);
      } else {
        return word.toUpperCase().split('').reduce((total, letter) => total + (wwfLetterValues[letter] || 0), 0);
      }
    };
  
    // Check if a word can be formed with available letters
    const canFormWord = (word, letters) => {
      let availableLetters = letters.toUpperCase().split('');
      let wildcards = availableLetters.filter(l => l === '?').length;
  
      for (let letter of word.toUpperCase()) {
        if (availableLetters.includes(letter)) {
          availableLetters.splice(availableLetters.indexOf(letter), 1);
        } else if (wildcards > 0) {
          wildcards--;
        } else {
          return false;
        }
      }
      return true;
    };
  
    // Fetch word list based on dictionary
   // Define file paths for both dictionaries (you would likely fetch these from an API in a real application)
const filePaths = {
    uk: '/sources/new_dic.txt',
    us: '/sources/new_dic.txt',
    wwf: '/sources/wwf_new.txt',
  };
  
  // Fetch the word list based on the dictionary parameter
  // Fetch word list from the dictionary file
const fetchWordList = async (dictionary = 'us') => {
    try {
      const filePath = filePaths[dictionary];
  
      // If the filePath exists, proceed with the fetch request to get the dictionary file
      if (filePath) {
        const response = await fetch(filePath); // Assume the file is accessible via the specified path
        if (!response.ok) {
          console.warn(`Failed to load word list: ${response.statusText}`);
          return;
        }
  
        // Parse the response as text, and split by newlines
        const contents = await response.text();
        const words = contents
          .split('\n')
          .map((word) => word.trim().toLowerCase()) // Normalize the words to lowercase and trim whitespace
          .filter((word) => word.length > 0); // Filter out any empty lines
  
        console.log(words);
  
        // Handle the word list (set the state or process the list)
        setWordList(words); // Assuming setWordList is a function that stores the word list
        filterWords(words, dictionary); // Apply filters or other actions on the fetched words
      } else {
        console.error(`Dictionary not found: ${dictionary}`);
      }
    } catch (error) {
      console.error('Error fetching word list:', error);
    }
  };
  
  // Apply filters to the word list
  const filterWords = (words, dictionary) => {
    let filtered = words.filter((word) => {
      if (starts && !word.startsWith(starts)) return false;
      if (ends && !word.endsWith(ends)) return false;
      if (contains && !word.includes(contains)) return false;
      if (length && word.length !== parseInt(length)) return false;
      return canFormWord(word, scrabbleLetters, dictionary); // Ensure word can be formed with available letters
    });
  
    // Sort by alphabet or length
    if (sortBy === 'length') {
      filtered = filtered.sort((a, b) => a.length - b.length);
    } else if (sortBy === 'alphabet') {
      filtered = filtered.sort();
    }
  
    setFilteredWords(filtered);
    
  };
  
  // Fetch word list when the component mounts or dictionary changes
  useEffect(() => {
  
    fetchWordList(dictionary);

  }, [dictionary]);
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


    function validateContainsInput(input) {
        // Allow only letters (A-Z), wildcards (?), underscores (_), and hyphens (-)
        input.value = input.value.toUpperCase().replace(/[^A-Z?_ -]/g, '');

        // Count existing question marks
        let questionMarkCount = (input.value.match(/\?/g) || []).length;

        // Replace spaces with "?" only if the total number of "?" is less than 3
        input.value = input.value.replace(/\s/g, (match) => (questionMarkCount < 3 ? '?' : ''));

        // Limit to a maximum of 3 "?"
        const limitQuestionMarks = (str) => {
            let count = 0;
            return str.replace(/\?/g, (match) => (count++ < 3 ? '?' : ''));
        };

        // Apply the limit
        input.value = limitQuestionMarks(input.value);
    }
    function updateResults() {
        let words = [...wordList]; // Make a copy of the word list
        const maxWordLength = scrabbleLetters ? scrabbleLetters.length : Infinity;
        
        // Show the loader while searching
        document.getElementById('loader').style.display = 'block';
        document.getElementById('searchStatus').style.display = 'none'; // Hide no-results message
        document.getElementById('resultDiv').innerHTML = ''; // Clear previous results
        
        // Apply filters based on user input
        if (scrabbleLetters) {
            words = words.filter(word => canFormWord(word, scrabbleLetters.toLowerCase()));
        }
        if (starts) {
            words = words.filter(word => word.startsWith(starts.toLowerCase()));
        }
        if (ends) {
            words = words.filter(word => word.endsWith(ends.toLowerCase()));
        }
        if (contains) {
            words = words.filter(word => matchesPattern(word.toUpperCase(), contains.toUpperCase()));
        }
        if (length) {
            words = words.filter(word => word.length === parseInt(length));
        } else {
            words = words.filter(word => word.length <= maxWordLength);
        }
    
        // Exclude single-letter words
        words = words.filter(word => word.length > 1);
    
        // If no words match after filtering, show no results message
        if (words.length === 0) {
            // Hide loader and show no results message
            document.getElementById('loader').style.display = 'none';
            document.getElementById('searchStatus').style.display = 'block';
            document.getElementById('searchStatus').innerHTML = `<h2>Oops! Sorry, no words found.</h2><p>Try adding some wildcards or new letters!</p>`;
            return;
        }
    
        // Sorting criteria from select elements
        const sortAlphabet = document.getElementById('sortAlphabet').value;
        const sortBy = document.getElementById('sortBy').value;
    
        // Sort alphabetically
        if (sortAlphabet === 'a-z') {
            words.sort((a, b) => a.localeCompare(b));
        } else if (sortAlphabet === 'z-a') {
            words.sort((a, b) => b.localeCompare(a));
        }
    
        // Sort by points or length
        if (sortBy === 'points') {
            words.sort((a, b) => calculatePoints(b) - calculatePoints(a));
        } else if (sortBy === 'length') {
            words.sort((a, b) => b.length - a.length);
        }
    
        // Group words based on the sortBy criteria
        groupedWords = {};
        words.forEach(word => {
            const points = calculatePoints(word);
            const length = word.length;
    
            if (sortBy === 'points') {
                if (!groupedWords[points]) {
                    groupedWords[points] = [];
                }
                groupedWords[points].push(word);
            } else if (sortBy === 'length') {
                if (!groupedWords[length]) {
                    groupedWords[length] = [];
                }
                groupedWords[length].push(word);
            }
        });
    
        // Reset currentWordCount and initialize
        currentWordCount = {};
        Object.keys(groupedWords).forEach(key => {
            if (!currentWordCount[key]) {
                currentWordCount[key] = 16; // Default to 16 words
            }
        });
    
        // Display results
        displayWords(sortBy);
    }
    
    const displayWords = (sortBy) => {
        const resultDiv = document.getElementById('resultDiv');
        resultDiv.innerHTML = '';
    
        // Sort grouped keys (either points or length)
        const sortedKeys = Object.keys(groupedWords).sort((a, b) => {
            return sortBy === 'points' ? b - a : b.length - a.length;
        });
    
        sortedKeys.forEach((key) => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'result-card w-full bg-white border border-gray-200 mb-5 rounded-lg shadow-md';
    
            const topSection = document.createElement('div');
            topSection.className = 'bg-orange-web text-white rounded-t-lg';
            topSection.innerHTML = `<h2 class="font-bold text-xl p-4 text-left">${sortBy === 'points' ? 'Words with ' + key + ' points' : 'Words of length ' + key}</h2>`;
            wordDiv.appendChild(topSection);
    
            const wordsSection = document.createElement('div');
            wordsSection.className = 'py-8 px-6';
    
            const wordsFlex = document.createElement('div');
            wordsFlex.className = 'flex flex-wrap gap-5';
    
            const countToShow = currentWordCount[key];
            const wordsToShow = groupedWords[key].slice(0, countToShow);
    
            wordsToShow.forEach((word) => {
                const points = calculatePoints(word);
                const wordElement = document.createElement('div');
                wordElement.className = 'relative';
                const pointsSpan = document.createElement('span');
                pointsSpan.className = 'absolute -top-4 -right-4 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full';
                pointsSpan.textContent = points;
    
                const wildcardCount = (contains.match(/\?/g) || []).length;
                const regexPattern = contains.replace(/\?/g, '.');
                const regex = new RegExp(regexPattern, 'gi');
    
                const highlightedWord = word.replace(regex, (match) => {
                    return `<span class="text-orange-500">${match}</span>`;
                });
    
                const wordText = document.createElement('span');
                wordText.className = 'bg-gray-200 text-gray-800 highlighted-text px-4 py-2 rounded-full border border-gray-300 finder-word';
                wordText.innerHTML = highlightedWord;
    
                wordElement.appendChild(pointsSpan);
                wordElement.appendChild(wordText);
                wordsFlex.appendChild(wordElement);
            });
    
            wordsSection.appendChild(wordsFlex);
            wordDiv.appendChild(wordsSection);
    
            if (wordsToShow.length < groupedWords[key].length) {
                const showMoreButton = document.createElement('button');
                showMoreButton.className = 'm-4 p-2 bg-orange-web text-white rounded-full';
                showMoreButton.textContent = 'Show More';
                showMoreButton.onclick = () => {
                    currentWordCount[key] += 16; // Increase count by 16
                    displayWords(sortBy); // Refresh the display with updated count
                };
                wordDiv.appendChild(showMoreButton);
            }
    
            resultDiv.appendChild(wordDiv);
        });
    
        // Hide loader once results are displayed
        document.getElementById('loader').style.display = 'none';
    };
    
    
    
    const matchesPattern = (word, pattern) => {
        const wildcardCount = (pattern.match(/\?/g) || []).length;
        const regexPattern = pattern.replace(/\?/g, '.');
        const regex = new RegExp(regexPattern, 'gi');
        return regex.test(word);
    };
    useEffect(() => {
        // Once wordList is fetched, update results
        if (wordList.length > 0) {
            updateResults();
        }
    }, [wordList]);
    
    useEffect(() => {
      
        
        // Automatically update results when sort options change
        const sortAlphabetSelect = document.getElementById('sortAlphabet');
        const sortBySelect = document.getElementById('sortBy');
    
        const handleChange = () => {
            updateResults(); // Re-trigger the update when the sort options change
        };
    
        sortAlphabetSelect.addEventListener('change', handleChange);
        sortBySelect.addEventListener('change', handleChange);
     
        // Cleanup the event listeners on component unmount
        return () => {
            sortAlphabetSelect.removeEventListener('change', handleChange);
            sortBySelect.removeEventListener('change', handleChange);
           
        };
  
    }, []);
   
    
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
                    <div className="glass-card p-6 rounded-lg shadow-lg max-w-full w-full bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg mb-8">
                        {/* Form Inputs */}
                        <div className="w-full mb-4 flex flex-col lg:flex-row gap-4">
                            <div className="flex flex-col w-full">
                                <label htmlFor="scrabble_letters" className="text-oxford-blue flex items-center mb-1">
                                    Enter Your Letters
                                    <span className="tooltip">
                                        <span className="tooltip-text">Enter your scrambled letters here. You can also add up to 3 wildcards (?) if you wish.</span>
                                        <span className="tooltip-icon">?</span>
                                    </span>
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
                                    <span className="tooltip">
                                        <span className="tooltip-text">Select the dictionary to use for the word search.</span>
                                        <span className="tooltip-icon">?</span>
                                    </span>
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
                                    <span className="tooltip">
                                        <span className="tooltip-text">Find words that start with certain letters (e.g., S ⇒ Sun, ST ⇒ Star).</span>
                                        <span className="tooltip-icon">?</span>
                                    </span>
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
                                    <span className="tooltip">
                                        <span className="tooltip-text">Find words that end with certain letters (e.g., T ⇒ Cat, TH ⇒ Bath).</span>
                                        <span className="tooltip-icon">?</span>
                                    </span>
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
                                    <span className="tooltip">
                                        <span className="tooltip-text">Find words containing certain letters in this order (e.g., A ⇒ Tap, OM ⇒ Stomach).</span>
                                        <span className="tooltip-icon">?</span>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="contains"
                                    name="contains"
                                    placeholder="Contains letters..."
                                    value={contains}
                                    onChange={(e) => {
                                        validateContainsInput(e.target);
                                        setContains(e.target.value);
                                    }}
                                    className="uppercase-input p-3 text-oxford-blue rounded-lg shadow-md"
                                />
                            </div>
                            <div className="flex flex-col w-full lg:w-1/5">
                                <label htmlFor="length" className="text-oxford-blue flex items-center mb-1">
                                    Length
                                    <span className="tooltip">
                                        <span className="tooltip-text">Enter a number to see words with a certain length (e.g., 5 ⇒ 5 letter words, 12 ⇒ 12 letter words).</span>
                                        <span className="tooltip-icon">?</span>
                                    </span>
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
                             onClick={updateResults}
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
            <span className="tooltip">
                <span className="tooltip-text">Choose the sorting order for the results.</span>
                <span className="tooltip-icon">?</span>
            </span>
        </label>
        <select
            id="sortAlphabet"
            value={sortAlphabet}
            onChange={(e) => {
                setSortAlphabet(e.target.value);  // Update the sortAlphabet state
                updateResults();  // Trigger the updateResults function
            }}
            className="w-full p-3 text-oxford-blue rounded-lg shadow-md"
        >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
        </select>
    </div>
    <div className="flex flex-col w-full">
        <label htmlFor="sortBy" className="text-oxford-blue flex items-center mb-1">
            Sort By
            <span className="tooltip">
                <span className="tooltip-text">Choose the criteria to sort the results by.</span>
                <span className="tooltip-icon">?</span>
            </span>
        </label>
        <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => {
                setSortBy(e.target.value);  // Update the sortBy state
                updateResults();  // Trigger the updateResults function
            }}
            className="w-full p-3 text-oxford-blue rounded-lg shadow-md"
        >
            <option value="length">Word Length</option>
            <option value="points">Word Points</option>
        </select>
    </div>
</div>

                    </div>
                    <div id="resultDiv"></div>
                    <div id="searchStatus" className="no-results"></div>
                    <div id="loader" className="laoding" ></div>
                </div>
            </div>
        </main>
    </div>
    );
}
