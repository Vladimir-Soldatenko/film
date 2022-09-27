import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import { FullSpinner } from "styles/app";

const FilmsPage = lazy(() => import("pages/FilmsPage"));
const FilmDetails = lazy(() =>
  import("pages/FilmsPage/components/FilmDetails")
);
const SigupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

const App = () => {
  const [message, setMessage] = useState("");

  const setMsg = (msg) => setMessage(msg);

  return (
    <div className="ui container mt-3">
      <TopNavigation />
      {message && (
        <div className="ui info message">
          <i onClick={() => setMsg("")} className="close icon" />
          {message}
        </div>
      )}

      <Suspense fallback={<FullSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films/*" element={<FilmsPage />} />
          <Route path="/film/:id" element={<FilmDetails />} />
          <Route path="/signup" element={<SigupPage setMsg={setMsg} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
