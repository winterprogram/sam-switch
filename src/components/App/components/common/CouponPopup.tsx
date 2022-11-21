import { Dialog, Transition } from "@headlessui/react";
import { useEffect, Fragment, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Form, Formik } from "formik";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import { REDEEMED } from "../../../../service/apiEndPoints";
import Tizen from "../../../../assets/icons/galaxy_store_2.png";
import activeTizen from "../../../../assets/icons/galaxy_store_1.png";
import Wear from "../../../../assets/icons/goggleplay_2.png";
import activeWear from "../../../../assets/icons/goggleplay_1.png";
import Copy from "../../../../assets/icons/copy-icon.png";
import { SAM_TYPES } from "../../utils/constants";
import { X } from "react-feather";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function CouponPopup(props: {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  product: any;
  selected: string;
}) {
  const [loading, setLoading] = useState(false);
  const [couponModal, setCouponModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [images, setImages] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [os, setOs] = useState<string[]>([""]);
  const [selectedType, setSelectedType] = useState(
    props?.selected === SAM_TYPES.ALL
      ? props?.product?.os?.includes(SAM_TYPES.WEAR)
        ? SAM_TYPES.WEAR
        : SAM_TYPES.TIZEN
      : props?.selected
  );

  const closeCouponModal = () => {
    setCouponModal(false);
    window.location.reload();
  };

  useEffect(() => {
    setSelectedType(
      props?.selected === SAM_TYPES.ALL
        ? props?.product?.os?.includes(SAM_TYPES.WEAR)
          ? SAM_TYPES.WEAR
          : SAM_TYPES.TIZEN
        : props?.selected
    );
    if (props?.selected === SAM_TYPES.TIZEN) {
      setOs(["tizen"]);
    } else if (props?.selected === SAM_TYPES.WEAR) {
      setOs(["wear"]);
    } else {
      setOs(props?.product?.os);
    }
  }, [props?.selected, props?.product?.os]);

  useEffect(() => {
    const arr: any = [];
    if (selectedType === SAM_TYPES.TIZEN) {
      props?.product?.tizen_images?.map((i: any) =>
        arr.push({ url: i.image_url, alt: i?.sku, title: "Tizen" })
      );
    } else if (selectedType === SAM_TYPES.WEAR) {
      props?.product?.wear_images?.map((i: any) =>
        arr.push({ url: i.image_url, alt: i?.sku, title: "Wear" })
      );
    } else {
      if (
        props?.product?.tizen_images &&
        props?.product?.tizen_images.length > 0
      ) {
        props?.product?.tizen_images?.map((i: any) =>
          arr.push({ url: i.image_url, alt: i?.sku, title: "Tizen" })
        );
      }
      if (
        props?.product?.wear_images &&
        props?.product?.wear_images.length > 0
      ) {
        props?.product?.wear_images?.map((i: any) =>
          arr.push({ url: i.image_url, alt: i?.sku, title: "Wear" })
        );
      }
    }
    setImages(arr);
  }, [props?.product, selectedType]);

  const setIsOpen = (e: boolean) => {
    setSelectedType(
      props?.selected === SAM_TYPES.ALL
        ? props?.product?.os?.includes(SAM_TYPES.WEAR)
          ? SAM_TYPES.WEAR
          : SAM_TYPES.TIZEN
        : props?.selected
    );
    props?.setIsOpen(e);
  };

  return (
    <>
      <Transition appear show={props?.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-[0.85]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-80 sm:w-[25rem] transform rounded-2xl overflow-hidden bg-black text-left align-middle shadow-xl justify-center transition-all">
                  <div className="relative w-full h-full">
                    <Carousel
                      className="coupon-carousel"
                      showThumbs={false}
                      showStatus={false}
                      showIndicators={images?.length < 2 ? false : true}
                      renderArrowPrev={(onClickHandler, hasPrev) =>
                        hasPrev && (
                          <button
                            className="absolute top-40 left-2 rounded-full bg-gray-800 opacity-60 w-8 z-10 text-white"
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
                            className="absolute top-40 right-2 rounded-full bg-gray-800 opacity-60 w-8 z-10 text-white"
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
                      {images?.map((item: any) => {
                        return (
                          <div className="-ml-8 -mt-4 hover:bg-none content-center">
                            <img
                              src={item?.url}
                              className=" object-contain h-80 sm:h-[25rem]"
                              alt={item?.alt}
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  </div>
                  <div
                    onClick={() => setIsOpen(false)}
                    className=" absolute right-1.5 top-1.5 z-10"
                  >
                    <X className="text-white sm:h-8 sm:w-8 bg-[#d23434] rounded shadow-md hover:cursor-pointer" />
                  </div>
                  <Formik
                    initialValues={{
                      id: props?.product?.id,
                    }}
                    onSubmit={(values) => {
                      const URL = REDEEMED.replace(":sam_switch_id", values.id);
                      apiCall(
                        URL,
                        {},
                        (res: any) => {
                          if (res?.success) {
                            setCoupon(res?.data?.coupon_code);
                            props?.setIsOpen(false);
                            setCouponModal(true);
                            setLoading(false);
                          }
                        },
                        (err: any) => {
                          console.log(err);
                          setIsOpen(false);
                          setFailModal(true);
                          setLoading(false);
                        },
                        METHOD.GET,
                        {}
                      );
                    }}
                  >
                    {({ errors }) => (
                      <Form className="p-6 bg-white">
                        <div className="flex justify-between items-center">
                          <div className="flex flex-row">
                            <img
                              className={`${os?.includes("wear") ? "" : "hidden"
                                } h-8 mr-2 hover:cursor-pointer`}
                              onClick={() => {
                                setSelectedType(SAM_TYPES.WEAR);
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.src = activeWear)
                              }
                              onMouseOut={(e) =>
                              (e.currentTarget.src =
                                selectedType === SAM_TYPES.WEAR
                                  ? activeWear
                                  : Wear)
                              }
                              src={
                                selectedType === SAM_TYPES.WEAR
                                  ? activeWear
                                  : Wear
                              }
                              alt=""
                            />
                            <img
                              className={`${os?.includes("tizen") ? "" : "hidden"
                                } h-8 mr-2 rounded-full hover:cursor-pointer`}
                              onClick={() => {
                                setSelectedType(SAM_TYPES.TIZEN);
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.src = activeTizen)
                              }
                              onMouseOut={(e) =>
                              (e.currentTarget.src =
                                selectedType === SAM_TYPES.TIZEN
                                  ? activeTizen
                                  : Tizen)
                              }
                              src={
                                selectedType === SAM_TYPES.TIZEN
                                  ? activeTizen
                                  : Tizen
                              }
                              alt=""
                            />
                          </div>
                          <div
                            className={`${!props?.product?.coupon_available
                              ? "hidden"
                              : "block"
                              } ml-1 inline-block py-1 px-2 text-xs h-fit text-white rounded-md bg-slate-800 shadow hover:cursor-pointer`}
                            onClick={() =>
                              window.open(
                                selectedType === SAM_TYPES.TIZEN
                                  ? props?.product?.tizen_link
                                  : props?.product?.wear_link
                              )
                            }
                          >
                            Link to this Product
                          </div>
                        </div>

                        <Dialog.Title
                          as="h3"
                          className="text-lg mt-4 font-medium leading-6 text-gray-900"
                        >
                          {props?.product?.name}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p
                            style={{ whiteSpace: "pre-wrap" }}
                            className="text-sm text-gray-500 min-h-[140px] max-h-[140px] sm:max-h-[240px] overflow-y-auto"
                          >
                            Description : <br />
                            {props?.product?.description}
                          </p>
                        </div>

                        <div className="mt-6 flex justify-center">
                          {!props?.product?.coupon_available ? (
                            <button
                              type="button"
                              onClick={() =>
                                window.open(
                                  selectedType === SAM_TYPES.TIZEN
                                    ? props?.product?.tizen_link
                                    : props?.product?.wear_link
                                )
                              }
                              className="inline-flex justify-center  text-center w-3/4 rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 focus:outline-none"
                            >
                              Link to this Product
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="inline-flex justify-center  text-center w-3/4 rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 focus:outline-none"
                              onClick={() => {
                                setLoading(true);
                              }}
                            >
                              {loading ? "Loading..." : "Get a Coupon"}
                            </button>
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={couponModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-[0.85]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div
                    onClick={() => closeCouponModal()}
                    className=" absolute right-1.5 top-1"
                  >
                    <X className="text-sky-600 hover:cursor-pointer" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Congratulations!
                  </Dialog.Title>
                  <CopyToClipboard text={coupon}>
                    <div onClick={() => {
                      toast('✅ \t Coupon Code Copied!', {
                        className: "rounded-lg text-center md:text-lg",
                        position: "bottom-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        draggable: true,
                      })
                    }} className="border rounded relative  flex items-center mt-6 pt-1">
                      <span
                        className="text-center text-gray-600 text-3xl w-full overflow-x-auto pb-1 px-1"
                      >
                        {coupon}
                      </span>
                      <img
                        className="h-6 mr-1 hover:cursor-pointer mb-1"
                        src={Copy}
                        alt=""
                      />
                    </div>
                  </CopyToClipboard>

                  <div>
                    <p className="text-xs mt-10 text-center text-red-400">
                      Please keep the coupon code. <br /> You can’t download the
                      coupon again
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      className="mx-auto inline-flex justify-center  text-center w-3/4 rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
                      onClick={() =>
                        window.open(
                          selectedType === SAM_TYPES.TIZEN
                            ? props?.product?.tizen_link
                            : 'http://play.google.com/redeem'
                        )
                      }
                    >
                      Go To Store
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={failModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setFailModal(false)}
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
            <div className="fixed inset-0 bg-black bg-opacity-[0.85]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Alert
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      No Coupon Available
                    </p>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      className="mx-auto inline-flex justify-center  text-center w-3/4 rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                      onClick={() => setFailModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
