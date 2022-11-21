import Logo from "../../../../assets/icons/samtree-logo.png";
import { TextField } from "../common/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, useFormik } from "formik";
import { SignupSchema } from "../../../../validationSchema/yupValidator";
import { apiCall, METHOD } from "../../../../service/baseApiCall";
import { USER_LOGIN } from "../../../../service/apiEndPoints";
import { toast } from "react-toastify";
import { saveDataToLocalStorage } from "../../../App/utils/util";

export const Auth = () => {
  const navigate = useNavigate(),
    pushPage = () => {
      const path = "/dashboard";
      navigate(path);
    };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const reqPayload = {
        email: values.email,
        password: values.password,
      };
      apiCall(
        USER_LOGIN,
        reqPayload,
        (res: any) => {
          if (res?.success) {
            saveDataToLocalStorage("login-auth-token", res?.data?.AccessToken);
            saveDataToLocalStorage("refresh-token", res?.data?.RefreshToken);
            saveDataToLocalStorage("email", values.email);
            toast.success(res?.message);
            pushPage();
          }
        },
        (err: any) => {
          console.log(err);
          toast.error("Invalid Login Credentials!");
        },
        METHOD.POST,
        {}
      );
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    formik.handleSubmit();
  };
  return (
    <>
      <div className="h-screen py-20 bg-black">
        <div className="flex flex-col justify-center items-center h-full">
          <Link to="/">
            <img className="h-32" src={Logo} alt="" />
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="mt-14">
              <TextField
                name="email"
                label="Email"
                placeholder="Enter the email"
                for="login"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched?.email && formik?.errors?.email && (
                <div className="error">{formik?.errors?.email}</div>
              )}
            </div>
            <div className="mt-5">
              <TextField
                name="password"
                label="Password"
                placeholder="Enter the password"
                for="login"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched?.password && formik?.errors?.password && (
                <div className="error">{formik?.errors?.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="text-white mx-auto bg-[#0EB4F3] hover:bg-[#58c7f3] w-[12rem] block font-medium rounded-lg text-sm mt-14 px-2 py-2.5"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
