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
        searchValue={props.searchValue}
        setSearchValue={props.setSearchValue}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isDropdownOptionsVisible={isDropdownOptionsVisible}
        setIsDropdownOptionsVisible={setIsDropdownOptionsVisible}
      />
      <DropdownOptions
        options={props.options}
        searchValue={props.searchValue}
        show={isDropdownOptionsVisible}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>
  );
};

interface Props {
  options: IRestateCharacters[];
  searchValue: string;
  setSearchValue: (_val: string) => void;
  loading: boolean;
}
