import classes from "./searchWords.module.css";

interface Props {
  name: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchedWords: React.FC<Props> = ({ name, setSearchWord, setData }) => {
  return (
    <button
      className={classes.button}
      onClick={() => {
        setSearchWord(name);
        setData([]);
      }}
    >
      {name}
    </button>
  );
};

export default SearchedWords;