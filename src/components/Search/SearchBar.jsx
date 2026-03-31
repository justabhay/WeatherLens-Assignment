import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiStar, FiX } from 'react-icons/fi';
import { searchCities } from '../../services/weatherApi';
import { addFavorite } from '../../store/favoritesSlice';
import { fetchCityWeather } from '../../store/weatherSlice';
import { getCityId } from '../../utils/helpers';
import { SEARCH_DEBOUNCE_MS } from '../../utils/constants';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites } = useSelector((state) => state.favorites);

  
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchCities(searchQuery);
      const mapped = data.map((item) => ({
        name: item.name,
        country: item.country,
        state: item.state || '',
        lat: item.lat,
        lon: item.lon,
        id: getCityId(item.lat, item.lon),
        isFavorite: favorites.some(
          (f) => getCityId(f.lat, f.lon) === getCityId(item.lat, item.lon)
        ),
      }));
      setResults(mapped);
      setIsOpen(mapped.length > 0);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, performSearch]);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    
    dispatch(fetchCityWeather({
      lat: city.lat,
      lon: city.lon,
      name: city.name,
      country: city.country,
    }));

    
    navigate(`/city/${city.lat}/${city.lon}`);

    
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="search" id="city-search">
      <div className={`search__input-wrapper ${isOpen ? 'search__input-wrapper--active' : ''}`}>
        <FiSearch className="search__icon" size={16} />
        <input
          ref={inputRef}
          type="text"
          className="search__input"
          placeholder="Search cities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          id="search-input"
          autoComplete="off"
          aria-label="Search for a city"
          aria-expanded={isOpen}
          role="combobox"
        />
        {isLoading && (
          <div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
        )}
        {query && !isLoading && (
          <button className="search__clear" onClick={clearSearch} title="Clear search">
            <FiX size={14} />
          </button>
        )}
      </div>

      {}
      {isOpen && (
        <div className="search__dropdown animate-fade-in-up" ref={dropdownRef} role="listbox">
          {results.map((city, index) => (
            <button
              key={city.id}
              className={`search__result ${index === selectedIndex ? 'search__result--selected' : ''}`}
              onClick={() => handleSelect(city)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
              id={`search-result-${index}`}
            >
              <FiMapPin className="search__result-icon" size={14} />
              <div className="search__result-info">
                <span className="search__result-name">{city.name}</span>
                <span className="search__result-meta">
                  {city.state ? `${city.state}, ` : ''}{city.country}
                </span>
              </div>
              {city.isFavorite && (
                <FiStar className="search__result-fav" size={14} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
