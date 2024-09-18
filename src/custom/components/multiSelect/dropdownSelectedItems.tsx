import { IRestateCharacters } from "@common/services/models/characters";
import { DropdownSelectedItem } from "./dropdownSelectedItem";

export const DropdownOptionsSelectedItems = (props: Props) => {
  const handleOnClickRemoveIcon = (id: number) =>
    props.setSelectedOptions(
      props.selectedOptions.filter((item) => item.id !== id)
    );

  return (
    <>
      {props.selectedOptions?.slice(0, 2)?.map((option) => (
        <DropdownSelectedItem
          key={option.id}
          title={option.name}
          id={option.id}
          onClickRemoveIcon={handleOnClickRemoveIcon}
        />
      ))}
      {props.selectedOptions.length > 2 && (
        <DropdownSelectedItem title={`+${props.selectedOptions.length}...`} />
      )}
    </>
  );
};

interface Props {
  selectedOptions: IRestateCharacters[];
  setSelectedOptions: (option: IRestateCharacters[]) => void;
}
