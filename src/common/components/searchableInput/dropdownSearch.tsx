import styles from "./searchableInput.module.scss";
import classNames from "classnames";
import { useRef, useState } from "react";
import IconArrow from "@assets/icons/bottomArrow.svg";
import { ISearchableInputOption } from "./helpers";

export const DropdownSearch = (props: Props) => {
  const {
    options,
    inputValue,
    setInputValue,
    selectedOption,
    setSelectedOption,
    loading,
    searchTerm,
    setOptions,
    id,
    name,
    placeholder,
    isDisabled,
    isDropdownOptionsVisible,
  } = props;

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [optionIndex, setOptionIndex] = useState(0);

  const handleClick = () => searchInputRef.current?.focus();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value.trim() !== selectedOption?.label) {
      setSelectedOption({} as ISearchableInputOption);
      setOptions([]);
      setOptionIndex(0);
    }
  };

  const handleInputKeypad = (e: any) => {
    if (
      e.key == "Enter" &&
      e.target.value.trim() !== "" &&
      options.length == 1
    ) {
      setInputValue(options[optionIndex].label);
      setSelectedOption(options[optionIndex]);
      setOptions([]);
    }

    if (e.target.value.trim() == "" || options.length < 2) {
      return;
    }

    if (e.key == "ArrowDown") {
      setInputValue(options[optionIndex].label);
      setSelectedOption(options[optionIndex]);
      setOptionIndex(optionIndex + 1);
      if (optionIndex >= options.length - 1) {
        setOptionIndex(0);
      }
    }

    if (e.key == "ArrowUp") {
      setInputValue(options.reverse()[optionIndex].label);
      setSelectedOption(options[optionIndex]);
      setOptionIndex(optionIndex + 1);
      if (optionIndex >= options.reverse().length - 1) {
        setOptionIndex(0);
      }
    }

    return;
  };

  const renderDropdownSearchIcon = () => {
    const isSearchTermTriggered =
      !loading &&
      !options.length &&
      searchTerm !== inputValue &&
      inputValue.trim() &&
      !Object.keys(selectedOption).length;

    const isArrowActive = isDropdownOptionsVisible && options.length;
    // loading &&
    // inputValue.trim() &&
    // !Object.keys(selectedOption).length;

    if (isSearchTermTriggered) {
      return (
        <div className={styles.loadingWrapper}>
          <div className={styles.loading} />
        </div>
      );
    }

    return (
      <div
        className={classNames(
          styles.arrowWrapper,
          isArrowActive && styles.activeArrow
        )}
      >
        <img src={IconArrow} alt="icon" />
      </div>
    );
  };

  return (
    <div className={styles.dropdownSearch} onClick={handleClick}>
      <input
        id={id}
        name={name}
        type="text"
        ref={searchInputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeypad}
        placeholder={placeholder ?? "Select"}
        data-id={selectedOption?.value ?? ""}
        disabled={isDisabled}
      />
      {renderDropdownSearchIcon()}
    </div>
  );
};

interface Props {
  options: ISearchableInputOption[];
  setOptions: (_val: ISearchableInputOption[]) => void;
  searchTerm: string;
  inputValue: string;
  setInputValue: (_val: string) => void;
  selectedOption: ISearchableInputOption;
  setSelectedOption: (option: ISearchableInputOption) => void;
  loading: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isDropdownOptionsVisible: boolean;
}
