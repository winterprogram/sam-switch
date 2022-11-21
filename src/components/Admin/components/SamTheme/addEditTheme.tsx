import { useEffect, useState } from "react";
import { Chip } from "../common/Chip";
import { TextField } from "../common/TextField";
import { SideBar } from "../Sidebar";
import { useFormik } from "formik";
import { registerWatchSchema } from "../../../../validationSchema/yupValidator";
import ReactImageUploading from "react-images-uploading";
import { X } from "react-feather";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import {
  CREATE_SAM_SWITCH,
  UPDATE_SAM_SWITCH,
} from "../../../../service/apiEndPoints";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import ReLoginModal from "../common/ReloginModal";
import { refreshToken } from "../../../App/utils/util";

export const AddSamTheme = () => {
  const { id = "" } = useParams();
  const [isTizenSelected, setIsTizenSelected] = useState(false);
  const [isWearSelected, setIsWearSelected] = useState(false);
  const maxImagesAllowed = 6;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isReloginOpen, setReloginIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [tizenImages, setTizenImages] = useState([
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
  ]);

  const [wearImages, setWearImages] = useState([
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
  ]);
  const generateUniqueString = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      sku: generateUniqueString(16),
      description: "",
      type: "theme",
      isTizen: false,
      isWear: false,
      tizen_link: "",
      wear_link: "",
    },
    validationSchema: registerWatchSchema,
    onSubmit: (values) => {
      if (
        !values.name.length ||
        !values.description.length ||
        (!isTizenSelected && !isWearSelected)
      )
        return;
      setUpdating(true);
      let os = [];
      if (isTizenSelected) {
        os.push("tizen");
      }
      if (isWearSelected) {
        os.push("wear");
      }
      var formData = new FormData();
      formData.append("name", values.name);
      formData.append("sku", values.sku);
      formData.append("os", os.toString());
      formData.append("description", values.description);
      formData.append("type", values.type);
      if (isTizenSelected) {
        formData.append("tizen_link", values.tizen_link);
        tizenImages?.map((image, index) => {
          if (index === 0) {
            formData.append("tizen_presentation_image", image.image_url);
          } else {
            formData.append("tizen", image.image_url);
          }
        });
      }
      if (isWearSelected) {
        formData.append("wear_link", values.wear_link);
        wearImages?.map((image, index) => {
          if (index === 0) {
            formData.append("wear_presentation_image", image.image_url);
          } else {
            formData.append("wear", image.image_url);
          }
        });
      }
      if (isEdit) {
        const API_URL = UPDATE_SAM_SWITCH.replace(":id", id);
        apiCall(
          API_URL,
          formData,
          (res: any) => {
            if (res?.success) {
              setUpdating(false);
              toast.success(res?.message);
              navigate("/dashboard/samwatch");
            }
          },
          async (err: any) => {
            if (err === "unauthorized") {
              const check = await refreshToken();
              if (check) {
                apiCall(
                  API_URL,
                  formData,
                  (res: any) => {
                    if (res?.success) {
                      setUpdating(false);
                      toast.success(res?.message);
                      navigate("/dashboard/samwatch");
                    }
                  },
                  (err: any) => {
                    console.log(err);
                    setUpdating(false);
                    toast.error("something went wrong!");
                  },
                  METHOD.PATCH,
                  {}
                );
              } else {
                setReloginIsOpen(true);
              }
            } else {
              console.log(err);
              setUpdating(false);
              toast.error("something went wrong!");
            }
          },
          METHOD.PATCH,
          {}
        );
      } else {
        apiCall(
          CREATE_SAM_SWITCH,
          formData,
          (res: any) => {
            if (res?.success) {
              setUpdating(false);
              toast.success(res?.message);
              navigate("/dashboard/samwatch");
            }
          },
          async (err: any) => {
            if (err === "unauthorized") {
              const check = await refreshToken();
              if (check) {
                apiCall(
                  CREATE_SAM_SWITCH,
                  formData,
                  (res: any) => {
                    if (res?.success) {
                      setUpdating(false);
                      toast.success(res?.message);
                      navigate("/dashboard/samwatch");
                    }
                  },
                  (err: any) => {
                    console.log(err);
                    setUpdating(false);
                    toast.error("something went wrong!");
                  },
                  METHOD.POST,
                  {}
                );
              } else {
                setReloginIsOpen(true);
              }
            } else {
              console.log(err);
              setUpdating(false);
              toast.error("something went wrong!");
            }
          },
          METHOD.POST,
          {}
        );
      }
    },
  });
  useEffect(() => {
    if (id) {
      setLoading(true);
      const API_URL = UPDATE_SAM_SWITCH.replace(":id", id);
      apiCall(
        API_URL,
        {},
        (res: any) => {
          if (res?.success) {
            setIsEdit(true);
            formik.setValues(res?.data);
            const OS = res?.data?.os;
            const tizenImages = res?.data?.tizen_images;
            const wearImages = res?.data?.wear_images;
            if (OS && OS?.includes?.("tizen")) {
              setIsTizenSelected(true);
              formik.setFieldValue("isTizen", true);
              const images: any[] = [
                { image: [], image_url: "" },
                { image: [], image_url: "" },
                { image: [], image_url: "" },
                { image: [], image_url: "" },
                { image: [], image_url: "" },
                { image: [], image_url: "" },
              ];
              tizenImages?.map((obj: any, i: number) => {
                let imgarr = [];
                imgarr.push({ data_url: obj?.image_url });
                images[i] = { image: imgarr, image_url: obj?.image_url };
              });
              setTizenImages(images);
            }
            if (OS && OS?.includes?.("wear")) {
              setIsWearSelected(true);
              formik.setFieldValue("isWear", true);
              const images: any[] = [
                { image: [], image_url: "" },
                { image: [], image_url: "" },
                { image: [], image_url: "" },
                { image: [], image_url: "" },
                { image: [], image_url: "" },
                { image: [], image_url: "" },
              ];
              wearImages?.map((obj: any, i: number) => {
                let imgarr = [];
                imgarr.push({ data_url: obj?.image_url });
                images[i] = { image: imgarr, image_url: obj?.image_url };
              });
              setWearImages(images);
            }
            setLoading(false);
          }
        },
        (err: any) => {
          console.log(err);
          setLoading(false);
          toast.error("something went wrong!");
        },
        METHOD.GET,
        {}
      );
    }
  }, [id]);

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
          <span className="text-3xl font-bold p-4">Sam Theme</span>
          <button
            disabled={updating}
            type="submit"
            onClick={() => formik.handleSubmit()}
            className="text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-sm m-4 mt-5 px-2 py-2.5 w-24"
          >
            {updating ? "Uploading..." : "Save"}
          </button>
        </div>
        <div className="ml-10">
          <label htmlFor="name" className="font-semibold mb-2">
            Name
          </label>
          {loading ? (
            <div className="animate-pulse py-5">
              <div className="h-2 w-40 bg-slate-500 rounded" />
            </div>
          ) : (
            <div>
              <TextField
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={updating}
              />
              {formik.touched?.name && formik?.errors?.name && (
                <div className="error">{formik?.errors?.name}</div>
              )}
            </div>
          )}

          <label htmlFor="name" className="font-semibold mb-2">
            SKU
          </label>
          {loading ? (
            <div className="animate-pulse py-5">
              <div className="h-2 w-40 bg-slate-500 rounded" />
            </div>
          ) : (
            <div>
              <TextField
                name="sku"
                placeholder="Sku"
                value={formik.values.sku}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
              {formik.touched?.sku && formik?.errors?.sku && (
                <div className="error">{formik?.errors?.sku}</div>
              )}
            </div>
          )}

          <div className="flex flex-col">
            <span className="font-semibold">Store</span>
            {loading ? (
              <div className="animate-pulse flex flex-row py-5">
                <div className="h-6 w-14 bg-sky-300 rounded-xl" />
                <div className="ml-4 h-6 w-14 bg-sky-300 rounded-xl" />
              </div>
            ) : (
              <div className="flex flex-row mt-2 [&>*]:mr-2">
                <Chip
                  title="Galaxy Store"
                  onClick={() => {
                    if (!updating) {
                      setIsTizenSelected(!isTizenSelected);
                      formik.setFieldValue("isTizen", !isTizenSelected);
                    }
                  }}
                  isSelected={isTizenSelected}
                ></Chip>
                <Chip
                  title="Google Play"
                  onClick={() => {
                    if (!updating) {
                      setIsWearSelected(!isWearSelected);
                      formik.setFieldValue("isWear", !isWearSelected);
                    }
                  }}
                  isSelected={isWearSelected}
                ></Chip>
              </div>
            )}
          </div>

          {isTizenSelected && (
            <>
              <div className="flex flex-col">
                <span className="mt-2 mb-2 font-semibold">Galaxy Store</span>
                <div className="flex flex-row mr-2 overflow-auto">
                  {Array.from({ length: maxImagesAllowed }).map((_, index) => (
                    <ReactImageUploading
                      multiple={false}
                      value={tizenImages[index].image}
                      onChange={(image: any) => {
                        let temp = [...tizenImages];
                        temp[index].image = image;
                        temp[index].image_url = image[0].file;
                        setTizenImages(temp);
                      }}
                      maxNumber={6}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div
                          className="min-w-fit mx-1"
                          style={{
                            display: "flex",
                            position: "relative",
                          }}
                        >
                          {imageList.length ? null : (
                            <div
                              className="h-40 w-40 border text-center flex flex-col justify-center text-gray-400 hover:cursor-pointer"
                              onClick={!updating ? onImageUpload : undefined}
                            >
                              {index === 0
                                ? " Add presentative image"
                                : "Add image"}
                            </div>
                          )}

                          {imageList?.map((image, i) => (
                            <>
                              <div
                                className="min-w-fit h-[10em] justify-center rounded-lg text-center text-gray-400"
                                key={i}
                              >
                                <img
                                  src={image?.data_url}
                                  alt="Unable to load the Image"
                                  className="h-[10em] rounded-lg"
                                />
                              </div>
                              <div className=" absolute right-1 top-1">
                                <X
                                  onClick={() => {
                                    if (!updating) {
                                      let temp = [...tizenImages];
                                      temp[index].image = [];
                                      temp[index].image_url = "";
                                      setTizenImages(temp);
                                    }
                                  }}
                                  className="text-sky-600 bg-white rounded shadow-md shadow-sky-500/50 hover:cursor-pointer"
                                />
                              </div>
                            </>
                          ))}
                        </div>
                      )}
                    </ReactImageUploading>
                  ))}
                </div>
              </div>
              <label htmlFor="name" className="font-semibold mb-2">
                Galaxy Store Link
              </label>
              {loading ? (
                <div className="animate-pulse py-5">
                  <div className="h-2 w-40 bg-slate-500 rounded" />
                </div>
              ) : (
                <div>
                  <TextField
                    name="tizen_link"
                    placeholder="Link"
                    value={formik.values.tizen_link}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={updating}
                  />
                  {formik.touched?.tizen_link && formik?.errors?.tizen_link && (
                    <div className="error">{formik?.errors?.tizen_link}</div>
                  )}
                </div>
              )}
            </>
          )}

          {isWearSelected && (
            <>
              <div className="flex flex-col">
                <span className="mt-2 mb-2 font-semibold">Google Play</span>
                <div className="flex flex-row mr-2 overflow-auto">
                  {Array.from({ length: maxImagesAllowed }).map((_, index) => (
                    <ReactImageUploading
                      multiple={false}
                      value={wearImages[index].image}
                      onChange={(image: any) => {
                        let temp = [...wearImages];
                        temp[index].image = image;
                        temp[index].image_url = image[0].file;
                        setWearImages(temp);
                      }}
                      maxNumber={6}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div
                          className="min-w-fit mx-1"
                          style={{
                            display: "flex",
                            position: "relative",
                          }}
                        >
                          {imageList.length ? null : (
                            <div
                              className="h-40 w-40 border text-center flex flex-col justify-center text-gray-400 hover:cursor-pointer"
                              onClick={!updating ? onImageUpload : undefined}
                            >
                              {index === 0
                                ? " Add presentative image"
                                : "Add image"}
                            </div>
                          )}

                          {imageList?.map((image, i) => (
                            <>
                              <div
                                className="min-w-fit h-[10em] justify-center rounded-lg text-center text-gray-400"
                                key={i}
                              >
                                <img
                                  src={image?.data_url}
                                  alt="Unable to load the Image"
                                  className="h-[10em] rounded-lg"
                                />
                              </div>
                              <div className=" absolute right-1 top-1">
                                <X
                                  onClick={() => {
                                    if (!updating) {
                                      let temp = [...wearImages];
                                      temp[index].image = [];
                                      temp[index].image_url = "";
                                      setWearImages(temp);
                                    }
                                  }}
                                  className="text-sky-600 bg-white rounded shadow-md shadow-sky-500/50"
                                />
                              </div>
                            </>
                          ))}
                        </div>
                      )}
                    </ReactImageUploading>
                  ))}
                </div>
              </div>
              <label htmlFor="name" className="font-semibold mb-2">
                Google Play Link
              </label>
              {loading ? (
                <div className="animate-pulse py-5">
                  <div className="h-2 w-40 bg-slate-500 rounded" />
                </div>
              ) : (
                <div>
                  <TextField
                    name="wear_link"
                    placeholder="Link"
                    value={formik.values.wear_link}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={updating}
                  />
                  {formik.touched?.wear_link && formik?.errors?.wear_link && (
                    <div className="error">{formik?.errors?.wear_link}</div>
                  )}
                </div>
              )}
            </>
          )}

          <div className="flex flex-col mt-2">
            <label htmlFor="description" className="font-semibold mb-2 ">
              {" "}
              Description
            </label>
            {loading ? (
              <div className="animate-pulse py-5">
                <div className="h-2 w-40 bg-slate-500 rounded" />
              </div>
            ) : (
              <div>
                <textarea
                  disabled={updating}
                  className="border xl:w-[30rem] resize-none lg:w-[26rem] md:w-96 w-80 p-2"
                  name="description"
                  placeholder="Description"
                  cols={50}
                  rows={10}
                  value={formik?.values?.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik?.touched?.description &&
                  formik?.errors?.description && (
                    <div className="error">{formik?.errors?.description}</div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ReLoginModal isOpen={isReloginOpen} setIsOpen={setReloginIsOpen} />
    </div>
  );
};
