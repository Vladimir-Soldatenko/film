import { Routes, Route } from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import FilmsPage from "pages/FilmsPage";
import HomePage from "pages/HomePage";

const App = () => {
  return (
    <div className="ui container mt-3">
      <TopNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films/*" element={<FilmsPage />} />
      </Routes>
    </div>
  );
};

export default App;
