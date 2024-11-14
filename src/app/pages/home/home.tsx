import { useEffect, useState } from "react";
import { getCharacters } from "@common/services/chractersService";
import { MultiSelect } from "@custom/components/multiSelect/multiSelect";
import styles from "./home.module.scss";

export const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters("rick")
      .then((res: any) => setCharacters(res))
      .catch(() => {
        setCharacters([]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <MultiSelect
        options={characters}
        placeholder="Seçiniz"
        emptyOptionsText="There is no data"
      />
    </div>
  );
};
