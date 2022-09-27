import { useContext } from "react";
import PropTypes from "prop-types";
import FilmContext from "contexts/FilmContext";

const Featured = ({ item }) => {
  const { toggleFeatured } = useContext(FilmContext);
  const cls = item.featured ? "yellow" : "empty";
  return (
    <span
      onClick={() => toggleFeatured(item._id)}
      role="status"
      className="ui right corner label"
    >
      <i role="img" className={`star icon ${cls}`}></i>
    </span>
  );
};

Featured.propTypes = {
  item: PropTypes.object.isRequired,
};
Featured.defaltProps = {
  item: {},
};

export default Featured;
