'use client';

import Sections from "@/components/Sections";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const WordFinder = ({ pageData }) => {
   
  const router = useRouter(); // Initialize useRouter
  const [scrabbleInput, setScrabbleInput] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [length, setLength] = useState("");
  const [dictionary, setDictionary] = useState("us");

  const handleSubmit = (event) => {
      event.preventDefault();
      // Construct query string
      const query = new URLSearchParams({
          scrabbleInput,
          startsWith,
          endsWith,
          contains,
          length,
          dictionary
      }).toString();

      // Redirect to results page with query parameters
      router.push(`/results?${query}`);
  };

  const handleScrabbleInputChange = (e) => {
      let newValue = e.target.value.toUpperCase();
      let questionMarkCount = (newValue.match(/\?/g) || []).length;

      if (questionMarkCount < 3) {
          let remainingSpaces = 3 - questionMarkCount;
          newValue = newValue.replace(/\s/g, (match) => (remainingSpaces-- > 0 ? '?' : ''));
      } else {
          newValue = newValue.replace(/\s/g, '');
      }

      const limitQuestionMarks = (str) => {
          let count = 0;
          return str.replace(/\?/g, (match) => (count++ < 3 ? '?' : ''));
      };

      setScrabbleInput(limitQuestionMarks(newValue));
  };

  const handleContainsChange = (e) => {
      let newValue = e.target.value.toUpperCase();
      let questionMarkCount = (newValue.match(/\?/g) || []).length;

      newValue = newValue.replace(/\s/g, (match) => (questionMarkCount < 3 ? '?' : ''));

      const limitQuestionMarks = (str) => {
          let count = 0;
          return str.replace(/\?/g, (match) => (count++ < 3 ? '?' : ''));
      };

      setContains(limitQuestionMarks(newValue));
  };

  const [sections, setSections] = useState([]);

  return (
    <>
    
    <main className="hero relative h-[75vh]">
      <div className="mobile-screen-shape"></div>

      <div className="relative z-10 px-4 sm:px-6 mb-12 md:px-6 xs:px-6 flex flex-col items-center w-full max-w-screen-lg h-full justify-center">
        <div className="text-center mb-2">
          <h1 className="text-5xl font-bold mb-2">{pageData.hero_title}</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-lg mx-auto">
          {pageData.hero_text}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-4 px-8 rounded-lg shadow-lg max-w-xl w-full bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg"
        >
          <div className="mb-1">
            <label htmlFor="scrabbleInput" className="flex items-center">
              Enter your letters
              <span className="tooltip">
                <span className="tooltip-text">
                  Enter your letters here. You can also add up to 3 wildcards
                  (?) if you wish.
                </span>
                <span className="tooltip-icon">?</span>
              </span>
            </label>
            <input
              id="scrabbleInput"
              type="text"
              name="scrabble_letters"
              placeholder="Enter your Scrabble letters..."
              value={scrabbleInput}
              onChange={handleScrabbleInputChange}
              className="w-full p-3 sm:p-4 text-oxford-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-web transition duration-300 transform shadow-md uppercase-input"
            />
          </div>

          <div className="flex flex-row gap-4 mb-1">
            <div className="flex flex-col w-full">
              <label htmlFor="starts" className="flex items-center">
                Starts With
                <span className="tooltip">
                  <span className="tooltip-text">
                    Find words that start with certain letters (e.g., S ⇒
                    Sun, ST ⇒ Star).
                  </span>
                  <span className="tooltip-icon">?</span>
                </span>
              </label>
              <input
                type="text"
                id="starts"
                name="starts"
                placeholder="A"
                value={startsWith}
                onChange={(e) => setStartsWith(e.target.value)}
                className="w-full p-3 sm:p-4 text-oxford-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-web transition duration-300 uppercase-input transform shadow-md"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="ends" className="flex items-center">
                Ends With
                <span className="tooltip">
                  <span className="tooltip-text">
                    Find words that end with certain letters (e.g., T ⇒ Cat,
                    TH ⇒ Bath).
                  </span>
                  <span className="tooltip-icon">?</span>
                </span>
              </label>
              <input
                type="text"
                id="ends"
                name="ends"
                placeholder="Z"
                value={endsWith}
                onChange={(e) => setEndsWith(e.target.value)}
                className="w-full p-3 sm:p-4 text-oxford-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-web transition duration-300 transform uppercase-input shadow-md"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 mb-1">
            <div className="flex flex-col w-full">
              <label htmlFor="contains" className="flex items-center">
                Contains
                <span className="tooltip">
                  <span className="tooltip-text">
                    Find words containing certain letters in this order (e.g.,
                    A ⇒ Tap, OM ⇒ Stomach).
                  </span>
                  <span className="tooltip-icon">?</span>
                </span>
              </label>
              <input
                type="text"
                id="contains"
                name="contains"
                placeholder="A_Z"
                value={contains}
                onChange={handleContainsChange}
                className="w-full p-3 sm:p-4 text-oxford-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-web transition duration-300 uppercase-input transform shadow-md"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="length" className="flex items-center">
                Word Length
                <span className="tooltip">
                  <span className="tooltip-text">
                    Enter a number to see words with a certain length (e.g.,
                    5 ⇒ 5 letter words, 12 ⇒ 12 letter words).
                  </span>
                  <span className="tooltip-icon">?</span>
                </span>
              </label>
              <input
                type="number"
                id="length"
                name="length"
                placeholder="5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min="1"
                max="15"
                className="w-full p-3 sm:p-4 text-oxford-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-web transition duration-300 uppercase-input transform shadow-md"
              />
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="dictionary" className="flex items-center">
              Choose Dictionary
              <span className="tooltip">
                <span className="tooltip-text">Select a dictionary to use.</span>
                <span className="tooltip-icon">?</span>
              </span>
            </label>
            <select
              id="dictionary"
              name="dictionary"
              value={dictionary}
              onChange={(e) => setDictionary(e.target.value)}
              className="w-full p-3 sm:p-4 text-oxford-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-web transition duration-300 transform shadow-md"
            >
              <option value="uk">Scrabble UK</option>
              <option value="us">Scrabble US</option>
              <option value="wwf">Words with Friends</option>
            </select>
          </div>

          <button
            type="submit"
            className="button-orange w-full mt-4 mb-1 p-3 sm:p-4 bg-orange-web text-black font-bold rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-web shadow-lg"
          >
            Find Words
          </button>
        </form>
      </div>
    </main>
      <Sections sections={sections} />
    </>
  );
};

export default WordFinder;
