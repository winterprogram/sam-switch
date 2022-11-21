import { useState } from "react";
import clsx from "clsx";
import DashboardIcon from "../../../../assets/icons/percent-solid.png";
import UserIcon from "../../../../assets/icons/store-solid.png";
import SettingsIcon from "../../../../assets/icons/settings.svg";
import LogoutIcon from "../../../../assets/icons/logout.svg";
import Logo from "../../../../assets/icons/samtree-logo.png";
import Collapse from "../../../../assets/icons/collapse.svg";
import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";
import {
  removeDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../../../App/utils/util";

export const SideBar = (props: {
  collapsed: any;
  setCollapsed: (arg0: boolean) => void;
  fromCoupon: boolean;
}) => {
  const [name, setName] = useState(
    props?.fromCoupon ? "DashboardIcon" : "userIcon"
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed w-12 md:w-14 lg:w-14 xl:w-14 maxHeight bg-[#27324D] border-r-2 border-[#394564] z-10">
        <div className="h-full flex flex-col justify-between">
          <div className="control-group flex flex-col items-center">
            <button
              className={clsx(
                "m-1.5 p-1.5 md:p-2 md:m-2 justify-center rounded-xl hover:shadow-md focus:bg-sky-500 ",
                name === "userIcon" ? "bg-sky-500" : "hover:bg-[#262E43]"
              )}
              onClick={() => {
                if (
                  name === "userIcon" ||
                  (name === "DashboardIcon" && props.collapsed)
                )
                  props.setCollapsed(!props.collapsed);
                setName("userIcon");
              }}
            >
              <img src={UserIcon} alt="" />
            </button>
            <button
              className={clsx(
                "m-1.5 px-1.5 py-1 md:px-2 md:py-1.5 md:m-2 justify-center rounded-xl hover:shadow-md focus:bg-sky-500 ",
                name === "DashboardIcon" ? "bg-sky-500 " : "hover:bg-[#262E43]"
              )}
              onClick={() => {
                if (
                  name === "DashboardIcon" ||
                  (name === "userIcon" && props.collapsed)
                )
                  props.setCollapsed(!props.collapsed);
                setName("DashboardIcon");
              }}
            >
              <img src={DashboardIcon} alt="" />
            </button>
          </div>
          <div className="settings-group flex flex-col items-center z-10">
            <hr className="w-full border-[#394564]"></hr>
            <img src={SettingsIcon} alt="" />
            <Link
              onClick={() => {
                removeDataFromLocalStorage("login-auth-token");
                navigate("/login", { replace: true });
              }}
              to="/login"
            >
              <img src={LogoutIcon} alt="" />
            </Link>
            <Link to="/">
              <img className="w-9" src={Logo} alt="" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "products-tab fixed top-0 left-12 md:left-14 lg:left-14 xl:left-14 h-screen bg-[#27324D]  z-10",
          !props.collapsed && "min-w-fit max-w-[16rem]",
          props.collapsed && "w-0"
        )}
      >
        {name === "userIcon" ? (
          <span>
            <div
              className={clsx(
                "min-w-fit max-w-[16rem] h-12 fixed product-content flex flex-row justify-between",
                props.collapsed && "hidden"
              )}
            >
              <div className="ml-5 mb-10 mt-3 text-lg font-bold text-white ">
                Products
              </div>
              <img
                onClick={() => props.setCollapsed(true)}
                className="h-4 mt-5 pr-5 ml-8 hover:cursor-pointer"
                src={Collapse}
                alt=""
              />
            </div>
            <ul
              className={clsx(
                "mt-4 flex flex-col pt-7",
                props.collapsed && "hidden"
              )}
            >
              <li
                className={clsx(
                  "hover:cursor-pointer pr-10",
                  window.location.pathname.includes("/samwatch")
                    ? "bg-[#262E43]"
                    : ""
                )}
                onClick={() => navigate("/dashboard/samwatch")}
              >
                Sam Watch
              </li>
              <li
                className={clsx(
                  "hover:cursor-pointer pr-10",
                  window.location.pathname.includes("/samtheme")
                    ? "bg-[#262E43]"
                    : ""
                )}
                onClick={() => navigate("/dashboard/samtheme")}
              >
                Sam Theme
              </li>
              <li
                className={clsx(
                  "hover:cursor-pointer pr-10",
                  window.location.pathname.includes("/samstudio")
                    ? "bg-[#262E43]"
                    : ""
                )}
                onClick={() => navigate("/dashboard/samstudio")}
              >
                Sam Studio
              </li>
            </ul>
          </span>
        ) : (
          ""
        )}
        {name === "DashboardIcon" ? (
          <span>
            <div
              className={clsx(
                "min-w-fit max-w-[16rem] h-12 fixed product-content flex flex-row justify-between",
                props.collapsed && "hidden"
              )}
            >
              <div className="ml-5 mb-10 mt-3 text-lg font-bold text-white ">
                Coupon
              </div>
              <img
                onClick={() => props.setCollapsed(true)}
                className="h-4 mt-5 mr-5 ml-8 hover:cursor-pointer"
                src={Collapse}
                alt=""
              />
            </div>
            <ul
              className={clsx(
                "mt-4 flex flex-col pt-7",
                props.collapsed && "hidden"
              )}
            >
              <li
                className={clsx(
                  "hover:cursor-pointer pr-24",
                  window.location.pathname.includes("/coupon")
                    ? "bg-[#262E43]"
                    : ""
                )}
                onClick={() => navigate("/dashboard/coupon")}
              >
                List
              </li>
            </ul>
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
