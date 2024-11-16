import React from "react";
import IconCross from "@assets/icons/cross.svg";
// import styles from "./multiSelect.module.scss";

export const DropdownSelectedItem = (props: Props) => {
  const { name, id, onClickRemoveIcon } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const renderContent = () => {
    if (onClickRemoveIcon && id) {
      return (
        <img
          className="w-3 h-3 cursor-pointer"
          src={IconCross}
          alt="icon"
          onClick={() => onClickRemoveIcon(id)}
        />
      );
    }

    return <></>;
  };

  return (
    <div
      className="flex items-center justify-between w-max px-2.5 py-1.5 rounded-lg bg-[#0000000f] text-[#454745] min-w-[60px] max-w-[120px] h-[30px]"
      onClick={handleClick}
    >
      <div className="w-max whitespace-nowrap  whitespace-nowrap overflow-ellipsis overflow-hidden text-13 truncate mr-1.5  max-w-[120px]">
        {name}
      </div>
      {renderContent()}
    </div>
  );
};

interface Props {
  name: string;
  id?: number;
  onClickRemoveIcon?: (_val: number) => void;
  ref?: any;
}
