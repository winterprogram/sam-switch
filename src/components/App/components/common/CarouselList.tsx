import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Tizen from "../../../../assets/icons/galaxy_store_1.png";
import Wear from "../../../../assets/icons/goggleplay_1.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const CarouselList = ({ data, onclick, selectedType, theme }: any) => {
  const [images, setImages] = useState([]),
    [os, setOs] = useState<string[]>([""]);
  useEffect(() => {
    const arr: any = [];
    if (selectedType === "wear") {
      setOs(["wear"]);
      data?.wear_images?.map((i: any) =>
        arr.push({ url: i.image_url, alt: i?.sku, title: "Wear" })
      );
    } else if (selectedType === "tizen") {
      setOs(["tizen"]);
      data?.tizen_images?.map((i: any) =>
        arr.push({ url: i.image_url, alt: i?.sku, title: "Tizen" })
      );
    } else {
      setOs(data?.os);
      if (data?.wear_images && data?.wear_images.length > 0) {
        data?.wear_images?.map((i: any) =>
          arr.push({ url: i.image_url, alt: i?.sku, title: "Wear" })
        );
      }
      if (data?.tizen_images && data?.tizen_images.length > 0) {
        data?.tizen_images?.map((i: any) =>
          arr.push({ url: i.image_url, alt: i?.sku, title: "Tizen" })
        );
      }
    }
    setImages(arr);
  }, [data, selectedType]);

  return (
    <div
      className={`${
        theme ? "themeCrousel" : "watchCrousel"
      } relative justify-center flex-shrink-0`}
    >
      {images.length ? (
        <Carousel
          showThumbs={false}
          showStatus={false}
          swipeable={false}
          showIndicators={images?.length < 2 ? false : true}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                className={`absolute hidden sm:block rounded-full bg-gray-800 opacity-60 z-10 text-white top-[calc(50%-10px)] md:top-[calc(50%-12px)] w-5 md:w-6 left-1 ${
                  theme && "lg:top-[calc(50%-1rem)] lg:w-8 lg:left-2"
                }`}
                type="button"
                onClick={onClickHandler}
              >
                <ChevronLeftIcon className="-ml-0.5" />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                className={`absolute hidden sm:block rounded-full bg-gray-800 opacity-60 z-10 text-white top-[calc(50%-10px)] md:top-[calc(50%-12px)] w-5 md:w-6 right-1 ${
                  theme && "lg:top-[calc(50%-1rem)] lg:w-8 lg:right-2"
                }`}
                type="button"
                onClick={onClickHandler}
              >
                <ChevronRightIcon className="-mr-0.5" />
              </button>
            )
          }
        >
          {images?.map((item: any) => {
            return (
              <div
                className="-ml-8 -mt-4 hover:bg-black content-center flex-shrink-0 hover:cursor-pointer"
                onClick={() => {
                  onclick(data);
                }}
              >
                <img
                  src={item?.url}
                  className={`object-contain w-[calc(33.33vw-1.5rem)] sm:w-[calc(25vw-2.25rem)] md:w-[7.75rem] h-[calc(33.33vw-1.5rem)] sm:h-[calc(25vw-2.25rem)] md:h-[calc(20vw-2rem)] ${
                    theme
                      ? "lg:w-[calc(25vw-3.625rem)] 2xl:w-[calc(21rem-30px)] lg:h-[calc(25vw-3.625rem)] 2xl:h-[calc(21rem-30px)]"
                      : "lg:w-[calc(16.66vw-1.83rem)] xl:w-[calc(14.3vw-2.7rem)] 2xl:w-[calc(10.5rem-15px)] lg:h-[calc(16.66vw-1.83rem)] xl:h-[calc(14.3vw-2.7rem)] 2xl:h-[calc(10.5rem-15px)]"
                  }`}
                  alt={item?.alt}
                />
              </div>
            );
          })}
        </Carousel>
      ) : undefined}

      <div
        className={`absolute lg:top-2 sm:top-1 top-0.5 flex flex-row gap-2 ${
          theme
            ? "right-0.5 sm:right-1 lg:right-2"
            : "left-0.5 sm:left-1 lg:left-2"
        }`}
      >
        <img
          className={`${
            os?.includes("wear") ? "" : "hidden"
          } h-5 sm:h-6 lg:h-7`}
          src={Wear}
          alt=""
        />
        <img
          className={`${
            os?.includes("tizen") ? "" : "hidden"
          } h-5 sm:h-6 lg:h-7`}
          src={Tizen}
          alt=""
        />
      </div>
      <div
        className={`text-white text-center break-words mt-3 text-xs lg:text-sm hover:cursor-default mb-1 w-[calc(33.33vw-1.5rem)] sm:w-[calc(25vw-2.25rem)] md:w-[calc(20vw-2rem)] ${
          theme
            ? "lg:w-[calc(25vw-3.625rem)] 2xl:w-[calc(21rem-30px)]"
            : "lg:w-[calc(16.66vw-1.83rem)] xl:w-[calc(14.3vw-2.7rem)] 2xl:w-[calc(10.5rem-15px)]"
        }`}
      >
        {data?.name}
      </div>
    </div>
  );
};

export default CarouselList;
