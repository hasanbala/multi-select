import { useEffect, useState } from "react";
import styles from "./searchableInput.module.scss";
import { useDropdownOptionsVisible } from "@common/components/searchableInput/useDropdownVisible";
import { DropdownOptions } from "@common/components/searchableInput/dropdownOptions";
import { DropdownSearch } from "@common/components/searchableInput/dropdownSearch";
import { useDebounce } from "./useDebounce";
import { ISearchableInputOption } from "./helpers";
import classNames from "classnames";

export const SearchableInput = (props: Props) => {
  const {
    selectedOption,
    setSelectedOption,
    operation,
    debounceTime,
    placeholder,
    isDisabled = false,
    id,
    name,
    className,
  } = props;

  const [inputValue, setInputValue] = useState(selectedOption?.label ?? "");
  const { searchTerm } = useDebounce(inputValue, debounceTime ?? 1000);
  const [options, setOptions] = useState<ISearchableInputOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOptionsVisible, setIsDropdownOptionsVisible] =
    useState(false);
  const { ref } = useDropdownOptionsVisible(setIsDropdownOptionsVisible);

  const handleOpenDropdownOptions = () => setIsDropdownOptionsVisible(true);

  useEffect(() => {
    setLoading(false);
    if (
      inputValue.trim() &&
      searchTerm == inputValue &&
      !Object.values(selectedOption).length
    ) {
      operation(searchTerm)
        .then((res: any) =>
          setOptions([
            ...res.map((item: any) => ({ value: item.id, label: item.name })),
          ])
        )
        .catch((e) => {
          console.warn(e);
          setOptions([]);
        })
        .finally(() => {
          setLoading(true);
        });
    }
  }, [inputValue, searchTerm, operation, selectedOption]);

  return (
    <div
      className={classNames(styles.container, className)}
      ref={ref}
      onClick={handleOpenDropdownOptions}
    >
      <DropdownSearch
        id={id}
        name={name}
        loading={loading}
        searchTerm={searchTerm}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={options}
        setOptions={setOptions}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isDropdownOptionsVisible={isDropdownOptionsVisible}
      />
      <DropdownOptions
        options={options}
        setOptions={setOptions}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isDropdownOptionsVisible={isDropdownOptionsVisible}
        isDisabled={isDisabled}
      />
    </div>
  );
};

interface Props {
  selectedOption: any;
  setSelectedOption: (_val: any) => void;
  operation: (e?: any) => Promise<any>;
  debounceTime?: number;
  placeholder?: string;
  isDisabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}
