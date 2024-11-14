import styles from "./multiSelect.module.scss";
import classNames from "classnames";
import { useRef } from "react";
import { DropdownSelectedItem } from "./dropdownSelectedItem";

export const DropdownSearch = (props: Props) => {
  const {
    inputValue,
    isDropdownOptionsVisible,
    selectedOptions,
    setInputValue,
    setFilteredOptions,
    setSelectedOptions,
    placeholder,
    options,
  } = props;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => searchInputRef.current?.focus();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setInputValue(term);

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredOptions(filtered);

    if (e.target.value == "") {
      setFilteredOptions(options);
    }
  };

  const handleOnClickRemoveIcon = (id: number) =>
    setSelectedOptions(selectedOptions.filter((item) => item.value !== id));

  const renderDropdownSearchIcon = () => {
    if (!options.length) {
      return <div className={styles.loading} />;
    }

    return (
      <div
        className={classNames(
          styles.arrow,
          isDropdownOptionsVisible && styles.activeArrow
        )}
      />
    );
  };

  return (
    <div className={styles.dropdownSearch} onClick={handleClick}>
      <div className={styles.wrapperSelectedOptions}>
        {selectedOptions?.slice(0, 2)?.map((option, index) => (
          <DropdownSelectedItem
            key={index}
            name={option.label}
            id={option.value}
            onClickRemoveIcon={handleOnClickRemoveIcon}
          />
        ))}
        {selectedOptions.length > 2 && (
          <DropdownSelectedItem name={`+${selectedOptions.length} ...`} />
        )}
      </div>
      <input
        className={styles.input}
        ref={searchInputRef}
        onChange={handleInputChange}
        value={inputValue}
        placeholder={placeholder ?? "Select"}
        type="text"
      />
      <div className={styles.searchIcon}>{renderDropdownSearchIcon()}</div>
    </div>
  );
};

interface Props {
  inputValue: string;
  isDropdownOptionsVisible: boolean;
  setInputValue: (_val: string) => void;
  selectedOptions: any[];
  setSelectedOptions: (_val: any[]) => void;
  placeholder?: string;
  options: any[];
  setFilteredOptions: (_val: any[]) => void;
}
