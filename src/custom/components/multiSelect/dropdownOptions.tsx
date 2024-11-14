import classNames from "classnames";
import styles from "./multiSelect.module.scss";

export const DropdownOptions = (props: Props) => {
  const {
    selectedOptions,
    setSelectedOptions,
    show,
    options,
    emptyOptionsText,
    filteredOptions,
  } = props;

  if (!show) {
    return null;
  }

  const handleChangeCheckbox = (check: boolean, item: any) => {
    const isExistItem = selectedOptions.some(
      (data: any) => data.id == item.value
    );

    if (!check || isExistItem) {
      setSelectedOptions(
        selectedOptions.filter((option) => option.value !== item.value)
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

    if (!filteredOptions.length) {
      return <div className={styles.notFound}>There is no filtered data</div>;
    }

    return filteredOptions.map((item) => (
      <label
        className={classNames(
          styles.label,
          selectedOptions.some((option) => option.value == item.value) &&
            styles.activeLabel
        )}
        key={item.value}
      >
        <input
          type="checkbox"
          onChange={(e) => handleChangeCheckbox(e.target.checked, item)}
          checked={selectedOptions.some((option) => option.value == item.value)}
        />
        <span className={styles.title}>{item.label}</span>
      </label>
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
  emptyOptionsText?: string;
  filteredOptions: any[];
}
