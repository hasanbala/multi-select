// import styles from "./multiSelect.module.scss";
// import classNames from "classnames";
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
    selectedItemRef,
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
      return (
        <div className="w-4 h-4 animate-spin bg-contain bg-[url('/src/assets/icons/loading.jpeg')]" />
      );
    }

    return (
      <div
        className={`w-4 h-4 bg-[url('/src/assets/icons/arrow.svg')] bg-contain bg-no-repeat transition-all duration-300 ${
          isDropdownOptionsVisible ? "rotate-180" : ""
        }`}
      />
    );
  };

  return (
    <div
      className="flex h-max overflow-y-auto w-full items-center border border-[#d9d9d9] rounded-lg px-2.5 py-1"
      onClick={handleClick}
      ref={selectedItemRef}
    >
      <div className="h-max overflow-y-auto w-full items-center">
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((option, index) => (
            <DropdownSelectedItem
              key={index}
              name={option.label}
              id={option.value}
              onClickRemoveIcon={handleOnClickRemoveIcon}
            />
          ))}
        </div>
        <input
          className="w-full ml-2 bg-white text-sm h-10 outline-none"
          ref={searchInputRef}
          onChange={handleInputChange}
          value={inputValue}
          placeholder={!selectedOptions.length ? placeholder ?? "Select" : ""}
          type="text"
        />
      </div>
      <div className="relative">{renderDropdownSearchIcon()}</div>
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
  selectedItemRef: any;
}
