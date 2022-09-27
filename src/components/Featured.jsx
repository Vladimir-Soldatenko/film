import PropTypes from "prop-types";
import { useToggledFeatured } from "hooks/films";

const Featured = ({ item }) => {
  const mutation = useToggledFeatured();

  const cls = item.featured ? "yellow" : "empty";
  return (
    <span
      onClick={() => mutation.mutate({ ...item, featured: !item.featured })}
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
