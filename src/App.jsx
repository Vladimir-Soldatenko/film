import { useState, useEffect } from "react";
import { prop, sortBy } from "ramda";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { items } from "data";

const sortFilms = (films) => sortBy(prop("title"), films);

const App = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setFilms(sortFilms(items));
  }, []);

  return (
    <div className="ui container mt-3">
      <FilmsList films={films} />
    </div>
  );
};

export default App;
