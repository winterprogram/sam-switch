import clsx from "clsx";
import { Fragment, useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UPDATE_SAM_STUDIO } from "../../../../service/apiEndPoints";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import { Chip } from "../common/Chip";
import { SideBar } from "../Sidebar";
import { Dialog, Transition } from "@headlessui/react";
import ReLoginModal from "../common/ReloginModal";
import { refreshToken } from "../../../App/utils/util";

const initData = {
  id: "",
  name: "",
  link: "",
  os: [],
  description: "",
  images: [
    {
      id: "",
      sku: "",
      image_url: "",
    },
  ],
};
export const ViewSamStudio = () => {
  const { id = "" } = useParams();
  const [data, setData] = useState(initData);
  const [deleteModal, setDeleteModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const cancelButtonRef = useRef(null);
  const [isReloginOpen, setReloginIsOpen] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const API_URL = UPDATE_SAM_STUDIO.replace(":id", id);
    apiCall(
      API_URL,
      {},
      (res: any) => {
        if (res?.success) {
          setRefreshed(false);
          setLoading(false);
          setData(res?.data);
        }
      },
      async (err: any) => {
        if (err === "unauthorized" && !refreshed) {
          const check = await refreshToken();
          if (check) {
            setRefreshed(true);
            loadData();
          } else {
            setReloginIsOpen(true);
          }
        } else if (err === "unauthorized") {
          setReloginIsOpen(true);
        } else {
          console.log(err);
          setLoading(false);
          toast.error("something went wrong!");
        }
      },
      METHOD.GET,
      {}
    );
  };

  const deleteApiCall = () => {
    setDisable(true);
    const API_URL = UPDATE_SAM_STUDIO.replace(":id", id);
    apiCall(
      API_URL,
      {},
      (res: any) => {
        if (res?.success) {
          toast.success(res?.message);
          setRefreshed(false);
          setDeleteModal(false);
          setDisable(false);
          setDeleteLoading(false);
          navigate("/dashboard/samstudio");
        }
      },
      async (err: any) => {
        if (err === "unauthorized" && !refreshed) {
          const check = await refreshToken();
          if (check) {
            setRefreshed(true);
            deleteApiCall();
          } else {
            setReloginIsOpen(true);
          }
        } else if (err === "unauthorized") {
          setReloginIsOpen(true);
        } else {
          console.log(err);
          setDeleteModal(false);
          setDeleteLoading(false);
          setDisable(false);
          toast.error("Unable to delete. Something went wrong!");
        }
      },
      METHOD.DELETE,
      {}
    );
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
        <div className="flex flex-row justify-between">
          <span className="text-3xl min-w-fit font-bold p-4">Sam Studio</span>
          <span className="ml-8">
            <button
              onClick={() => {
                setDeleteModal(true);
              }}
              className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm m-4 mt-5 px-2 py-2.5 w-24"
            >
              Delete
            </button>
            <button
              onClick={() => navigate(`/dashboard/samstudio/edit/${id}`)}
              className="text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-sm m-4 mt-5 px-2 py-2.5 w-24"
            >
              Edit
            </button>
          </span>
        </div>
        <div className="ml-10 pt-20">
          <span className=" flex flex-row ">
            <label
              htmlFor="name"
              className="text-slate-400 font-normal mb-2 pr-20"
            >
              Name
            </label>
            {loading ? (
              <div className="animate-pulse pt-2">
                <div className="h-2 w-40 bg-slate-500 rounded" />
              </div>
            ) : (
              <label htmlFor="name" className="text-slate-400 font-normal mb-2">
                {data?.name}
              </label>
            )}
          </span>
          <span className=" flex flex-row pt-5">
            <label
              htmlFor="link"
              className="text-slate-400 font-normal mb-2 pr-20"
            >
              Link
            </label>
            {loading ? (
              <div className="animate-pulse pl-3 pt-2">
                <div className="h-2 w-40 bg-slate-500 rounded" />
              </div>
            ) : (
              <label
                htmlFor="link"
                className="text-slate-400 font-normal mb-2 pl-3"
              >
                {data?.link}
              </label>
            )}
          </span>
          {data?.images && data?.images?.length > 0 && (
            <span className=" flex flex-col">
              <label
                htmlFor="name"
                className="text-slate-400 font-normal mb-2 pr-20"
              >
                Images
              </label>

              {loading ? (
                <div className="animate-pulse flex flex-row py-4 ">
                  <div className="h-40 w-40 bg-slate-500 rounded-lg" />
                  <div className="ml-2 h-40 w-0 sm:w-40 md:w-40 lg:w-40 xl:w-40 bg-slate-500 rounded-lg " />
                  <div className="ml-2 h-40 w-0 sm:w-40 md:w-40 lg:w-40 xl:w-40 bg-slate-500 rounded-lg " />
                </div>
              ) : (
                <label className="font-normal mb-2 py-3">
                  <span>
                    <div className="flex flex-col">
                      <div className="flex flex-row [&>*]:mr-2 overflow-auto">
                        {data?.images?.map((image) => (
                          <>
                            <div
                              className="min-w-fit h-[10em] justify-center rounded-lg text-center text-gray-400"
                              key={1}
                            >
                              <img
                                src={image?.image_url}
                                alt="Unable to load the Image"
                                className="h-[10em] w-auto rounded-lg"
                              />
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </span>
                </label>
              )}
            </span>
          )}
          <span className=" flex flex-row py-2">
            <label
              htmlFor="name"
              className="text-slate-400 font-normal mb-2 pr-10"
            >
              Description
            </label>
            {loading ? (
              <div className="animate-pulse pt-2">
                <div className="h-2 w-40 bg-slate-500 rounded" />
              </div>
            ) : (
              <label
                style={{ whiteSpace: "pre-wrap" }}
                htmlFor="name"
                className="text-slate-400 font-normal mb-2"
              >
                {data?.description}
              </label>
            )}
          </span>
        </div>
      </div>
      <Transition.Root show={deleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => (disable ? undefined : setDeleteModal(false))}
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
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Delete Product
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      disabled={disable}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        deleteApiCall();
                        setDeleteLoading(true);
                      }}
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                    <button
                      disabled={disable}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setDeleteModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
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
