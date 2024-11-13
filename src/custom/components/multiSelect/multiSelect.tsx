import { useState } from "react";
import { IRestateCharacters } from "@common/services/models/characters";
import styles from "./multiSelect.module.scss";
import { useDropdownOptionsVisible } from "@common/hooks/useDropdownVisible";
import { DropdownOptions } from "@custom/components/multiSelect/dropdownOptions";
import { DropdownSearch } from "@custom/components/multiSelect/dropdownSearch";

export const MultiSelect = (props: Props) => {
  const { options, setOptions, placeholder, emptyOptionsText } = props;

  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<IRestateCharacters[]>(
    []
  );
  const [isDropdownOptionsVisible, setIsDropdownOptionsVisible] =
    useState(false);
  const { ref: DropdownOptionsContainerRef } = useDropdownOptionsVisible(
    setIsDropdownOptionsVisible
  );

  const handleOpenDropdownOptions = () => setIsDropdownOptionsVisible(true);

  return (
    <div
      className={styles.container}
      ref={DropdownOptionsContainerRef}
      onClick={handleOpenDropdownOptions}
    >
      <DropdownSearch
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isDropdownOptionsVisible={isDropdownOptionsVisible}
        setOptions={setOptions}
        placeholder={placeholder}
        inputValue={inputValue}
        setInputValue={setInputValue}
        options={options}
      />
      <DropdownOptions
        options={options}
        show={isDropdownOptionsVisible}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        inputValue={inputValue}
        emptyOptionsText={emptyOptionsText}
      />
    </div>
  );
};

interface Props {
  placeholder?: string;
  options: any[];
  setOptions: (_val: any[]) => void;
  emptyOptionsText?: string;
}
