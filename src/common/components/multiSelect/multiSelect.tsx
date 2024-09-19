import { useState } from "react";
import { IRestateCharacters } from "@common/services/models/characters";
import styles from "@assets/styles/multiSelect.module.scss";
import { useDropdownOptionsVisible } from "@common/hooks/useDropdownVisible";
import { DropdownOptions } from "@common/components/multiSelect/dropdownOptions";
import { DropdownSearch } from "@common/components/multiSelect/dropdownSearch";

export const MultiSelect = (props: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<IRestateCharacters[]>(
    []
  );

  // console.log(selectedOptions);
  const [isDropdownOptionsVisible, setIsDropdownOptionsVisible] =
    useState(false);
  const { ref } = useDropdownOptionsVisible(setIsDropdownOptionsVisible);
  const handleOpenDropdownOptions = () => setIsDropdownOptionsVisible(true);

  return (
    <div
      className={styles.container}
      ref={ref}
      onClick={handleOpenDropdownOptions}
    >
      <DropdownSearch
        inputValue={props.inputValue}
        setInputValue={props.setInputValue}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        loading={props.loading}
        searchTerm={props.searchTerm}
        setOptions={props.setOptions}
        options={props.options}
      />
      <DropdownOptions
        setInputValue={props.setInputValue}
        options={props.options}
        inputValue={props.inputValue}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isDropdownOptionsVisible={isDropdownOptionsVisible}
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
