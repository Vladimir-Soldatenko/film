import { useState } from "react";

const initialData = {
  title: "",
  img: "",
  description: "",
  director: "",
  duration: "",
  price: "",
  featured: false,
};

const FilmForm = () => {
  const [data, setData] = useState(initialData);

  const handleStringChange = (e) => {
    setData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };
  const handleCheckboxChange = (e) => {
    setData((x) => ({ ...x, [e.target.name]: e.target.checked }));
  };

  const handleNumberChange = (e) => {
    let value = parseFloat(e.target.value);
    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    setData((x) => ({ ...x, [e.target.name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="ui form">
      <div className="ui  grid mb-3">
        {/*  ===================🌹 two column row START */}
        <div className="two column row">
          {/*  ===================🌹 left column START */}
          <div className="ten wide column">
            {/*  ===================🌹 title START */}
            <div className="field">
              <label htmlFor="title">Film title</label>
              <input
                value={data.title}
                onChange={handleStringChange}
                type="text"
                name="title"
                id="title"
                placeholder="film title"
              />
            </div>
            {/*  title END  🌹 ===================*/}

            {/* img field START */}
            <div className="field img-grid">
              <label htmlFor="img">Image</label>
              <input
                value={data.img}
                onChange={handleStringChange}
                name="img"
                id="img"
              />

              <div className="inp-file">
                <label htmlFor="photo">Photo</label>
                <input type="file" id="photo" />
              </div>
            </div>
            {/* img field END */}
            {/* description START */}
            <div className="column row field">
              <label htmlFor="description">Film description</label>
              <textarea
                value={data.description}
                onChange={handleStringChange}
                name="description"
                id="description"
                placeholder="film description"
              ></textarea>
            </div>
            {/* description END */}
          </div>
          {/* left column END 🌹 =================== */}

          {/* img box START */}
          <div className="six wide column">
            <img
              src="https://via.placeholder.com/250x250"
              className="ui image imgfit"
              alt="myimg"
            />
          </div>
          {/* img box END */}
        </div>
        {/*   two column row END 🌹=================== */}
        {/* three columns START */}
        <div className="three column row mb-3">
          {/* director START */}
          <div className="column field">
            <label htmlFor="director">Director</label>
            <input
              value={data.director}
              onChange={handleStringChange}
              type="text"
              name="director"
              id="director"
              placeholder="film director"
            />
          </div>
          {/* director END */}
          {/* duration START */}
          <div className="column field">
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
          </div>
          {/* duration END */}

          {/* price START */}
          <div className="column field">
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
          <span className="ui button">Hide form</span>
        </div>
        {/* Buttons END 🌹=================== */}
      </div>
      {/* ===================🌹  grid END */}
    </form>
  );
};

export default FilmForm;
