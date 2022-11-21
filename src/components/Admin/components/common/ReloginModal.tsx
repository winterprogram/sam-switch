import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReLoginModal(props: {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  function toLogin() {
    navigate("/login");
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (props?.isOpen) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else navigate("/");
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toLogin}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  Login Expired
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Your login token has expired. Please login again.
                  </p>
                </div>

                <div className="mt-4 flex flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-sky-400 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
                    onClick={toLogin}
                  >
                    {"Login " + seconds}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
