import { ClassNames } from "@emotion/react";

export const NoData = (props: { className?: string | "" }) => {
  return (
    <div
      className={`mx-8 mt-10 ${
        props?.className
          ? "h-[calc(100vh-108px)] md:h-[calc(100vh-112px)]"
          : "h-[calc(100vh-176px)] md:h-[calc(100vh-184px)]"
      }`}
    >
      <div className="mx-auto max-w-fit bg-slate-800 p-5 text-lg font-semibold text-white rounded-lg">
        No Data Available.
      </div>
    </div>
  );
};
