import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./routes/home/home";
import Header from "./components/header/header";
import HistoryPage from "./routes/history/history";
import SearchInput from "./components/search-input/searchinput";
import { FC } from 'react';

const App: FC = () => {
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [searchMode, setSearchMode] = useState<boolean>(false);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Header>
              <SearchInput
                searchWords={searchWords}
                setSearchWords={setSearchWords}
                setSearchMode={setSearchMode}
              />
            </Header>
          }
        >
          <Route
            index
            element={
              <HomePage
                searchWords={searchWords}
                searchMode={searchMode}
                setSearchMode={setSearchMode}
              />
            }
          />
          <Route
            path="/history"
            element={<HistoryPage searchWords={searchWords} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;