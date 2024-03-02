import classes from "./photoModal.module.css";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "../../utils/helpers";

interface PhotoModalProps {
  setPhotoID: (id: string) => void;
  photoID: string;
  setModalUrl: (url: string) => void;
  modalUrl: string;
  setModalTitle: (title: string) => void;
  modalTitle: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  setPhotoID,
  photoID,
  setModalUrl,
  modalUrl,
  setModalTitle,
  modalTitle,
}) => {
  const endpoint = `https://api.unsplash.com/photos/${photoID}/statistics?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

  const { data: fetchedData, error: dataError, isLoading } = useSWR(endpoint, fetcher);

  useEffect(() => {
    if (dataError) {
      console.error("Error fetching data:", dataError);
    }
  }, [dataError]);

  return (
    <div
      className={classes.photomodalBackground}
      onClick={() => {
        setPhotoID("");
        setModalUrl("");
        setModalTitle("");
      }}
    >
      <div className={classes.modalWrapper}>
        <div className={classes.photoContainer}>
          <img className={classes.photo} src={modalUrl} alt={modalTitle} />
        </div>
        {isLoading && <p className={classes.loading}>Loading ...</p>}
        <div className={classes.dataWrapper}>
          <h2>
            Likes: <span>{fetchedData?.likes.total}</span>
          </h2>
          <h2>
            Views: <span>{fetchedData?.views.total}</span>
          </h2>
          <h2>
            Downloads: <span>{fetchedData?.downloads.total}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;