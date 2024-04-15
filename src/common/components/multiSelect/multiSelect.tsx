import { useState } from "react";
import { IRestateCharacters } from "@common/services/models/characters";
import styles from "@assets/styles/multiSelect.module.scss";
import { useDropdownOptionsVisible } from "@common/hooks/useDropdownVisible";
import { DropdownOptions } from "@custom/components/multiSelect/dropdownOptions";
import { DropdownSearch } from "@custom/components/multiSelect/dropdownSearch";

export const MultiSelect = (props: Props) => {
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
        inputValue={props.inputValue}
        setInputValue={props.setInputValue}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isDropdownOptionsVisible={isDropdownOptionsVisible}
        setIsDropdownOptionsVisible={setIsDropdownOptionsVisible}
        loading={props.loading}
        searchTerm={props.searchTerm}
        setOptions={props.setOptions}
      />
      <DropdownOptions
        options={props.options}
        inputValue={props.inputValue}
        show={isDropdownOptionsVisible}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        loading={props.loading}
        searchTerm={props.searchTerm}
      />
    </div>
  );
};

interface Props {
  options: IRestateCharacters[];
  inputValue: string;
  setInputValue: (_val: string) => void;
  loading: boolean;
  searchTerm: string;
  setOptions: (_val: IRestateCharacters[]) => void;
}
