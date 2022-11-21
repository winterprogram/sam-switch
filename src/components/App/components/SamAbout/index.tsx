import { ThemeName } from "../../utils/enums";
import { Navigation } from "../NavigationBar";
import Logo from "../../../../assets/icons/logowithname.svg";
import { useNavigate } from "react-router-dom";

export const SamAbout = () => {
  const navigate = useNavigate();
  var count = 0;
  const clickCount = () => {
    count++;
    if (count === 10) navigate("/login");
  };
  return (
    <div className="bg-black min-h-screen h-fit w-screen">
      <Navigation name={ThemeName.SAM_ABOUT} />
      <div className="w-fit sm:w-[28rem] xl:w-[32rem] mx-10 sm:mx-auto text-center text-white">
        <div className="mt-10 xl:mt-16">
          <img
            onClick={() => clickCount()}
            className=" h-14 lg:h-14 xl:h-16 2xl:h-20 mx-auto"
            src={Logo}
            alt=""
          />
        </div>
        <div className="sm:mt-16 mt-10 text-xl xl:text-2xl">
          <span className="text-sky-500">불편함을 해결하는</span>
          &nbsp; 아이디어에서 시작합니다. Samtree takes into account ideas
          &nbsp;
          <span className="text-sky-500">
            to refine all your inconveniences.
          </span>
        </div>
        <div className="text-sm xl:text-base flex flex-col gap-10 mt-10 sm:mt-16 pb-6">
          <span>
            Samtree는 항상 고객의 소리에 귀기울이며,
            <br /> 그곳에서 출발하여 Application과 디자인을 개발하고 있습니다.
            <br /> We are always open to listening to your feedback and making
            applications and designs based on them.
          </span>
          <span>
            끝없는 개선과 새로운 아이디어로 많은 사람들에게 만족을 주고,
            <br /> 그 만족을 나무처럼 키워가는 기업입니다.
            <br /> We are a tree that grows by providing you with new ideas and
            continuous improvement that leads you to be satisfied.
          </span>
          <span>
            제품의 새로운 만족을 드리기 위해 항상 생각하고,
            <br /> 듣는 Samtree가 되도록 노력하고 있습니다.
            <br /> We will always keep endeavoring to provide you with sustained
            and satisfying products.
          </span>
          <span className="text-lg xl:text-xl font-bold">
            help@isamtree.com
          </span>
        </div>
      </div>
    </div>
  );
};
