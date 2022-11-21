import { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_STUDIO } from "../../../../service/apiEndPoints";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import { Pagination, ThemeName } from "../../utils/enums";
import CarouselListStudio from "../common/CarouselListStudio";
import { LoadMore } from "../common/LoadMore";
import { NoData } from "../common/NoData";
import { Navigation } from "../NavigationBar";

export const FSamStudio = () => {
  const [data, setData] = useState([] as any);
  const [loading, setLoader] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    column: "",
    limit: 10,
    offset: 0,
    order: "created_at",
    page: 1,
    query: "",
    sort: "ASC",
    total: 1,
    total_page: 1,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const URL = GET_STUDIO.replace(":limit", "10")
      .replace(":page", page.toString())
      .replace(":name", "");
    apiCall(
      URL,
      {},
      (res: any) => {
        if (res?.success) {
          setData(res?.data);
          setPagination(res?.pagination);
          setLoader(false);
        } else {
          if (res?.data?.message === "record not found") setLoader(false);
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
  }, []);

  const loadMore = () => {
    const URL = GET_STUDIO.replace(":limit", "10")
      .replace(":page", (page + 1).toString())
      .replace(":name", "");
    apiCall(
      URL,
      {},
      (res: any) => {
        if (res?.success) {
          const newData = [...data, ...res?.data];
          setData(newData);
          setPagination(res?.pagination);
          setLoader(false);
        } else {
          if (res?.data?.message === "record not found") setLoader(false);
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
  };

  return (
    <div className="bg-black w-screen">
      <Navigation name={ThemeName.SAM_STUDIO} />
      {loading ? (
        <div className="h-[calc(100vh-108px)] md:h-[calc(100vh-112px)] mx-8 mt-10 animate-pulse flex flex-col sm:flex-row justify-center py-4">
          <div className="ml-5 h-64 w-72 sm:w-72 md:w-80 lg:h-72 lg:w-96 xl:w-[28em] bg-slate-800 rounded-lg " />
          <div className="flex-1 content-center mt-10 h-64 lg:h-72 space-y-6 py-1 px-10">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      ) : !data.length ? (
        <NoData className=" pb-[72px]" />
      ) : (
        <>
          <div className="h-[calc(100vh-68px)] md:h-[calc(100vh-72px)] justify-center overflow-y-auto mb-10">
            {data.map((item: any, index: Key) => {
              return (
                <div className="my-5 2xl:my-10" key={index}>
                  <CarouselListStudio data={item} index={index} />
                  <br />
                </div>
              );
            })}
            {pagination?.total_page > page ? (
              <LoadMore
                onClick={() => {
                  setPage(page + 1);
                  loadMore();
                }}
              />
            ) : undefined}
          </div>
        </>
      )}
    </div>
  );
};
