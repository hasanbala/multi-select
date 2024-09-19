// import styles from "@assets/styles/multiSelect.module.scss";
import { IRestateCharacters } from "@common/services/models/characters";
// import classNames from "classnames";
import { useRef } from "react";
import IconArrow from "@assets/icons/arrow.svg";

export const DropdownSearch = (props: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => searchInputRef.current?.focus();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setInputValue(e.target.value);

    if (
      e.target.value == "" ||
      e.target.value !== props.selectedOptions[0]?.name
    ) {
      props.setSelectedOptions([]);
      props.setOptions([]);
    }
  };

  const renderDropdownSearchIcon = () => {
    if (
      !props.loading &&
      props.inputValue !== props.searchTerm &&
      props.inputValue.trim()
    ) {
      return (
        <div className="w-4 h-4 relative animate-spin bg-contain bg-[url('/src/assets/icons/loading.jpeg')]" />
      );
    }

    return (
      <div
        className={`w-4 absolute right-1.5 top-4 transition-all ease-in-out ${
          props.options.length > 0 &&
          props.inputValue.trim() !== "" &&
          props.selectedOptions.length < 1 &&
          "rotate-180"
        }`}
      >
        <img src={IconArrow} alt="icon" />
      </div>
    );
  };

  return (
    <div
      className="flex items-center h-full border border-gray-300 rounded-lg overflow-hidden max-w-full px-2 relative"
      onClick={handleClick}
    >
      <input
        className="w-full h-full bg-white text-sm ml-1.5 outline-none"
        ref={searchInputRef}
        onChange={handleInputChange}
        value={props.inputValue}
        placeholder={"Select"}
        type="text"
      />
      {renderDropdownSearchIcon()}
    </div>
  );
};

interface Props {
  options: IRestateCharacters[];
  inputValue: string;
  setInputValue: (_val: string) => void;
  selectedOptions: IRestateCharacters[];
  setSelectedOptions: (option: IRestateCharacters[]) => void;
  loading: boolean;
  searchTerm: string;
  setOptions: (_val: IRestateCharacters[]) => void;
}
