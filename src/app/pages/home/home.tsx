import { useEffect, useState } from "react";
import { getCharacters } from "@common/services/chractersService";
import { MultiSelect } from "@custom/components/multiSelect/multiSelect";
// import styles from "./home.module.scss";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedValues, setSelectedValues] = useState([] as any);

  useEffect(() => {
    getCharacters("rick")
      .then((res: any) => {
        console.log(res);
        setCharacters(res);
      })
      .catch(() => {
        setCharacters([]);
      });
  }, []);

  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full">
      <MultiSelect
        options={characters}
        placeholder="Seçiniz"
        emptyOptionsText="There is no data"
        selectedOptions={selectedValues}
        setSelectedOptions={setSelectedValues}
      />
    </div>
  );
};
