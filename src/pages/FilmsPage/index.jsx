import { useLocation, Routes, Route } from "react-router-dom";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import FormLayout from "pages/FilmsPage/components/FormLayout";

const FilmsPage = () => {
  const location = useLocation();
  const cols = location.pathname === "/films" ? "sixteen" : "ten";

  return (
    <div className="ui stackable grid">
      <div className="six wide column">
        <Routes>
          <Route path="/" element={<FormLayout />}>
            <Route path="new" element={<FilmForm />} />
            <Route path="edit/:_id" element={<FilmForm />} />{" "}
          </Route>
        </Routes>
      </div>

      <div className={` ${cols} wide column`}>
        <FilmsList />
      </div>
    </div>
  );
};
export default FilmsPage;
