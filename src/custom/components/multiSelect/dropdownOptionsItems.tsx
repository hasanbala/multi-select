import styles from "./multiSelect.module.scss";

export const DropdownOptionsItems = (props: Props) => {
  const renderEmphasizedName = () => {
    if (props.emphasizedValue) {
      const text = props.name.replace(
        new RegExp(props.emphasizedValue + "(?!([^<]+)?<)", "gi"),
        "<b>$&</b>"
      );

      return <span dangerouslySetInnerHTML={{ __html: text }}></span>;
    }

    return <span>{props.name}</span>;
  };

  return (
    <div className={styles.item}>
      <label className={styles.label}>
        <input
          type="checkbox"
          onChange={(e) => props.onChange(e.target.checked)}
          checked={props.value}
        />
        <img src={props.image} alt={props.name} />
        <div className={styles.title}>
          {renderEmphasizedName()}
          <span>{props.episodeLength} Episodes</span>
        </div>
      </label>
    </div>
  );
};

interface Props {
  id: number;
  name: string;
  image: string;
  episodeLength: number;
  onChange: (checked: boolean) => void;
  value: boolean;
  emphasizedValue: string;
}
