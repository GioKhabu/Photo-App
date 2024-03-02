import React, { useState, useEffect, useRef, useId } from "react";
import useSWR from "swr";
import SearchedWords from "../../components/searched-words/searchWords";
import classes from "./history.module.css";
import GalleryImage from "../../components/gallery-image/galleryImage";
import PhotoModal from "../../components/photo-modal/photoModal";
import { fetcher } from "../../utils/helpers";

interface HistoryPageProps {
  searchWords: string[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({ searchWords }) => {
  const [page, setPage] = useState(1);
  const [endOfPage, setEndOfPage] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [photoID, setPhotoID] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [searchWord, setSearchWord] = useState("");
  const endOfpage = useRef<HTMLDivElement>(null);

  const id = useId();
  const uniqueId = useId();

  const uniqueSearchWords = Array.from(new Set(searchWords));

  const endpoint =
    searchWord &&
    `https://api.unsplash.com/search/photos?page=${page}&query=${searchWord}&per_page=20&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

  const { data: fetchedData, error, isLoading } = useSWR(endpoint, fetcher);

  useEffect(() => {
    if (fetchedData && searchWord.length > 0) {
      setData((prevData) => [...prevData, ...fetchedData.results]);
    }
  }, [fetchedData, searchWord]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEndOfPage(entry.isIntersecting);
      },
      { threshold: 1 }
    );

    if (endOfpage.current) {
      observer.observe(endOfpage.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (endOfPage && !error) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [endOfPage, error]);

  return (
    <main className={classes.historyContainer}>
      <section className={classes.searchWordContainer}>
        {uniqueSearchWords.length > 0 ? (
          <p className={classes.searchTitle}>
            Search by words from your search history:
          </p>
        ) : (
          <p className={classes.searchTitle}>
            Search history is empty. Try to search from Home page and come back again!
          </p>
        )}

        <div className={classes.searchWordsWrapper}>
          {uniqueSearchWords.map((item, index) => {
            return (
              <SearchedWords
                key={`${id}-${index}`}
                name={item}
                setSearchWord={setSearchWord}
                setData={setData}
              />
            );
          })}
        </div>
      </section>
      <section className={classes.photoSection}>
        {data.map((item, index) => (
          <GalleryImage
            key={`${item.id}-${uniqueId}-${index}`}
            id={item.id}
            title={item.alt_description}
            url={item.urls.regular}
            setPhotoID={setPhotoID}
            setModalUrl={setModalUrl}
            setModalTitle={setModalTitle}
          />
        ))}
        {isLoading && <p className={classes.loading}>Loading ...</p>}
      </section>
      {photoID && (
        <PhotoModal
          setPhotoID={setPhotoID}
          photoID={photoID}
          setModalUrl={setModalUrl}
          modalUrl={modalUrl}
          setModalTitle={setModalTitle}
          modalTitle={modalTitle}
        />
      )}
      <div ref={endOfpage}></div>
    </main>
  );
};

export default HistoryPage;