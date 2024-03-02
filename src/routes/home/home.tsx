import React, { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import GalleryImage from "../../components/gallery-image/galleryImage";
import classes from "./home.module.css"; // Import CSS module
import PhotoModal from "../../components/photo-modal/photoModal";
import { fetcher } from "../../utils/helpers";

interface Props {
  searchWords: string[];
  searchMode: boolean;
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HomePage({ searchWords, searchMode, setSearchMode }: Props) {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [endOfPage, setEndOfPage] = useState<boolean>(false);
  const [photoID, setPhotoID] = useState<string>("");
  const [modalUrl, setModalUrl] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  const uniqueId = useRef<number>(0);
  const endOfpage = useRef<HTMLDivElement>(null);

  const endpoint = searchWords.length > 0
    ? `https://api.unsplash.com/search/photos?page=${page}&query=${searchWords[searchWords.length - 1]}&per_page=20&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
    : `https://api.unsplash.com/photos?page=${page}&per_page=20&order_by=popular&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

  const { data: fetchedData, error, isLoading } = useSWR(endpoint, fetcher);

  useEffect(() => {
    if (searchMode) {
      setData([]);
      setSearchMode(false);
    }
  }, [searchMode, setSearchMode]);

  useEffect(() => {
    if (fetchedData) {
      setData(prevData => searchWords.length === 0 ? [...prevData, ...fetchedData] : [...prevData, ...fetchedData.results]);
    }
  }, [fetchedData, searchWords]);

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
  }, [endOfpage]);

  useEffect(() => {
    if (endOfPage && !error) {
      setPage(prevPage => prevPage + 1);
    }
  }, [endOfPage, error]);

  return (
    <>
      <main className={classes.main}>
        <section className={classes.photoSection}>
          {data.map((item, index) => (
            <GalleryImage
              key={`${item.id}-${uniqueId.current}-${index}`}
              id={item.id}
              title={item.alt_description}
              url={item.urls.regular}
              setPhotoID={setPhotoID}
              setModalUrl={setModalUrl}
              setModalTitle={setModalTitle}
            />
          ))}
        </section>
        {isLoading && <p className={classes.loading}>Loading ...</p>}
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
      </main>
      <div ref={endOfpage}></div>
    </>
  );
}