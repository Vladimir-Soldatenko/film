import { useParams, Navigate } from "react-router-dom";
import { FullSpinner } from "styles/app";
import { useIsAuth } from "contexts/UserContext";
import { useFetchFilm } from "hooks/films";

const FilmDetails = () => {
  const { id } = useParams();
  const { data: film, isLoading, isError, isSuccess } = useFetchFilm(id);
  const { isAuth } = useIsAuth();

  return (
    <>
      {!isAuth && <Navigate to="/films" />}
      {isLoading ? (
        <FullSpinner />
      ) : isError ? (
        <p>Error</p>
      ) : isSuccess ? (
        <div className="ui grid">
          <div className="four wide column">
            <img src={film.img} alt={film.title} />
          </div>
          <div className="ten wide column">
            <h3 className="header">{film.title}</h3>
            <p>{film.description}</p>
            <p>
              <i className="icon user" /> Director: {film.director}
            </p>
            <p>
              <i className="icon hourglass" /> Duration: {film.duration}
            </p>
            <p>
              <i className="icon dollar sign" /> Price: {film.price}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilmDetails;
