import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Featured from "components/Featured";
import FilmCardButtons from "./FilmCardButtons";
import { useIsAuth } from "contexts/UserContext";

const FilmCard = ({ film }) => {
  const { isAdmin, isUser } = useIsAuth();

  const actionUser = (
    <div className="extra content">
      <Link to={`/film/${film._id}`} className="header">
        <span className="ui green basic button">Read more</span>
      </Link>
    </div>
  );

  return (
    <div className="ui card">
      <Featured item={film} />

      <div className="image">
        <span className="ui green label ribbon">$ {film.price} </span>
        <img src={film.img} alt={film.title} />
      </div>

      <div className="content">
        <p className="header">
          {isAdmin ? (
            <Link to={`/film/${film._id}`} className="header">
              {film.title}
            </Link>
          ) : (
            film.title
          )}
        </p>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration}
          </span>
        </div>
      </div>
      {isAdmin && <FilmCardButtons film={film} />}
      {isUser && actionUser}
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

export default React.memo(FilmCard);
