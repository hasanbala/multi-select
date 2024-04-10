import React from "react";
import IconCross from "@assets/icons/cross.svg";
import styles from "@assets/styles/multiSelect.module.scss";

export const DropdownOptionsSelectedItem = (props: Props) => {
  const handleRemoveItem = () => {
    if (props.id) {
      props.onClickRemoveIcon?.(props.id);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  return (
    <div className={styles.selectedItem} onClick={handleClick}>
      <span className={styles.text}>{props.title}</span>
      {props.onClickRemoveIcon && (
        <div className={styles.removeSelectedItemContainer}>
          <img src={IconCross} alt="icon" onClick={handleRemoveItem} />
        </div>
      )}
    </div>
  );
};

interface Props {
  title: string;
  id?: number;
  onClickRemoveIcon?: (_val: number) => void;
}
