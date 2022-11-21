import { Dropdown } from "../common/Dropdown";
import { TextField } from "../common/TextField";
import SearchIcon from "../../../../assets/icons/search.svg";
import RefreshIcon from "../../../../assets/icons/refresh.svg";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { SideBar } from "../Sidebar";
import { useEffect, useState } from "react";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import { GET_SAM_SWITCH } from "../../../../service/apiEndPoints";
import { toast } from "react-toastify";
import moment from "moment";
import clsx from "clsx";
import TablePagination from "../common/TablePagination";

export const SamTheme = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loader, setLoader] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedOs, setSelectedOs] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    loadData();
  }, [limit, page]);

  const loadData = async () => {
    setLoader(true);
    const URL = GET_SAM_SWITCH.replace(":type", "theme")
      .replace(":limit", limit.toString())
      .replace(":page", page.toString())
      .replace(":os", selectedOs === "all" ? "" : selectedOs)
      .replace(":name_sku", search);
    await apiCall(
      URL,
      {},
      (res: any) => {
        if (res?.success) {
          setData(res?.data);
          setTotalCount(res?.pagination?.total);
          setTotalPages(res?.pagination?.total_page);
          setLoader(false);
        } else {
          if (res?.data?.message === "record not found") {
            setData([]);
            setTotalCount(0);
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
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPage(0);
    loadData();
  };

  return (
    <div className="flex w-full">
      <SideBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        fromCoupon={false}
      />
      <div
        className={clsx(
          "mainClass relative flex flex-col justify-center overflow-auto",
          collapsed
            ? "ml-12 lg:ml-14 xl:ml-14 w-full"
            : "ml-12 w-full md:ml-[13em]"
        )}
      >
        <div className="flex w-full flex-row justify-between">
          <span className="text-3xl font-bold p-4">Sam Theme</span>
          <Link
            className="text-white bg-[#0EB4F3] hover:bg-[#58c7f3] font-medium text-center rounded-lg h-fit text-sm m-4 mt-5 px-2 py-2.5 w-24"
            to="/dashboard/samtheme/register"
          >
            Register
          </Link>
        </div>

        <div className="flex flex-row justify-between align-middle mt-14 ml-5 mr-3 md:ml-10 md:mr-5">
          <form
            className="flex flex-col md:flex-row justify-between w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row ">
              <Dropdown
                className="mr-4 w-fit"
                for="search"
                onChange={(e: string) => setSelectedOs(e)}
                items={[
                  { key: "All", value: "all" },
                  { key: "Galaxy Store", value: "tizen" },
                  { key: "Google Play", value: "wear" },
                ]}
                label="Store"
              ></Dropdown>
              <TextField
                label="Name or SKU"
                placeholder="Name or SKU"
                for="search"
                onchange={(e: string) => setSearch(e)}
              ></TextField>
            </div>
            <div className="[&>*]:mr-2 [&>*]:hover:cursor-pointer mr-0 mt-8 flex flex-row h-10">
              <button>
                <img src={SearchIcon} alt="" />
              </button>
              <img src={RefreshIcon} onClick={loadData} alt="" />
            </div>
          </form>
        </div>
        <div className="divide-y mt-5">
          <div />
          <div />
        </div>
        <div className="ml-5 mr-3 md:ml-10 md:mr-5 mt-5 flex flex-row justify-between">
          <div className=" flex flex-row">
            <span className="font-bold">Items:</span>
            <span className="text-[#697274] ml-2 animate-pulse">
              {loader ? (
                <div className="h-2 w-4 bg-slate-600 rounded mt-2" />
              ) : (
                totalCount
              )}
            </span>
          </div>
          <Dropdown
            className="-mt-4 -mb-2 mr-2"
            for="search"
            onChange={(e: number) => setLimit(e)}
            items={[
              { key: "10", value: 10 },
              { key: "15", value: 15 },
              { key: "20", value: 20 },
              { key: "25", value: 25 },
              { key: "50", value: 50 },
              { key: "100", value: 100 },
            ]}
          />
        </div>
        <div className="ml-5 mr-3 md:ml-10 md:mr-7 mt-5 overflow-auto">
          <table className="w-full [&>*]:border">
            <thead className="">
              <tr className="bg-[#EFF7FD] [&>*]:p-5 [&>*]:border">
                <th>No</th>
                <th>Name</th>
                <th>Store</th>
                <th>SKU</th>
                <th>Available Coupons</th>
                <th>Used Coupons</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody className="[&>*]:border">
              {loader ? (
                <tr className="[&>*]:border-r-[1px] animate-pulse">
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                </tr>
              ) : !data.length ? (
                <tr className="[&>*]:border-r-[1px]">
                  <td colSpan={7} className="font-bold text-gray-700">
                    No Data to Show
                  </td>
                </tr>
              ) : (
                data.map((e: any, i) => (
                  <tr className="[&>*]:border-r-[1px]">
                    <td>{(page - 1) * limit + ++i}</td>
                    <td
                      className="hover:cursor-pointer"
                      onClick={() => {
                        navigate(`/dashboard/samtheme/${e?.sku}`);
                      }}
                    >
                      {e?.name}
                    </td>
                    <td>
                      {e?.os?.includes("wear") && "Google Play"}
                      {e?.os?.includes("wear") &&
                        e?.os?.includes("tizen") &&
                        ", "}
                      {e?.os?.includes("tizen") && "Galaxy Store"}
                    </td>
                    <td>{e?.sku}</td>
                    <td>{e?.available || 0}</td>
                    <td>{e?.used || 0}</td>
                    <td>
                      {moment(e?.created_at).format("YYYY/MM/DD HH:mm:ss")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {loader || totalPages <= 1 ? undefined : (
          <TablePagination
            curPage={page}
            setCurPage={setPage}
            lastPage={totalPages}
          />
        )}
      </div>
    </div>
  );
};
