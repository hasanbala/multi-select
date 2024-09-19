import { IRestateCharacters } from "@common/services/models/characters";
// import classNames from "classnames";
// import styles from "@assets/styles/multiSelect.module.scss";

export const DropdownOptions = (props: Props) => {
  const renderContent = () => {
    if (props?.options?.length > 0) {
      return props?.options?.map((item) => (
        <div
          className="px-2 py-1 cursor-pointer bg-gray-100 mb-1 rounded hover:bg-gray-300"
          key={item.id}
          onClick={() => {
            props.setSelectedOptions([item]);
            props.setInputValue(item.name);
          }}
        >
          {item.name}
        </div>
      ));
    }

    return <></>;
  };

  return (
    <div
      className={`absolute top-full left-0 w-full shadow-md border border-gray-200 rounded-lg p-1.5 min-h-[100px] max-h-[300px] overflow-auto ${
        props?.options?.length > 0 &&
        props.inputValue.trim() !== "" &&
        props.selectedOptions.length < 1 &&
        props.isDropdownOptionsVisible
          ? "block"
          : "hidden"
      }`}
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
