import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const CarouselListStudio = ({ data, index }: any) => {
  let check;
  if (index % 2 === 0) check = true;
  else check = false;
  return (
    <div
      className={clsx(
        "mx-auto px-5 w-fit flex items-center justify-between h-fit lg:min-h-[25rem] xl:min-h-[28rem] max-w-[44rem] md:max-w-[52rem] lg:max-w-[56rem] xl:max-w-[64rem]",
        check
          ? "flex-col lg:flex-row xl:flex-row"
          : "flex-col lg:flex-row-reverse xl:flex-row-reverse"
      )}
    >
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={data?.images?.length < 2 ? false : true}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              className="absolute top-36 md:top-44 lg:top-48 xl:top-56 left-2 rounded-full bg-gray-800 opacity-60 w-8 z-10 text-white"
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
              className="absolute top-36 md:top-44 lg:top-48 xl:top-56 right-2 rounded-full bg-gray-800 opacity-60 w-8 z-10 text-white"
              type="button"
              onClick={onClickHandler}
            >
              <ChevronRightIcon className="-mr-0.5" />
            </button>
          )
        }
        autoPlay={true}
        infiniteLoop={true}
        interval={2500}
      >
        {data?.images?.map((item: any, index: any) => {
          return (
            <div
              onClick={() => {
                window.open(data?.link);
              }}
              className="py-0 -ml-8 hover:bg-black hover:cursor-pointer"
              key={index}
            >
              <img
                className="object-contain max-w-[20rem] md:max-w-[24rem] lg:w-[27rem] xl:w-[30rem] lg:h-[25rem] xl:h-[28rem]"
                src={item.image_url}
                alt=""
              />
            </div>
          );
        })}
      </Carousel>
      <div className="flex items-center justify-center p-1.5 pt-5 lg:pt-1.5 max-w-[20rem] md:max-w-[24rem] lg:min-w-[27rem] xl:min-w-[30rem] lg:max-w-[27rem] xl:max-w-[30rem] text-white text-xs sm:text-sm md:text-md 2xl:text-lg">
        <p style={{ whiteSpace: "pre-wrap" }} className=" text-center">
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default CarouselListStudio;
