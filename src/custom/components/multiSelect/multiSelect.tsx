import { useEffect, useState } from "react";
import styles from "./multiSelect.module.scss";
import { useDropdownOptionsVisible } from "@common/hooks/useDropdownVisible";
import { DropdownOptions } from "@custom/components/multiSelect/dropdownOptions";
import { DropdownSearch } from "@custom/components/multiSelect/dropdownSearch";

export const MultiSelect = (props: Props) => {
  const { options, placeholder, emptyOptionsText } = props;

  const [filteredOptions, setFilteredOptions] = useState([] as any);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [isDropdownOptionsVisible, setIsDropdownOptionsVisible] =
    useState(false);
  const { ref: DropdownOptionsContainerRef } = useDropdownOptionsVisible(
    setIsDropdownOptionsVisible
  );

  const handleOpenDropdownOptions = () => setIsDropdownOptionsVisible(true);

  useEffect(() => {
    if (options.length) {
      setFilteredOptions(options);
    }
  }, [options.length]);

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
        setFilteredOptions={setFilteredOptions}
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
        emptyOptionsText={emptyOptionsText}
        filteredOptions={filteredOptions}
      />
    </div>
  );
};

interface Props {
  placeholder?: string;
  options: any[];
  emptyOptionsText?: string;
}
