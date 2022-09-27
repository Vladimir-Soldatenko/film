import { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { prop, sortWith, ascend, descend } from "ramda";
import _find from "lodash/find";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmContext from "contexts/FilmContext";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import api from "api";
import { FullSpinner } from "styles/app";

const sortFilms = (films) =>
  sortWith([descend(prop("featured")), ascend(prop("title"))], films);

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.films.fetchAll().then((films) => {
      setFilms(sortFilms(films));
      setLoading(false);
    });
  }, []);

  const toggleFeatured = (_id) => {
    const film = _find(films, { _id });
    return updateFilm({ ...film, featured: !film.featured });
  };

  const addFilm = (filmData) =>
    api.films.create(filmData).then((film) => {
      setFilms((x) => sortFilms([...x, { ...film }]));
    });

  const updateFilm = (film) => {
    return api.films.update(film).then((film) => {
      setFilms((x) => sortFilms(x.map((f) => (f._id === film._id ? film : f))));
    });
  };

  const saveFilm = (film) => (film._id ? updateFilm(film) : addFilm(film));

  const deleteFilm = (film) => {
    return api.films.delete(film).then(() => {
      setFilms((x) => sortFilms(x.filter((f) => f._id !== film._id)));
    });
  };

  const value = { toggleFeatured, deleteFilm };

  const location = useLocation();
  const cols = location.pathname === "/films" ? "sixteen" : "ten";

  return (
    <FilmContext.Provider value={value}>
      <div className="ui stackable grid">
        <div className="six wide column">
          <Routes>
            <Route
              path="new"
              element={<FilmForm films={films} saveFilm={saveFilm} />}
            />
            <Route
              path="edit/:_id"
              element={<FilmForm films={films} saveFilm={saveFilm} />}
            />
          </Routes>
        </div>

        <div className={`${cols} wide column`}>
          {loading ? <FullSpinner /> : <FilmsList films={films} />}
        </div>
      </div>
    </FilmContext.Provider>
  );
};

export default FilmsPage;
