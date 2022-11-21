import Logo from "../../../../assets/icons/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { INavigation } from "../../utils/interfaces";
import { ThemeName } from "../../utils/enums";
import iSamWatch from "../../../../assets/icons/watch_icon_1.png";
import iSamTheme from "../../../../assets/icons/theme_icon_1.png";
import iSamStudio from "../../../../assets/icons/studio_icon_1.png";
import iSamAbout from "../../../../assets/icons/samabout_icon_1.png";
import SamWatch from "../../../../assets/icons/watch_1.png";
import SamTheme from "../../../../assets/icons/theme_1.png";
import SamStudio from "../../../../assets/icons/studio_1.png";
import SamAbout from "../../../../assets/icons/samabout_1.png";

export const Navigation = (props: INavigation) => {
  const [themeName, setThemeName] = useState(""),
    navigate = useNavigate(),
    { name } = props,
    setGradient = () => {
      switch (name) {
        case ThemeName.SAM_WATCH:
          return "from-blue-800 to-[#002b71]";
        case ThemeName.SAM_THEME:
          return "from-teal-400 to-sky-600";
        case ThemeName.SAM_STUDIO:
          return "from-orange-500 to-rose-600";
        default:
          return "from-sky-600 to-[#006cbb]";
      }
    };

  useEffect(() => {
    setThemeName(name);
  }, [name]);
  return (
    <nav
      className={`flex w-screen p-4 items-center justify-center [&>*]:hover:cursor-pointer max-w-screen bg-gradient-to-r ${setGradient()}`}
    >
      <div className="w-fit mx-3" onClick={() => navigate("/samwatch")}>
        <img
          className={`h-7 md:h-8 object-contain max-w-fit ${
            themeName === ThemeName.SAM_WATCH && "hidden"
          }`}
          src={iSamWatch}
          alt=""
        />
        <img
          className={`h-[30px] md:h-[34px] object-contain max-w-fit ${
            themeName !== ThemeName.SAM_WATCH && "hidden"
          }`}
          src={SamWatch}
          alt=""
        />
      </div>
      <div className="w-fit mx-3" onClick={() => navigate("/samtheme")}>
        <img
          className={`h-9 md:h-10 object-contain max-w-fit ${
            themeName === ThemeName.SAM_THEME && "hidden"
          }`}
          src={iSamTheme}
          alt=""
        />
        <img
          className={`h-[30px] md:h-[34px] my-[3px] object-contain max-w-fit ${
            themeName !== ThemeName.SAM_THEME && "hidden"
          }`}
          src={SamTheme}
          alt=""
        />
      </div>
      <div className="w-fit mx-3" onClick={() => navigate("/samstudio")}>
        <img
          className={`h-8 md:h-9 object-contain max-w-fit ${
            themeName === ThemeName.SAM_STUDIO && "hidden"
          }`}
          src={iSamStudio}
          alt=""
        />
        <img
          className={`h-[30px] md:h-[34px] object-contain max-w-fit ${
            themeName !== ThemeName.SAM_STUDIO && "hidden"
          }`}
          src={SamStudio}
          alt=""
        />
      </div>
      <div className="w-fit mx-3" onClick={() => navigate("/samabout")}>
        <img
          className={`h-7 md:h-8 object-contain max-w-fit ${
            themeName === ThemeName.SAM_ABOUT && "hidden"
          }`}
          src={iSamAbout}
          alt=""
        />
        <img
          className={`h-[30px] md:h-[34px] object-contain max-w-fit ${
            themeName !== ThemeName.SAM_ABOUT && "hidden"
          }`}
          src={SamAbout}
          alt=""
        />
      </div>
    </nav>
  );
};
