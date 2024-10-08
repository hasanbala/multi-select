import { useState } from "react";
import { SearchableInput } from "@common/components/searchableInput/searchableInput";
import styles from "./home.module.scss";
import { getCharacters } from "@common/services/chractersService";

export const Home = () => {
  const [selectedOption, setSelectedOption] = useState({
    label: "Beth Smith",
    value: 38,
  } as any);

  console.log(selectedOption);

  return (
    <div className={styles.container}>
      <SearchableInput
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        placeholder="Select an option"
        operation={getCharacters}
        debounceTime={1000}
        isDisabled={false}
        className={styles.searchableInput}
      />
    </div>
  );
};
