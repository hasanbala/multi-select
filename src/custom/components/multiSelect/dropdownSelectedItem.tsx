import React from "react";
import IconCross from "@assets/icons/cross.svg";
import styles from "./multiSelect.module.scss";

export const DropdownSelectedItem = (props: Props) => {
  const { title, id, onClickRemoveIcon } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const renderContent = () => {
    if (onClickRemoveIcon && id) {
      return (
        <img
          className={styles.removeSelectedItemContainer}
          src={IconCross}
          alt="icon"
          onClick={() => onClickRemoveIcon(id)}
        />
      );
    }

    return <></>;
  };

  return (
    <div className={styles.selectedItem} onClick={handleClick}>
      <div className={styles.text}>{title}</div>
      {renderContent()}
    </div>
  );
};

interface Props {
  title: string;
  id?: number;
  onClickRemoveIcon?: (_val: number) => void;
}
