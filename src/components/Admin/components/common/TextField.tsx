import clsx from "clsx";

export const TextField = (props: any) => (
  <>
    <div
      className={clsx(
        "mb-3 xl:w-[28rem] lg:w-96 ",
        props?.className,
        props?.for === "search" ? " w-64" : "w-72"
      )}
    >
      {props?.label && (
        <label
          htmlFor={props?.label}
          className={clsx(
            "form-label inline-block mb-1.5 mt-0.5 font-medium ",
            props?.for === "login" ? "text-gray-400" : "text-gray-900"
          )}
        >
          {props?.label}
        </label>
      )}
      <input
        onChange={(e) => {
          if (props?.for === "search") props?.onchange(e.target.value);
        }}
        type={props?.name === "password" ? "password" : "text"}
        className={clsx(
          `
        form-control
        block
        w-full
        px-3
        py-2
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0 focus:border-sky-600 focus:outline-none
      `,
          props?.for === "login"
            ? "text-gray-500 bg-black "
            : "text-gray-700 bg-white"
        )}
        id={props?.label}
        placeholder={props?.placeholder}
        name={props?.name}
        {...props}
      />
    </div>
  </>
);
