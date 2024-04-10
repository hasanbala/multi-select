import classNames from "classnames";
import styles from "./input.module.scss";

export const Input = (props: Props) => {
  const { searchInputRef, onChange, value, placeholder, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <input
        ref={searchInputRef}
        onChange={onChange}
        value={value}
        placeholder={placeholder ? placeholder : "Choose.."}
        type="text"
      />
    </div>
  );
};

interface Props {
  searchInputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  className?: string;
}
