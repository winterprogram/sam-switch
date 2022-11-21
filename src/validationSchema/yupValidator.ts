import * as Yup from "yup";
import isUrl from "is-url";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required!"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters!")
    .required("Password is Required!"),
});

const registerWatchSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required!"),
  sku: Yup.string().required("Sku is Required!"),
  description: Yup.string().required("Description is Required!"),
  isTizen: Yup.boolean(),
  tizen_link: Yup.string().when("isTizen", {
    is: true,
    then: Yup.string()
      .test("is-url", "Enter correct url!", (value) => isUrl(value as string))
      .required("Tizen Link is Required!"),
    otherwise: Yup.string().nullable(),
  }),
  isWear: Yup.boolean(),
  wear_link: Yup.string().when("isWear", {
    is: true,
    then: Yup.string()
      .test("is-url", "Enter correct url!", (value) => isUrl(value as string))
      .required("Wear Link is Required!"),
    otherwise: Yup.string().nullable(),
  }),
});

const registerThemeSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required!"),
  sku: Yup.string().required("Sku is Required!"),
  description: Yup.string().required("Description is Required!"),
  isTizen: Yup.boolean(),
  tizen_link: Yup.string().when("isTizen", {
    is: true,
    then: Yup.string()
      .test("is-url", "Enter correct url!", (value) => isUrl(value as string))
      .required("Tizen Link is Required!"),
    otherwise: Yup.string().nullable(),
  }),
  isWear: Yup.boolean(),
  wear_link: Yup.string().when("isWear", {
    is: true,
    then: Yup.string()
      .test("is-url", "Enter correct url!", (value) => isUrl(value as string))
      .required("Wear Link is Required!"),
    otherwise: Yup.string().nullable(),
  }),
});

const registerAudioSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required!"),
  link: Yup.string()
    .test("is-url", "Enter correct url!", (value) => isUrl(value as string))
    .required("link is Required!"),
  description: Yup.string().required("Description is Required!"),
});

export {
  SignupSchema,
  registerWatchSchema,
  registerThemeSchema,
  registerAudioSchema,
};
