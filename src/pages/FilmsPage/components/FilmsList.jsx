import { memo } from "react";
import FilmCard from "pages/FilmsPage/components/FilmCard";
import Message from "components/Message";
import { FullSpinner } from "styles/app";
import { useLoadFilms } from "hooks/films";

const FilmsList = () => {
  const { data: films, isLoading } = useLoadFilms();

  return (
    <>
      {isLoading && <FullSpinner />}
      <div className="ui four cards">
        {films?.length === 0 ? (
          <Message type="bell" color="blue">
            No films yet
          </Message>
        ) : (
          films?.map((film) => <FilmCard key={film._id} film={film} />)
        )}
      </div>
    </>
  );
};

export default memo(FilmsList);
