import { useEffect, useState } from "react";
import { getCharacters } from "@common/services/chractersService";
import { IRestateCharacters } from "@common/services/models/characters";
import { MultiSelect } from "@custom/components/multiSelect/multiSelect";
import styles from "./home.module.scss";

export const Home = () => {
  const [characters, setCharacters] = useState<IRestateCharacters[]>([]);

  useEffect(() => {
    getCharacters("rick")
      .then((res: IRestateCharacters[]) => setCharacters(res))
      .catch(() => {
        setCharacters([]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <MultiSelect
        options={characters}
        setOptions={setCharacters}
        placeholder="Seçiniz"
        emptyOptionsText="There is no data"
      />
    </div>
  );
};
