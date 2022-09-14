import { useState, useEffect } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import { generate as id } from "shortid";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { items } from "data";
import FilmContext from "contexts/FilmContext";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import TopNavigation from "components/TopNavigation";

const sortFilms = (films) =>
  sortWith([descend(prop("featured")), ascend(prop("title"))], films);

const App = () => {
  const [films, setFilms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState({});

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

  const showForm = (e) => {
    setShowAddForm(true);
    setSelectedFilm({});
  };
  const hideForm = (e) => {
    setShowAddForm(false);
    setSelectedFilm({});
  };

  const addFilm = (film) => {
    setFilms((x) => sortFilms([...x, { ...film, _id: id() }]));
    hideForm();
  };
  const updateFilm = (film) => {
    setFilms((x) => sortFilms(x.map((f) => (f._id === film._id ? film : f))));
    hideForm();
  };

  const saveFilm = (film) => (film._id ? updateFilm(film) : addFilm(film));

  const selectedFilmForEdit = (selectedFilm) => {
    setSelectedFilm(selectedFilm);
    setShowAddForm(true);
  };

  const cols = showAddForm ? "ten" : "sixteen";

  const value = { toggleFeatured, selectedFilmForEdit };
  return (
    <div className="ui container mt-3">
      <FilmContext.Provider value={value}>
        <TopNavigation showForm={showForm} />

        <div className="ui stackable grid">
          {showAddForm && (
            <div className="six wide column">
              <FilmForm
                film={selectedFilm}
                saveFilm={saveFilm}
                hideForm={hideForm}
              />
            </div>
          )}

          <div className={`${cols} wide column`}>
            <FilmsList films={films} />
          </div>
        </div>
      </FilmContext.Provider>
    </div>
  );
};

export default App;
