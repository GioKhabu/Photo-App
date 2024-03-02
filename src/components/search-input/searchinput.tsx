import React, { useState, FormEvent, ChangeEvent } from "react";
import classes from './searchInput.module.css';

interface SearchInputProps {
  setSearchWords: React.Dispatch<React.SetStateAction<string[]>>;
  searchWords: string[];
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchInput({
  setSearchWords,
  searchWords,
  setSearchMode,
}: SearchInputProps) {
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newWords = [...searchWords, searchWord];
    setSearchWords(newWords);
    setSearchWord("");
    setSearchMode(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchWord}
        placeholder="Search images here"
        onChange={handleChange}
      />
    </form>
  );
}