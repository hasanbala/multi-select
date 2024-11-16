import { useEffect, useRef, useState } from "react";
// import styles from "./multiSelect.module.scss";
import { useDropdownOptionsVisible } from "@common/hooks/useDropdownVisible";
import { DropdownOptions } from "@custom/components/multiSelect/dropdownOptions";
import { DropdownSearch } from "@custom/components/multiSelect/dropdownSearch";

export const MultiSelect = (props: Props) => {
  const {
    options,
    placeholder,
    emptyOptionsText,
    selectedOptions,
    setSelectedOptions,
  } = props;

  const [filteredOptions, setFilteredOptions] = useState([] as any);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOptionsVisible, setIsDropdownOptionsVisible] =
    useState(false);
  const { ref: DropdownOptionsContainerRef } = useDropdownOptionsVisible(
    setIsDropdownOptionsVisible
  );

  const selectedItemRef = useRef<any>(null);
  const [dropdownSearchHeight, setDropdownSearchHeight] = useState(0);

  const handleOpenDropdownOptions = () => setIsDropdownOptionsVisible(true);

  useEffect(() => {
    if (options.length) {
      setFilteredOptions(options);
    }
  }, [options.length]);

  useEffect(() => {
    const updateOffsetHeight = () => {
      if (selectedItemRef.current) {
        setDropdownSearchHeight(selectedItemRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", updateOffsetHeight);
    updateOffsetHeight();

    return () => {
      window.removeEventListener("resize", updateOffsetHeight);
    };
  }, [selectedOptions]);

  return (
    <div
      className="relative w-[300px] h-10 bg-white z-[10000]"
      ref={DropdownOptionsContainerRef}
      onClick={handleOpenDropdownOptions}
    >
      <DropdownSearch
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isDropdownOptionsVisible={isDropdownOptionsVisible}
        setFilteredOptions={setFilteredOptions}
        placeholder={placeholder}
        inputValue={inputValue}
        setInputValue={setInputValue}
        options={options}
        selectedItemRef={selectedItemRef}
      />
      <DropdownOptions
        options={options}
        show={isDropdownOptionsVisible}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        emptyOptionsText={emptyOptionsText}
        filteredOptions={filteredOptions}
        dropdownSearchHeight={dropdownSearchHeight}
      />
    </div>
  );
};

interface Props {
  placeholder?: string;
  options: any[];
  emptyOptionsText?: string;
  selectedOptions: any[];
  setSelectedOptions: (_val: any) => void;
}
