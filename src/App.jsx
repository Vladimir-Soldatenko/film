import { useState, useEffect } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { items } from "data";
import FilmContext from "contexts/FilmContext";

const sortFilms = (films) =>
  sortWith([descend(prop("featured")), ascend(prop("title"))], films);

const App = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setFilms(sortFilms(items));
  }, []);

  const toggleFeatured = (id) => {
    setFilms((x) =>
      sortFilms(
        x.map((f) => (f._id === id ? { ...f, featured: !f.featured } : f))
      )
    );
  };

  const value = { toggleFeatured };
  return (
    <div className="ui container mt-3">
      <FilmContext.Provider value={value}>
        <FilmsList films={films} />
      </FilmContext.Provider>
    </div>
  );
};

export default App;
