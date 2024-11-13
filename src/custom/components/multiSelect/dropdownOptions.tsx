import { IRestateCharacters } from "@common/services/models/characters";
import classNames from "classnames";
import { DropdownOptionsItems } from "@custom/components/multiSelect/dropdownOptionsItems";
import styles from "./multiSelect.module.scss";

export const DropdownOptions = (props: Props) => {
  const {
    inputValue,
    selectedOptions,
    setSelectedOptions,
    show,
    options,
    emptyOptionsText,
  } = props;

  if (!show) {
    return null;
  }

  const handleChangeCheckbox = (check: boolean, item: IRestateCharacters) => {
    const isExistItem = selectedOptions.some(
      (data: IRestateCharacters) => data.id === item.id
    );

    if (!check || isExistItem) {
      setSelectedOptions(
        selectedOptions.filter((option) => option.id !== item.id)
      );

      return;
    }

    setSelectedOptions([...selectedOptions, item]);
  };

  const renderContent = () => {
    if (!options.length) {
      return (
        <div className={styles.notFound}>{emptyOptionsText ?? "None"}</div>
      );
    }

    return options?.map((item) => (
      <DropdownOptionsItems
        key={item.id}
        episodeLength={item.episodeLength}
        id={item.id}
        image={item.image}
        name={item.name}
        onChange={(checked) => handleChangeCheckbox(checked, item)}
        value={selectedOptions.some((option) => option.id === item.id)}
        emphasizedValue={inputValue}
      />
    ));
  };

  return (
    <div className={classNames(styles.content, show && styles.activeContent)}>
      {renderContent()}
    </div>
  );
};

interface Props {
  show: boolean;
  options: any[];
  selectedOptions: any[];
  setSelectedOptions: (option: any[]) => void;
  inputValue: string;
  emptyOptionsText?: string;
}
