import { useEffect, useState } from "react";
import { getCharacters } from "@common/services/chractersService";
import { IRestateCharacters } from "@common/services/models/characters";
import { MultiSelect } from "@common/components/multiSelect/multiSelect";
import styles from "./home.module.scss";
import { useDebounce } from "@common/hooks/useDebounce";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<IRestateCharacters[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { value } = useDebounce(searchValue, 500);

  useEffect(() => {
    getCharacters(value)
      .then((res: IRestateCharacters[]) => setCharacters(res))
      .catch((err: any) => console.warn(err))
      .finally(() => {
        setLoading(true);
      });
  }, [value, value === searchValue]);

  return (
    <div className={styles.container}>
      <h3>This is a Home Page</h3>
      <MultiSelect
        options={characters}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        loading={loading}
      />
    </div>
  );
};
