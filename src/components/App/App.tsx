import "./App.css";
import Logo from "../../assets/icons/samtree-logo.png";
import SamWatch from "../../assets/icons/watch2.png";
import SamTheme from "../../assets/icons/theme2.png";
import SamStudio from "../../assets/icons/studio2.png";
import SamWatch2 from "../../assets/icons/SamWatch.png";
import SamTheme2 from "../../assets/icons/SamTheme.png";
import SamStudio2 from "../../assets/icons/SamStudio.png";
import iSamWatch from "../../assets/icons/watch_icon_1.png";
import iSamTheme from "../../assets/icons/theme_icon_1.png";
import iSamStudio from "../../assets/icons/studio_icon_1.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export const App = () => {
  const navigate = useNavigate(),
    [showWatch, setShowWatch] = useState(false),
    [showTheme, setShowTheme] = useState(false),
    [showStudio, setShowStudio] = useState(false),
    isLongPress = useRef<any>(),
    timerRef = useRef<any>();
  var count = 0;
  const clickCount = () => {
    count++;
    if (count === 10) navigate("/login");
  };
  const startPressTimer = () => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
    }, 10);
  };

  return (
    <div className="bg-black min-h-screen h-fit flex flex-col justify-center w-screen min-w-fit py-10 md:p-12 lg:px-52 overflow-hidden">
      <div className="sm:mt-2 xl:mt-4">
        <img
          className=" h-20 lg:h-28 xl:h-[7.5rem] 2xl:h-[8.25rem] mx-auto"
          src={Logo}
          alt=""
        />
      </div>
      <div className="hidden sm:flex mx-auto md:mx-5 mt-10 2xl:mt-14 sm:justify-evenly [&>*]:hover:cursor-pointer overflow-x-scroll md:overflow-hidden  w-[calc(100vw-4px)] h-fit md:w-auto">
        <div className="p-5 relative">
          <img
            onMouseOver={() => setShowWatch(true)}
            onMouseLeave={() => setShowWatch(false)}
            onClick={() => navigate("/samwatch")}
            className={`h-72 xl:h-[22rem] 2xl:h-[26rem] min-w-[190px] mx-auto ${
              showWatch && "brightness-[0.15]"
            }`}
            src={SamWatch}
            alt=""
          />
          <img
            onMouseOver={() => setShowWatch(true)}
            onClick={() => navigate("/samwatch")}
            className={`absolute top-36 xl:top-44 2xl:top-48 left-[5rem] xl:left-[6rem] 2xl:left-[7.5rem] h-[43px] xl:h-[49.3px] 2xl:h-[55.7px] ${
              showWatch ? "block" : "hidden"
            }`}
            src={iSamWatch}
            alt=""
          />
        </div>
        <div className="p-5 relative">
          <img
            onMouseOver={() => setShowTheme(true)}
            onMouseLeave={() => setShowTheme(false)}
            onClick={() => navigate("/samtheme")}
            className={`h-72 xl:h-[22rem] 2xl:h-[26rem] min-w-[190px] mx-auto ${
              showTheme && "brightness-[0.15]"
            }`}
            src={SamTheme}
            alt=""
          />
          <img
            onMouseOver={() => setShowTheme(true)}
            onClick={() => navigate("/samtheme")}
            className={`absolute top-36 xl:top-44 2xl:top-48 left-[5rem] xl:left-[6rem] 2xl:left-[7.5rem] h-[53.6px] xl:h-[61.6px] 2xl:h-[69.6px] ${
              showTheme ? "block" : "hidden"
            }`}
            src={iSamTheme}
            alt=""
          />
        </div>
        <div className="p-5 relative">
          <img
            onMouseOver={() => setShowStudio(true)}
            onMouseLeave={() => setShowStudio(false)}
            onClick={() => navigate("/samstudio")}
            className={`h-72 xl:h-[22rem] 2xl:h-[26rem] min-w-[190px] mx-auto ${
              showStudio && "brightness-[0.15]"
            }`}
            src={SamStudio}
            alt=""
          />
          <img
            onMouseOver={() => setShowStudio(true)}
            onClick={() => navigate("/samstudio")}
            className={`absolute top-36 xl:top-44 2xl:top-48 left-[4.5rem] xl:left-[5.5rem] 2xl:left-[7rem] h-[48px] xl:h-[55.4px] 2xl:h-[62.6px] ${
              showStudio ? "block " : "hidden"
            }`}
            src={iSamStudio}
            alt=""
          />
        </div>
      </div>
      <div className="mx-20 mt-10 flex flex-col sm:hidden gap-3">
        <img
          onTouchStart={() => startPressTimer()}
          onTouchEnd={() => {
            !isLongPress.current && navigate("/samwatch");
            clearTimeout(timerRef.current);
          }}
          onClick={() => navigate("/samwatch")}
          src={SamWatch2}
          alt=""
        />
        <img
          onTouchStart={() => startPressTimer()}
          onTouchEnd={() => {
            !isLongPress.current && navigate("/samtheme");
            clearTimeout(timerRef.current);
          }}
          onClick={() => navigate("/samtheme")}
          src={SamTheme2}
          alt=""
        />
        <img
          onTouchStart={() => startPressTimer()}
          onTouchEnd={() => {
            !isLongPress.current && navigate("/samstudio");
            clearTimeout(timerRef.current);
          }}
          onClick={() => navigate("/samstudio")}
          src={SamStudio2}
          alt=""
        />
      </div>
      <p className="text-white text-center px-5 text-xs xl:text-sm mt-10">
        COPYRIGHT ©.
        <span onClick={() => clickCount()}>SAMTREE&nbsp;</span>
        ALL RIGHTS RESERVED
      </p>
    </div>
  );
};
