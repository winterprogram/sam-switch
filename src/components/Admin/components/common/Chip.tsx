import clsx from "clsx";
import { MouseEventHandler } from "react";

export const Chip = ({
  isSelected,
  title,
  onClick,
}: {
  isSelected: boolean;
  title: string;
  onClick?: MouseEventHandler;
}) => {
  return (
    <>
      <span
        onClick={onClick}
        className={clsx(
          "px-4 py-2 rounded-full border border-gray-300 text-black font-semibold text-sm flex align-center w-max cursor-pointer active:bg-[#E1F6FE] transition duration-300 ease",
          isSelected && "bg-[#0EB4F3] !text-white"
        )}
      >
        {title}
      </span>
    </>
  );
};
