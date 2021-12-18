import './App.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetCityDetailsQuery } from './Services/weatherApi';

import Databox from './Databox/Databox';
import { cityList } from './Data/CityList';

function App() {
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [cityDetails, setCityDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const dropdownRef = useRef();
  const inputRef = useRef();

  // on every setState it is called
  // onEdit change
  // on debounce results filter's setFilteredList change
  // learnt skip token to avoid unnecessary calls
  const {
    data: cityData,
    isFetching,
    isError,
  } = useGetCityDetailsQuery(shouldFetch ? selectedCity : skipToken);

  if (!isFetching && shouldFetch) {
    setShouldFetch(false);
    setCityDetails(cityData);
    // console.log(selectedCity, ' fetched');
    // console.log('error : ', isError);
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditMode(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [editMode]);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const textChangeFunction = useCallback(
    function () {
      let newList = cityList.filter((c) =>
        c.toLowerCase().includes(inputRef.current.value.toLowerCase())
      );
      newList = newList.splice(0, Math.min(newList.length, 4));
      setFilteredCities(newList);
      // console.log('filtered');
    },
    [inputRef]
  );

  return (
    <div className="App">
      <div className="input-area">
        {editMode ? (
          <div ref={dropdownRef} className="dropdown-wrapper">
            <input
              ref={inputRef}
              className="dropdown-input"
              name="dropdown-input"
              autoFocus
              onChange={debounce(textChangeFunction, 600)}
            />

            <div className="dropdown-list">
              <ul>
                {filteredCities.map((city, index) => {
                  return (
                    <li
                      key={index.toString()}
                      onClick={() => {
                        setSelectedCity(city);
                        setEditMode(false);
                      }}
                    >
                      {city}
                    </li>
                  );
                })}
                {filteredCities.length === 0 && (
                  <li className="no-result">---</li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <input
            className={`dropdown-search ${!selectedCity && 'default'}`}
            onClick={() => setEditMode(true)}
            onFocus={() => setEditMode(true)}
            value={selectedCity || 'Enter and Select City'}
            onChange={() => {}}
          />
        )}

        <button
          className="search-btn"
          onClick={() => {
            if (!selectedCity) {
              alert('Please select city!!!');
            } else {
              setShouldFetch(true);
            }
          }}
        >
          Search
        </button>
      </div>
      <Databox
        cityDetails={cityDetails}
        isFetching={isFetching}
        isError={isError}
      />
    </div>
  );
}

export default App;
