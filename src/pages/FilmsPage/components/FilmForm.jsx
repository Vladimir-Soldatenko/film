import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import _find from "lodash/find";
import PropTypes from "prop-types";
import FormMessage from "components/FormMessage";
import UploadImage from "components/UploadImage";
import { useIsAuth } from "contexts/UserContext";

const initialData = {
  _id: null,
  title: "",
  img: "",
  description: "",
  director: "",
  duration: "",
  price: "",
  featured: false,
};

const FilmForm = ({ saveFilm, films }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { _id } = useParams();

  const { isAdmin } = useIsAuth();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/films");
    }
  }, [isAdmin, navigate]);

  const film = _find(films, { _id }) || {};

  if (film._id && film._id !== data._id) {
    setData(film);
  }
  if (!film._id && data._id) {
    setData(initialData);
  }

  const updatePhoto = (img) => {
    setData((x) => ({ ...x, img }));
    setErrors((x) => ({ ...x, img: "" }));
  };

  const handleStringChange = (e) => {
    setData((x) => ({ ...x, [e.target.name]: e.target.value }));
    setErrors((x) => ({ ...x, [e.target.name]: "" }));
  };
  const handleCheckboxChange = (e) => {
    setData((x) => ({ ...x, [e.target.name]: e.target.checked }));
  };

  const handleNumberChange = (e) => {
    let value = parseFloat(e.target.value);
    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    setData((x) => ({ ...x, [e.target.name]: value }));
    setErrors((x) => ({ ...x, [e.target.name]: "" }));
  };

  const validate = (data) => {
    const errors = {};
    if (!data.title) errors.title = "Title cannot be blank";
    if (!data.img) errors.img = "img cannot be blank";
    if (!data.description) errors.description = "description cannot be blank";
    if (!data.director) errors.director = "Director cannot be blank";
    if (!data.price) errors.price = "price cannot be blank";
    if (!data.duration) errors.duration = "duration cannot be blank";
    if (!data.title) errors.title = "Title cannot be blank";
    if (parseInt(data.price) <= 0) errors.price = "Error price";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      saveFilm(data)
        .then(() => {
          navigate("/films");
        })
        .catch((err) => {
          setErrors(err.response.data.errors);
          setLoading(false);
        });
      setData(initialData);
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="film-form"
      className={`ui form ${loading && "loading"}`}
    >
      <div className="ui  grid mb-3">
        {/*  ===================🌹 two column row START */}
        <div className="two column row">
          {/*  ===================🌹 left column START */}
          <div className="ten wide column">
            {/*  ===================🌹 title START */}
            <div className={`field column ${errors.title ? "error" : ""}`}>
              <label htmlFor="title">Film title</label>
              <input
                value={data.title}
                onChange={handleStringChange}
                type="text"
                name="title"
                id="title"
                placeholder="film title"
              />
              {errors.title && <FormMessage>{errors.title}</FormMessage>}
            </div>
            {/*  title END  🌹 ===================*/}

            {/* img field START */}
            <div className={`field img-grid ${errors.img ? "error" : ""}`}>
              <label htmlFor="img">Image</label>
              <input
                value={data.img}
                onChange={handleStringChange}
                name="img"
                id="img"
              />
              {errors.img && <FormMessage>{errors.img}</FormMessage>}
            </div>
            {/* img field END */}
            {/* description START */}

            <div
              className={`column row field ${
                errors.description ? "error" : ""
              }`}
            >
              <label htmlFor="description">Film description</label>
              <textarea
                value={data.description}
                onChange={handleStringChange}
                name="description"
                id="description"
                placeholder="film description"
              ></textarea>
              {errors.description && (
                <FormMessage>{errors.description}</FormMessage>
              )}
            </div>
            {/* description END */}
          </div>
          {/* left column END 🌹 =================== */}

          {/* img box START */}
          <div className="six wide column">
            <UploadImage img={data.img} updatePhoto={updatePhoto} />
          </div>
          {/* img box END */}
        </div>
        {/*   two column row END 🌹=================== */}
        {/* three columns START */}
        <div className="three column row mb-3">
          {/* director START */}

          <div className={`column field ${errors.director ? "error" : ""}`}>
            <label htmlFor="director">Director</label>
            <input
              value={data.director}
              onChange={handleStringChange}
              type="text"
              name="director"
              id="director"
              placeholder="film director"
            />
            {errors.director && <FormMessage>{errors.director}</FormMessage>}
          </div>
          {/* director END */}
          {/* duration START */}
          <div className={`column field ${errors.duration ? "error" : ""}`}>
            <label htmlFor="duration">Duration</label>
            <input
              value={data.duration}
              onChange={handleNumberChange}
              type="number"
              name="duration"
              id="duration"
              min="10"
              placeholder="Duration"
            />
            {errors.duration && <FormMessage>{errors.duration}</FormMessage>}
          </div>
          {/* duration END */}

          {/* price START */}
          <div className={`column field ${errors.price ? "error" : ""}`}>
            <label htmlFor="price">Price</label>
            <input
              value={data.price}
              onChange={handleNumberChange}
              type="number"
              min="1"
              step="0.2"
              name="price"
              id="price"
              placeholder="price"
            />
            {errors.price && <FormMessage>{errors.price}</FormMessage>}
          </div>
          {/* price END */}
        </div>
        {/* three columns END */}
        {/* feature START */}
        <div className="six wide column inline field">
          <label htmlFor="featured">Featured</label>
          <input
            checked={data.featured}
            onChange={handleCheckboxChange}
            type="checkbox"
            name="featured"
            id="featured"
          />
        </div>
        {/* feature END */}
        {/* ===================🌹  Buttons START */}
        <div className="ui fluid buttons">
          <button className="ui button primary" type="submit">
            Save
          </button>
          <div className="or"></div>
          <Link to="/films" className="ui button">
            Hide form
          </Link>
        </div>
        {/* Buttons END 🌹=================== */}
      </div>
      {/* ===================🌹  grid END */}
    </form>
  );
};

FilmForm.propTypes = {
  saveFilm: PropTypes.func.isRequired,
};
export default FilmForm;
