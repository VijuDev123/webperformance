import React, {
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import chroma from "chroma-js";

import PrimaryButton from "../components/styled/PrimaryButton";
import backgroundImage from "../assets/search-header.png";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";
import settings from "../settings";

interface SearchBarProps {
  onButtonClick: () => void;
  onChange: (text: string) => void;
  value: string;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export default function SearchBar({
  onChange,
  onButtonClick,
  value,
  suggestions,
  setSuggestions,
  onSuggestionClick,
}: SearchBarProps) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const ref = useRef<HTMLDivElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onButtonClick();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Type assertion to ensure the target is a Node
      const target = event.target as Node;
  
      if (ref.current && !ref.current.contains(target)) {
        setSuggestions([]);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <SearchBarContainer>
      <SearchBarTitle color={settings.colors.background}>Welcome.</SearchBarTitle>
      <SearchBarSubTitle color={settings.colors.background}>
        Millions of movies, TV shows and people to discover. Explore now.
      </SearchBarSubTitle>
      <SearchWrapper>
        <SearchInputWrapper>
          <SearchInput
            id="search-bar-input"
            data-testid="search-input"
            $color={theme.foreground}
            $backgroundColor={theme.background}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search for a movie, tv show, person......"
            onKeyDownCapture={(event) => {
              onChange(event.currentTarget.value);
            }}
          ></SearchInput>
          {suggestions.length > 0 && (
            <SuggestionContainer ref={ref}>
              {suggestions.map((suggestion: string) => (
                <Suggestion
                  onClick={(() => (onSuggestionClick(suggestion)))}
                  key={suggestion}
                >
                  {suggestion}
                </Suggestion>
              ))}
            </SuggestionContainer>
          )}
        </SearchInputWrapper>
        <SearchButton onClick={onButtonClick} data-testid="search-button">
          Search
        </SearchButton>
      </SearchWrapper>
    </SearchBarContainer>
  );
}

const Suggestion = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  font-weight: 300;
  padding-bottom: 7px;
  padding-top: 7px;
  padding-left: 10px;
  &:hover {
    cursor: pointer;
    background-color: ${settings.colors.info};
    color: white;
  }
`;

const SuggestionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  top: 40px;
  width: calc(100% - 10px);
  border-radius: 5px;
  border: 1px solid grey;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  height: 300px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-image: url("${backgroundImage}");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const SearchBarTitle = styled.h2`
  font-size: 3em;
  font-weight: 700;
  line-height: 1;
  color: ${(props) => props.color};
  margin-bottom: 10px;
`;

const SearchBarSubTitle = styled.h3`
  font-size: 1.8em;
  font-weight: 500;
  margin: 0;
  color: ${(props) => props.color};
  margin-bottom: 40px;
`;

interface SearchInputProps {
  $backgroundColor: string;
  $color: string;
}

const SearchInput = styled.input<SearchInputProps>`
  display: flex;
  border-radius: 0px;
  border-width: 1px;
  height: 40px;
  flex-grow: 1;
  padding: 0px;
  margin-right: 10px;
  padding-left: 10px;
  font-size: 1rem;
  color: ${(props) => props.$color};
  font-weight: 300;
  background-color: ${(props) => props.$backgroundColor};
  border-color: ${(props) => props.$color};
  :focus-visible {
    outline: none;
    border-color: ${chroma("#6c5ce7").saturate().hex()};
  }
`;

const SearchButton = styled.button`
  height: 40px;
  display: flex;
  width: 200px;
  background-color: ${settings.colors.info};
  border-color: ${settings.colors.info};
  color: ${settings.colors.backgroundSecondary};
  font-weight: 700;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${chroma(settings.colors.foreground).alpha(0.3).css()};
  border-radius: 4px;
  &:hover {
    background-color: ${settings.colors.info};
    border-color: ${chroma(settings.colors.foreground).alpha(0.1).css()};
    cursor: pointer;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;
