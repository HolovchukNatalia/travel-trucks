import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import css from "./ImageGallery.module.css";

const ImageGallery = ({ gallery, camperName }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const openModal = (index) => {
    setInitialSlide(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  if (!gallery || gallery.length === 0) {
    return (
      <div className={css.noImages}>
        <p>No images available</p>
      </div>
    );
  }

  const validImages = gallery.filter(
    (image, index) => image.original && !imageErrors[index]
  );

  if (validImages.length === 0) {
    return (
      <div className={css.noImages}>
        <p>Images could not be loaded</p>
      </div>
    );
  }

  const displayImages = validImages.slice(0, 4);

  return (
    <>
      <div className={css.imageGallery}>
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={css.imageContainer}
            onClick={() => openModal(index)}
          >
            <img
              src={image.original}
              alt={`${camperName} - Image ${index + 1}`}
              className={css.image}
              onError={() => handleImageError(gallery.indexOf(image))}
            />
            {validImages.length > 4 && index === 4 && (
              <div className={css.moreImagesOverlay}>
                <span>+{validImages.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={css.modal} onClick={closeModal}>
          <div
            className={css.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={css.closeButton} onClick={closeModal}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <Swiper
              modules={[Navigation, Pagination, Keyboard, Mousewheel]}
              initialSlide={initialSlide}
              spaceBetween={0}
              navigation={{
                nextEl: ".modal-swiper-button-next",
                prevEl: ".modal-swiper-button-prev",
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              keyboard={{
                enabled: true,
              }}
              mousewheel={{
                forceToAxis: true,
              }}
              loop={validImages.length > 1}
              className={css.modalSwiper}
              grabCursor={true}
            >
              {validImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className={css.modalSlide}>
                    <img
                      src={image.original}
                      alt={`${camperName} - Image ${index + 1}`}
                      className={css.modalImage}
                    />
                  </div>
                </SwiperSlide>
              ))}

              {validImages.length > 1 && (
                <>
                  <div className="modal-swiper-button-prev">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="modal-swiper-button-next">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              )}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
