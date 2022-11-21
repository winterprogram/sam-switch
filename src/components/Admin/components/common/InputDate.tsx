import clsx from "clsx";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export const InputDate = (props: any) => (
    <>
        <div className={clsx("mb-3", props?.className,)}>
            {props?.label && (
                <label
                    htmlFor={props?.label}
                    className={clsx("form-label inline-block mb-1.5 mt-0.5 font-medium ", props?.for === "login" ? "text-gray-400" : "text-gray-900")}
                >
                    {props?.label}
                </label>
            )}
            <DatePicker
                onChange={(e: any) => {
                    if (props?.for === 'search')
                        props?.onchange(e);
                }}
                selected={props?.value}
                placeholderText={props?.placeholder}
                dateFormat='yyyy/MM/dd'
                id='dob'
                className={clsx(`
        form-control
        block
        w-fit
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
        -mr-24 focus:border-sky-600 focus:outline-none
      `, props?.for === "login" ? "text-gray-300 bg-black " : "text-gray-700 bg-white")}
            />
        </div>
    </>
);
