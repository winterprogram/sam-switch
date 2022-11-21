import { useEffect, useState } from "react";
import { TextField } from "../common/TextField";
import { SideBar } from "../Sidebar";
import { Formik, Form, Field } from "formik";
import { registerAudioSchema } from "../../../../validationSchema/yupValidator";
import ReactImageUploading from "react-images-uploading";
import { X } from "react-feather";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import {
  CREATE_SAM_STUDIO,
  UPDATE_SAM_STUDIO,
} from "../../../../service/apiEndPoints";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import ReLoginModal from "../common/ReloginModal";
import { formControlClasses } from "@mui/material";
import { refreshToken } from "../../../App/utils/util";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: any) => (
  <div>
    <TextField {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);
const CustomTextAreaComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: any) => (
  <div>
    <textarea {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

export const AddSamStudio = () => {
  const { id = "" } = useParams();
  const maxImagesAllowed = 6;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReloginOpen, setReloginIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [initialData, setInitalData] = useState({
    name: "",
    link: "",
    description: "",
  });
  const [images, setImages] = useState([
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
    { image: [], image_url: "" },
  ]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = () => {
    setLoading(true);
    const API_URL = UPDATE_SAM_STUDIO.replace(":id", id);
    apiCall(
      API_URL,
      {},
      (res: any) => {
        if (res?.success) {
          setIsEdit(true);
          setInitalData(res?.data);
          const Images = res?.data?.images;
          const images: any[] = [
            { image: [], image_url: "" },
            { image: [], image_url: "" },
            { image: [], image_url: "" },
            { image: [], image_url: "" },
            { image: [], image_url: "" },
            { image: [], image_url: "" },
          ];
          Images?.map((obj: any, i: number) => {
            let imgarr = [];
            imgarr.push({ data_url: obj?.image_url });
            images[i] = { image: imgarr, image_url: obj?.image_url };
          });
          setRefreshed(false);
          setImages(images);
          setLoading(false);
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
        <Formik
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={registerAudioSchema}
          onSubmit={(values) => {
            setUpdating(true);
            var formData = new FormData();
            formData.append("name", values.name);
            formData.append("link", values.link);
            formData.append("description", values.description);

            images?.map((image, index) => {
              if (index === 0) {
                formData.append("presentation_image", image.image_url);
              } else {
                formData.append("images", image.image_url);
              }
            });
            if (isEdit) {
              const API_URL = UPDATE_SAM_STUDIO.replace(":id", id);
              apiCall(
                API_URL,
                formData,
                (res: any) => {
                  if (res?.success) {
                    toast.success(res?.message);
                    setUpdating(false);
                    navigate("/dashboard/samstudio");
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
                            toast.success(res?.message);
                            setUpdating(false);
                            navigate("/dashboard/samstudio");
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
                CREATE_SAM_STUDIO,
                formData,
                (res: any) => {
                  if (res?.success) {
                    toast.success(res?.message);
                    setUpdating(false);
                    navigate("/dashboard/samstudio");
                  }
                },
                async (err: any) => {
                  if (err === "unauthorized") {
                    const check = await refreshToken();
                    if (check) {
                      apiCall(
                        CREATE_SAM_STUDIO,
                        formData,
                        (res: any) => {
                          if (res?.success) {
                            toast.success(res?.message);
                            setUpdating(false);
                            navigate("/dashboard/samstudio");
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
          }}
        >
          {({ values }) => (
            <Form>
              <div className="flex flex-row justify-between">
                <span className="text-3xl font-bold p-4">Sam Studio</span>
                <button
                  disabled={updating}
                  type="submit"
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
                  <Field
                    disabled={updating}
                    name="name"
                    placeholder="Name"
                    component={CustomInputComponent}
                  />
                )}
                <label htmlFor="name" className="font-semibold mb-2">
                  Link
                </label>
                {loading ? (
                  <div className="animate-pulse py-5">
                    <div className="h-2 w-40 bg-slate-500 rounded" />
                  </div>
                ) : (
                  <Field
                    disabled={updating}
                    name="link"
                    placeholder="Url"
                    component={CustomInputComponent}
                  />
                )}
                <div className="flex flex-col">
                  <span className="mt-2 mb-2 font-semibold">Images</span>
                  {loading ? (
                    <div className="animate-pulse flex flex-row py-5">
                      <div className="h-40 w-40 bg-slate-500 rounded-lg" />
                      <div className="ml-2 h-40 w-40 bg-slate-500 rounded-lg " />
                      <div className="ml-2 h-40 w-0 sm:w-40 md:w-40 lg:w-40 xl:w-40 bg-slate-500 rounded-lg " />
                    </div>
                  ) : (
                    <div className="flex flex-row overflow-auto pt-2 pb-4">
                      {Array.from({ length: maxImagesAllowed }).map(
                        (_, index) => (
                          <ReactImageUploading
                            multiple={false}
                            value={images[index].image}
                            onChange={(image: any) => {
                              let temp = [...images];
                              temp[index].image = image;
                              temp[index].image_url = image[0].file;
                              setImages(temp);
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
                                className="mr-2 min-w-fit"
                                style={{
                                  display: "flex",
                                  position: "relative",
                                }}
                              >
                                {imageList.length ? null : (
                                  <div
                                    className="h-40 w-40 border text-center flex flex-col justify-center text-gray-400 hover:cursor-pointer"
                                    onClick={
                                      !updating ? onImageUpload : undefined
                                    }
                                  >
                                    {index === 0
                                      ? " Add presentative image"
                                      : "Add image"}
                                  </div>
                                )}

                                {imageList.map((image) => (
                                  <>
                                    <div
                                      className="min-w-fit h-[10em] justify-center rounded-lg text-center text-gray-400"
                                      key={index}
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
                                            let temp = [...images];
                                            temp[index].image = [];
                                            temp[index].image_url = "";
                                            setImages(temp);
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
                        )
                      )}
                    </div>
                  )}
                </div>
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
                    <Field
                      disabled={updating}
                      className="border xl:w-[30rem] resize-none lg:w-[26rem] md:w-96 w-80 p-2"
                      name="description"
                      placeholder="Description"
                      cols={50}
                      rows={10}
                      component={CustomTextAreaComponent}
                    />
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ReLoginModal isOpen={isReloginOpen} setIsOpen={setReloginIsOpen} />
    </div>
  );
};
