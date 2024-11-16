import "./custom.scss";

export const DropdownOptions = (props: Props) => {
  const {
    selectedOptions,
    setSelectedOptions,
    show,
    options,
    emptyOptionsText,
    filteredOptions,
    dropdownSearchHeight,
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
        <div className="grid justify-center">{emptyOptionsText ?? "None"}</div>
      );
    }

    if (!filteredOptions.length) {
      return (
        <div className="grid justify-center">There is no filtered data</div>
      );
    }

    return filteredOptions.map((item) => (
      <label
        className={`flex items-center gap-2 cursor-pointer text-[#454745] rounded-lg text-sm py-1 px-1.5 overflow-hidden leading-[24px] ${
          selectedOptions.some((option) => option.value == item.value)
            ? "bg-[#f3f3f3]"
            : ""
        } hover:bg-[#e2e2e2]`}
        key={item.value}
      >
        <input
          className="checkbox-input"
          type="checkbox"
          onChange={(e) => handleChangeCheckbox(e.target.checked, item)}
          checked={selectedOptions.some((option) => option.value == item.value)}
        />
        <span className="text-sm">{item.label}</span>
      </label>
    ));
  };

  return (
    <div
      className={
        show
          ? `absolute top-[${dropdownSearchHeight}px] left-0 w-full shadow-[0_0_10px_5px_rgba(0,0,0,0.07)] grid gap-y-1.5 max-h-[300px] overflow-auto rounded-lg border border-[#ddd] p-1`
          : `absolute top-[${dropdownSearchHeight}px] left-0 w-full shadow-[0_0_10px_5px_rgba(0,0,0,0.07)] hidden rounded-lg border border-[#ddd] p-1 max-h-[300px] overflow-auto my-2`
      }
    >
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
  dropdownSearchHeight: number;
}
