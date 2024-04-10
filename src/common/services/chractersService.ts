import { ICharacters } from "./models/characters";

export const getCharacters = async (term: string) => {
  if (!term || !term.trim()) {
    return null;
  }

  const requestHeaders: HeadersInit = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  });

  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}character?name=${term}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );

  const { results } = await response.json();

  const newResults = results.map((data: ICharacters) => ({
    name: data.name,
    id: data.id,
    episodeLength: data.episode?.length,
    image: data.image,
  }));

  return newResults;
};
