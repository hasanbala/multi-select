import styles from "@assets/styles/multiSelect.module.scss";
import { DropdownOptionsSelectedItems } from "@custom/components/multiSelect/dropdownSelectedItems";
import { IRestateCharacters } from "@common/services/models/characters";
import classNames from "classnames";
import { useRef } from "react";
import IconArrow from "@assets/icons/arrow.svg";
import { Input } from "@common/components/input/input";

export const DropdownSearch = (props: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // if (props.selectedOptions.length <= 0) {
    //   props.setIsDropdownOptionsVisible(!props.isDropdownOptionsVisible);
    //   e.stopPropagation();
    //   return;
    // }

    searchInputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setSearchValue(e.target.value);

  const renderDropdownSearchIcon = () => {
    // console.log(!props.loading);
    // console.log(props.inputValue);
    // console.log(props.searchTerm);
    if (!props.loading && props.inputValue !== props.searchTerm) {
      return <div className={styles.loading} />;
    }

    return (
      <div
        className={classNames(
          styles.arrowWrapper,
          props.inputValue &&
            props.isDropdownOptionsVisible &&
            styles.activeArrow
        )}
      >
        <img src={IconArrow} alt="icon" />
      </div>
    );
  };

  return (
    <div className={styles.dropdownSearch} onClick={handleClick}>
      <div className={styles.wrapperSelectedOptions}>
        <DropdownOptionsSelectedItems
          selectedOptions={props.selectedOptions}
          setSelectedOptions={props.setSelectedOptions}
        />
      </div>
      <Input
        searchInputRef={searchInputRef}
        onChange={handleInputChange}
        value={props.inputValue}
        placeholder="Select"
        className={styles.input}
      />
      {renderDropdownSearchIcon()}
    </div>
  );
};

interface Props {
  inputValue: string;
  isDropdownOptionsVisible: boolean;
  setSearchValue: (_val: string) => void;
  selectedOptions: IRestateCharacters[];
  setSelectedOptions: (_val: IRestateCharacters[]) => void;
  setIsDropdownOptionsVisible: (_val: boolean) => void;
  loading: boolean;
  searchTerm: string;
}
