import { Dropdown } from "../common/Dropdown";
import { TextField } from "../common/TextField";
import SearchIcon from "../../../../assets/icons/search.svg";
import RefreshIcon from "../../../../assets/icons/refresh.svg";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../Sidebar";
import { Fragment, useRef, useEffect, useState } from "react";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import {
  CREATE_COUPONS,
  GET_COUPONS,
  GET_SAM_SWITCH,
} from "../../../../service/apiEndPoints";
import { toast } from "react-toastify";
import moment from "moment";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import ReLoginModal from "../common/ReloginModal";
import TablePagination from "../common/TablePagination";
import { refreshToken } from "../../../App/utils/util";
import { InputDate } from "../common/InputDate";
import _ from "lodash";

export const CouponPage = () => {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(true);
  const [moduleLoader, setModuleLoader] = useState(true);
  const [couponModal, setCouponModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>();
  const [isReloginOpen, setReloginIsOpen] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [selectedOs, setSelectedOs] = useState("all");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [fileName, setFileName] = useState("+ CSV File");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [initialData, setInitalData] = useState({
    productType: "watch",
    product: 0,
    type: "",
    file: "",
  });
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
    setLoader(true);
    getProductList("watch");
  }, [limit, page]);

  const loadData = async () => {
    const URL = GET_COUPONS.replace(":limit", limit.toString())
      .replace(":page", page.toString())
      .replace(":os", selectedOs === "all" ? "" : selectedOs)
      .replace(":name_sku", search)
      .replace(":date", date ? moment(date).format("YYYY/MM/DD") : "");
    apiCall(
      URL,
      {},
      (res: any) => {
        if (res?.success) {
          setData(res?.data);
          setTotalCount(res?.pagination?.total);
          setTotalPages(res?.pagination?.total_page);
          setRefreshed(false);
          setLoader(false);
        } else {
          if (res?.data?.message === "record not found") {
            setData([]);
            setTotalCount(0);
            setTotalPages(0);
            setRefreshed(false);
            setLoader(false);
          }
        }
      },
      async (err: any) => {
        if (err === "unauthorized" && !refreshed) {
          const check = await refreshToken();
          if (check) {
            setRefreshed(true);
            loadData();
            setLoader(true);
          } else setReloginIsOpen(true);
        } else if (err === "unauthorized") {
          setReloginIsOpen(true);
        } else {
          console.log(err);
          setLoader(false);
          toast.error("something went wrong!");
        }
      },
      METHOD.GET,
      {}
    );
  };

  const getProductList = (value: string) => {
    setModuleLoader(true);
    const URL = GET_SAM_SWITCH.replace(":type", value)
      .replace(":limit", "99999")
      .replace(":page", "")
      .replace(":os", "")
      .replace(":name_sku", "");
    apiCall(
      URL,
      {},
      (res: any) => {
        if (res?.success) {
          setProductData(
            res?.data?.sort((a: any, b: any) => a.name.localeCompare(b.name))
          );
          var data = {
            productType: value,
            product: 0,
            type: res?.data?.[0]?.os?.[0],
            file: "",
          };
          setSelectedProduct(res?.data?.[0]);
          setInitalData(data);
          setModuleLoader(false);
        } else {
          if (res?.data?.message === "record not found") {
            setProductData([]);
            setModuleLoader(false);
          }
        }
      },
      (err: any) => {
        console.log(err);
        toast.error("something went wrong!");
      },
      METHOD.GET,
      {}
    );
  };

  useEffect(() => {
    setInitalData((prev) => ({ ...prev, type: selectedProduct?.os?.[0] }));
  }, [selectedProduct]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPage(0);
    loadData();
    setLoader(true);
  };
  return (
    <div className="flex w-full">
      <SideBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        fromCoupon={true}
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
          <span className="text-3xl font-bold p-4">Coupon</span>
          <button
            onClick={() => setCouponModal(true)}
            className="text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-sm m-4 mt-5 px-2 py-2.5 w-24"
          >
            Register
          </button>
        </div>

        <div className="flex flex-row justify-between align-middle mt-14 ml-5 mr-3 md:ml-10 md:mr-5">
          <form
            className="flex flex-col md:flex-row justify-between w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col lg:flex-row ">
              <div className="mr-4 flex flex-row">
                <Dropdown
                  className="mr-4"
                  for="search"
                  onChange={(e: string) => setSelectedOs(e)}
                  items={[
                    { key: "All", value: "all" },
                    { key: "Galaxy Store", value: "tizen" },
                    { key: "Google Play", value: "wear" },
                  ]}
                  label="Store"
                ></Dropdown>
                <InputDate
                  label="Expired Date"
                  placeholder="2022/08/02"
                  for="search"
                  value={date}
                  onchange={(e: any) => setDate(e)}
                ></InputDate>
              </div>
              <TextField
                label="Product Name or Coupon Code"
                placeholder="Product Name or Coupon Code"
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
              ,
            ]}
          />
        </div>
        <div className="ml-5 mr-3 md:ml-10 md:mr-7 mt-5 overflow-auto">
          <table className="w-full [&>*]:border">
            <thead className="">
              <tr className="bg-[#EFF7FD] [&>*]:p-5 [&>*]:border">
                <th>No</th>
                <th>Product Name</th>
                <th>Product SKU</th>
                <th>Type</th>
                <th>Coupon Code</th>
                <th>Country</th>
                <th>Store</th>
                <th>Expired Date</th>
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
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                  <td>
                    <div className="h-2 bg-slate-700 rounded" />
                  </td>
                </tr>
              ) : !data.length ? (
                <tr className="[&>*]:border-r-[1px]">
                  <td colSpan={9} className="font-bold text-gray-700">
                    No Data to Show
                  </td>
                </tr>
              ) : (
                data.map((e: any, i) => (
                  <tr className="[&>*]:border-r-[1px]">
                    <td>{(page - 1) * limit + ++i}</td>
                    <td>{e?.name}</td>
                    <td>{e?.sku}</td>
                    <td>{e?.type}</td>
                    <td>{e?.coupon_code}</td>
                    <td>{e?.country}</td>
                    <td>
                      {e?.os?.includes("wear") && "Google Play"}
                      {e?.os?.includes("wear") &&
                        e?.os?.includes("tizen") &&
                        ", "}
                      {e?.os?.includes("tizen") && "Galaxy Store"}
                    </td>
                    <td>
                      {moment(e?.expired_date).format("YYYY/MM/DD HH:mm:ss")}
                    </td>
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
      <Transition.Root show={couponModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setCouponModal(false);
            getProductList("watch");
            setFileName("+ CSV File");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  max-w-fit">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex justify-center">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-bold text-gray-900"
                        >
                          Upload CSV File
                        </Dialog.Title>
                        <Formik
                          initialValues={initialData}
                          enableReinitialize={true}
                          onSubmit={(values) => {
                            var formData = new FormData();
                            formData.append(
                              "sam_switch_sku",
                              selectedProduct.sku
                            );
                            formData.append("os", values.type);
                            formData.append("file", values.file);
                            apiCall(
                              CREATE_COUPONS,
                              formData,
                              (res: any) => {
                                if (res?.success) {
                                  toast.success(res?.message);
                                  loadData();
                                }
                              },
                              async (err: any) => {
                                if (err === "unauthorized") {
                                  const check = await refreshToken();
                                  if (check) {
                                    setRefreshed(true);
                                    apiCall(
                                      CREATE_COUPONS,
                                      formData,
                                      (res: any) => {
                                        if (res?.success) {
                                          toast.success(res?.message);
                                          loadData();
                                        }
                                      },
                                      (err: any) => {
                                        console.log(err);
                                        toast.error(err?.data?.message);
                                      },
                                      METHOD.POST,
                                      {}
                                    );
                                  } else {
                                    setReloginIsOpen(true);
                                  }
                                } else {
                                  console.log(err);
                                  toast.error(err?.data?.message);
                                }
                              },
                              METHOD.POST,
                              {}
                            );
                          }}
                        >
                          {({ setFieldValue }) => (
                            <Form>
                              <div className="flex flex-col mt-10 ">
                                <label className="font-semibold mb-2">
                                  Product Type
                                </label>
                                <Field
                                  placeholder="Select a Product Type"
                                  as="select"
                                  name="productType "
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-80 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                  onChange={(event: any) => {
                                    setModuleLoader(true);
                                    getProductList(event.target.value);
                                    setFieldValue(
                                      "productType",
                                      event.target.value
                                    );
                                  }}
                                >
                                  <option value="watch">Sam Watch</option>
                                  <option value="theme">Sam Theme</option>
                                </Field>
                                <label className="font-semibold mb-2">
                                  Product Name
                                </label>
                                {moduleLoader ? (
                                  <div className="text-center p-1.5 border rounded-lg">
                                    Loading...
                                  </div>
                                ) : !productData.length ? (
                                  <div className="text-center p-1.5 border rounded-lg">
                                    No Product Found
                                  </div>
                                ) : (
                                  <Field
                                    as="select"
                                    name="product"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5"
                                    onChange={(event: any) => {
                                      setSelectedProduct(
                                        productData?.[event.target.value]
                                      );
                                      setFieldValue(
                                        "product",
                                        event.target.value
                                      );
                                    }}
                                  >
                                    {productData?.map((product: any, index) => (
                                      <option value={index}>
                                        {product?.name}
                                      </option>
                                    ))}
                                  </Field>
                                )}
                                <label className="font-semibold mb-2">
                                  Store
                                </label>
                                {moduleLoader ? (
                                  <div className="text-center p-1.5 border rounded-lg">
                                    Loading...
                                  </div>
                                ) : !productData.length ? (
                                  <div className="text-center p-1.5 border rounded-lg">
                                    No Product Found
                                  </div>
                                ) : (
                                  <Field
                                    as="select"
                                    name="type"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5"
                                  >
                                    {selectedProduct?.os?.map(
                                      (product: any) => (
                                        <option value={product}>
                                          {product === "tizen"
                                            ? "Galaxy Store"
                                            : "Google Play"}
                                        </option>
                                      )
                                    )}
                                  </Field>
                                )}
                                <div className="h-60 border w-80 mt-10 truncate text-center">
                                  <p className="z-0 absolute text-gray-500 w-60 mx-10 text- mt-[6.5rem]">
                                    {_.truncate(fileName)}
                                  </p>
                                  <input
                                    className="z-10 opacity-0 w-full h-full hover:cursor-pointer"
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept=".csv"
                                    onChange={(event) => {
                                      if (!event?.target?.files?.[0]) return;
                                      setFileName(
                                        event?.target?.files?.[0].name
                                      );
                                      setFieldValue(
                                        "file",
                                        event?.target?.files?.[0]
                                      );
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="mt-5 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                  type="submit"
                                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={() => {
                                    setCouponModal(false);
                                    getProductList("watch");
                                    setFileName("+ CSV File");
                                  }}
                                >
                                  Upload
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={() => {
                                    setCouponModal(false);
                                    getProductList("watch");
                                    setFileName("+ CSV File");
                                  }}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ReLoginModal isOpen={isReloginOpen} setIsOpen={setReloginIsOpen} />
    </div>
  );
};
