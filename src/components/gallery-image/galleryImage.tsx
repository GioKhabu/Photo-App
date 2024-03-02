import classes from "./galleryImage.module.css";

interface GalleryImageProps {
  url: string;
  title: string;
  id: string;
  setPhotoID: (id: string) => void;
  setModalUrl: (url: string) => void;
  setModalTitle: (title: string) => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({
  url,
  title,
  id,
  setPhotoID,
  setModalUrl,
  setModalTitle,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setPhotoID(id);
    setModalUrl(url);
    setModalTitle(title);
  };

  return (
    <div className={classes.imageWrapper} onClick={handleClick}>
      <img src={url} alt={title} id={id} />
    </div>
  );
};

export default GalleryImage;