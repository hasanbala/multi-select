import classNames from "classnames";
import styles from "./searchableInput.module.scss";
import { ISearchableInputOption } from "./helpers";
import IconUser from "@assets/icons/user.svg";

export const DropdownOptions = (props: Props) => {
  const {
    options,
    setOptions,
    selectedOption,
    setSelectedOption,
    inputValue,
    setInputValue,
    isDropdownOptionsVisible,
    isDisabled = false,
  } = props;

  const isDropdownActive =
    options.length &&
    inputValue.trim() &&
    !Object.keys(selectedOption).length &&
    isDropdownOptionsVisible;

  const handleSelect = (item: ISearchableInputOption) => {
    if (isDisabled) {
      return;
    }

    setSelectedOption(item);
    setInputValue(item.label);
    setOptions([]);
  };

  const renderContent = () => {
    if (options.length) {
      return options.map((item) => (
        <div
          key={item.value}
          onClick={() => handleSelect(item)}
          className={styles.item}
        >
          <img src={IconUser} alt="icon" />
          <span>{item.label}</span>
        </div>
      ));
    }

    return <></>;
  };

  return (
    <div
      className={classNames(
        styles.content,
        options.length && isDropdownActive && styles.activeContent
      )}
    >
      {renderContent()}
    </div>
  );
};

interface Props {
  options: ISearchableInputOption[];
  setOptions: (_val: ISearchableInputOption[]) => void;
  selectedOption: ISearchableInputOption;
  setSelectedOption: (option: ISearchableInputOption) => void;
  inputValue: string;
  setInputValue: (_val: string) => void;
  isDropdownOptionsVisible: boolean;
  isDisabled?: boolean;
}
