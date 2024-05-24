import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import { FaSearch } from 'react-icons/fa'

interface AutocompleteProps {
  suggestions: string[]
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  placeholder,
  value,
  onChange
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value
    const filtered = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    )

    setActiveSuggestionIndex(0)
    setFilteredSuggestions(filtered)
    setShowSuggestions(true)
    onChange(input)
  }

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    onChange(e.currentTarget.innerText)
    setFilteredSuggestions([])
    setActiveSuggestionIndex(0)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      // Enter key
      onChange(filteredSuggestions[activeSuggestionIndex])
      setActiveSuggestionIndex(0)
      setShowSuggestions(false)
    } else if (e.keyCode === 38) {
      // Up arrow
      if (activeSuggestionIndex === 0) {
        return
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1)
    } else if (e.keyCode === 40) {
      // Down arrow
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1)
    }
  }

  return (
    <div className="relative w-full h-11" ref={suggestionsRef}>
      <div className="flex items-center border border-gray-300 rounded-md">
        <FaSearch className="text-gray-500 mx-2" />
        <input
          type="text"
          className="h-11 px-2 w-full border-none focus:ring-0"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={value}
          placeholder={placeholder ? placeholder : 'Search...'}
        />
      </div>
      {showSuggestions && value && (
        <ul className="absolute border border-gray-300 bg-white rounded-md shadow-lg mt-1 w-full max-h-60 overflow-y-auto z-10">
          {filteredSuggestions.length ? (
            filteredSuggestions.map((suggestion, index) => {
              let className
              if (index === activeSuggestionIndex) {
                className = 'bg-gray-500 text-white'
              } else {
                className = 'hover:bg-gray-200'
              }
              return (
                <li
                  className={`p-2 cursor-pointer ${className}`}
                  key={suggestion}
                  onClick={handleClick}
                >
                  {suggestion}
                </li>
              )
            })
          ) : (
            <li className="p-2 text-gray-700">No suggestions available.</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Autocomplete
