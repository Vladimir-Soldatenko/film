import React, { useState } from "react";
import PropTypes from "prop-types";
import Featured from "components/Featured";

const FilmCard = ({ film }) => {
  const [click, setClick] = useState(false)

  const styleBlock = {
    padding: '15px', display: "flex",
    alignItems: "flex-end", height: '394px'
  }

  const showDescription = () => {
    setClick(!click)
  }

  return (
    <div className="ui card">
      <Featured item={film} />
      <div className="image">
        <span className="ui green label ribbon">$ {film.price} </span>
        <img style={click ? { display: 'none' } : { display: 'block' }}
          src={film.img} alt={film.title} />
        <div style={click ? { ...styleBlock } : { display: 'none' }}>
          <p >{film.description}</p>
        </div>
      </div>

      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration}
          </span>
        </div>
        <span onClick={showDescription} style={{ cursor: 'pointer' }}>
          <i className={click ? 'icon eye slash link' : 'icon eye link'}></i>
          {click ? 'hide description' : 'show description'}
        </span>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <span className="ui green basic button">
            <i className="ui icon edit"></i>
          </span>
          <span className="ui red basic button" >
            <i className="ui icon trash"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }),
};

FilmCard.defaultProps = {
  film: {},
};

export default FilmCard;
