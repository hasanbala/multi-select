import { useEffect, useState } from "react";
import { getCharacters } from "@common/services/chractersService";
import { IRestateCharacters } from "@common/services/models/characters";
import { MultiSelect } from "@common/components/multiSelect/multiSelect";
import styles from "./home.module.scss";
import { useDebounce } from "@common/hooks/useDebounce";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<IRestateCharacters[]>([]);
  const [inputValue, setSearchValue] = useState("");
  const { searchTerm } = useDebounce(inputValue, 500);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      setLoading(false);
      getCharacters(searchTerm)
        .then((res: IRestateCharacters[]) => setCharacters(res))
        .catch((err: any) => console.warn(err))
        .finally(() => {
          setLoading(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchTerm === inputValue]);

  useEffect(
    () => {
      if (inputValue === "") {
        console.log("lalal");
        setCharacters([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm, searchTerm === inputValue]
  );

  return (
    <div className={styles.container}>
      <h3>This is a Home Page</h3>
      <MultiSelect
        options={characters}
        inputValue={inputValue}
        setSearchValue={setSearchValue}
        loading={loading}
        searchTerm={searchTerm}
      />
    </div>
  );
};
