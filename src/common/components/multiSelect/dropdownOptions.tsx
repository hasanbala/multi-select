import { IRestateCharacters } from "@common/services/models/characters";
import classNames from "classnames";
import styles from "@assets/styles/multiSelect.module.scss";

export const DropdownOptions = (props: Props) => {
  const renderContent = () => {
    if (props?.options?.length > 0) {
      return props?.options?.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            props.setSelectedOptions([item]);
            props.setInputValue(item.name);
          }}
          className={styles.item}
        >
          {item.name}
        </div>
      ));
    }

    return <></>;
  };

  return (
    <div
      className={classNames(
        styles.content,
        props?.options?.length > 0 &&
          props.inputValue.trim() !== "" &&
          props.selectedOptions.length < 1 &&
          props.isDropdownOptionsVisible &&
          styles.activeContent
      )}
    >
      {renderContent()}
    </div>
  );
};

interface Props {
  options: IRestateCharacters[];
  selectedOptions: IRestateCharacters[];
  setSelectedOptions: (option: IRestateCharacters[]) => void;
  inputValue: string;
  setInputValue: (_val: string) => void;
  isDropdownOptionsVisible: boolean;
}
