import { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_SAM_SWITCH } from "../../../../service/apiEndPoints";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import { SAM_TYPES } from "../../utils/constants";
import { Pagination, ThemeName } from "../../utils/enums";
import CarouselList from "../common/CarouselList";
import CouponPopup from "../common/CouponPopup";
import { LoadMore } from "../common/LoadMore";
import { NoData } from "../common/NoData";
import { Navigation } from "../NavigationBar";
import Tizen from "../../../../assets/icons/galaxy_store_2.png";
import activeTizen from "../../../../assets/icons/galaxy_store_1.png";
import Wear from "../../../../assets/icons/goggleplay_2.png";
import activeWear from "../../../../assets/icons/goggleplay_1.png";

export const FSamWatch = () => {
  const [data, setData] = useState([] as any);
  const [pagination, setPagination] = useState<Pagination>({
    column: "",
    limit: 18,
    offset: 0,
    order: "created_at",
    page: 1,
    query: "",
    sort: "ASC",
    total: 1,
    total_page: 1,
  });
  const [selectedType, setSelectedType] = useState(SAM_TYPES.ALL);
  const [loading, setLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoader(true);
    setPage(1);
    const URL = GET_SAM_SWITCH.replace(":type", "watch")
      .replace(":limit", "40")
      .replace(":page", "1")
      .replace(":os", selectedType === "all" ? "" : selectedType)
      .replace(":name_sku", "");
    apiCall(
      URL,
      {},
      (res: any) => {
        if (res?.success) {
          setData(res?.data);
          setPagination(res?.pagination);
          setLoader(false);
        } else {
          if (res?.data?.message === "record not found") {
            setData([]);
            setLoader(false);
          }
        }
      },
      (err: any) => {
        console.log(err);
        setLoader(false);
        toast.error("something went wrong!");
      },
      METHOD.GET,
      {}
    );
  }, [selectedType]);

  const loadMore = () => {
    const URL = GET_SAM_SWITCH.replace(":type", "watch")
      .replace(":limit", "40")
      .replace(":page", (page + 1).toString())
      .replace(":os", selectedType === "all" ? "" : selectedType)
      .replace(":name_sku", "");
    apiCall(
      URL,
      {},
      (res: any) => {
        if (res?.success) {
          const newData = [...data, ...res?.data];
          setData(newData);
          setPagination(res?.pagination);
        }
      },
      (err: any) => {
        console.log(err);
      },
      METHOD.GET,
      {}
    );
  };

  return (
    <div className={`bg-black w-screen`}>
      <Navigation name={ThemeName.SAM_WATCH} />
      <div>
        <ul className="flex flex-wrap mt-2 text-sm font-normal md:font-medium text-center text-gray-500 dark:text-gray-400 justify-center">
          <li className="hover:bg-black pb-1 items-center px-1.5 md:px-4">
            <button
              className={`inline-block py-1 h-fit md:py-3 px-2 md:px-4 text-white rounded-full ${
                selectedType === SAM_TYPES.ALL
                  ? "bg-white text-black"
                  : " bg-[#6d6d6d] hover:bg-white hover:text-black"
              }`}
              onClick={() => {
                setSelectedType(SAM_TYPES.ALL);
              }}
            >
              All
            </button>
          </li>
          <li className="hover:bg-black pb-1 px-1.5 md:px-4">
            <img
              className={`inline-block py-1 h-10 md:h-11 hover:cursor-pointer`}
              onClick={() => {
                setSelectedType(SAM_TYPES.WEAR);
              }}
              onMouseOver={(e) => (e.currentTarget.src = activeWear)}
              onMouseOut={(e) =>
                (e.currentTarget.src =
                  selectedType === SAM_TYPES.WEAR ? activeWear : Wear)
              }
              src={selectedType === SAM_TYPES.WEAR ? activeWear : Wear}
              alt=""
            />
          </li>
          <li className="hover:bg-black pb-1 px-1.5 md:px-4">
            <img
              className={`inline-block py-1 h-10 md:h-11 rounded-full hover:cursor-pointer`}
              onClick={() => {
                setSelectedType(SAM_TYPES.TIZEN);
              }}
              onMouseOver={(e) => (e.currentTarget.src = activeTizen)}
              onMouseOut={(e) =>
                (e.currentTarget.src =
                  selectedType === SAM_TYPES.TIZEN ? activeTizen : Tizen)
              }
              src={selectedType === SAM_TYPES.TIZEN ? activeTizen : Tizen}
              alt=""
            />
          </li>
        </ul>
        {loading ? (
          <div className="h-[calc(100vh-192px)] md:h-[calc(100vh-200px)] mt-14 animate-pulse flex flex-row justify-center py-0 md:py-4 text-white">
            <svg
              aria-hidden="true"
              className="mr-2 h-14 w-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : !data.length ? (
          <NoData />
        ) : (
          <div className="h-[calc(100vh-136px)] md:h-[calc(100vh-144px)] overflow-y-auto">
            <div className="mx-6 sm:mx-12 xl:mx-20 2xl:mx-auto mt-5 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 sm:gap-4 xl:gap-6 mb-[50px] w-fit">
              {data.map((item: any, index: Key) => {
                return (
                  <CarouselList
                    key={index}
                    onclick={(e: any) => {
                      setProduct(item);
                      setIsOpen(true);
                    }}
                    selectedType={selectedType}
                    data={item}
                  />
                );
              })}
            </div>
            {pagination?.total_page > page ? (
              <LoadMore
                onClick={() => {
                  setPage(page + 1);
                  loadMore();
                }}
              />
            ) : undefined}
          </div>
        )}
      </div>
      <CouponPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={product}
        selected={selectedType}
      />
    </div>
  );
};
