import { IRestateCharacters } from "@common/services/models/characters";
import classNames from "classnames";
import { DropdownOptionsItems } from "@custom/components/multiSelect/dropdownOptionsItems";
import styles from "@assets/styles/multiSelect.module.scss";

export const DropdownOptions = (props: Props) => {
  if (!props.show || !props.searchValue) {
    return null;
  }

  const handleChangeCheckbox = (check: boolean, item: IRestateCharacters) => {
    const isExistItem = props.selectedOptions.some(
      (data: IRestateCharacters) => data.id === item.id
    );

    if (!check || isExistItem) {
      props.setSelectedOptions(
        props.selectedOptions.filter((option) => option.id !== item.id)
      );

      return;
    }

    props.setSelectedOptions([...props.selectedOptions, item]);
  };

  // const renderFilteredOptions = () => {
  //   return props.options?.filter((option) =>
  //     option.name
  //       .trim()
  //       .toLocaleLowerCase("en")
  //       .includes(props.searchValue.trim().toLocaleLowerCase("en"))
  //   );
  // };

  const renderContent = () => {
    if (props?.options?.length > 0) {
      return props?.options?.map((item) => (
        <DropdownOptionsItems
          key={item.id}
          episodeLength={item.episodeLength}
          id={item.id}
          image={item.image}
          name={item.name}
          onChange={(checked) => handleChangeCheckbox(checked, item)}
          value={props.selectedOptions.some((option) => option.id === item.id)}
          emphasizedValue={props.searchValue}
        />
      ));
    }

    return <span className={styles.notFound}>Sonuç bulunamadı</span>;
  };

  return (
    <div
      className={classNames(styles.content, props.show && styles.activeContent)}
    >
      {renderContent()}
    </div>
  );
};

interface Props {
  show: boolean;
  options: IRestateCharacters[];
  selectedOptions: IRestateCharacters[];
  setSelectedOptions: (option: IRestateCharacters[]) => void;
  searchValue: string;
}
