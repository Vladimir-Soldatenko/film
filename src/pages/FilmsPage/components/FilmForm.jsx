import { useState } from "react";
import { genres, tags as tagsList } from "data";
import { T } from "ramda";

const FilmForm = () => {
  const [tags, setTags] = useState([]);
  const [genre, setGenre] = useState("");
  const [sel, setSel] = useState("");
  const [multiSel, setMultiSel] = useState([]);

  const handleTagsChange = (id) => {
    setTags((x) => (x.includes(id) ? x.filter((v) => v !== id) : [...x, id]));
  };

  const handleGenreChange = (genre) => setGenre(genre);

  const handleSelectChange = ({ target }) => {
    const { value } = target;
    if (Number(value) === -1) {
      alert("Choose option");
      return;
    }
    setSel(value);
  };

  const handleMultiSelect = ({ target }) => {
    const multipleSelect = [...target.selectedOptions].map((o) => o.value);
    setMultiSel(multipleSelect);
  };

  return (
    <form className="ui form">
      <div className="ui grid">
        <div className="four wide column">
          {/*  =========================  tags  ================  */}
          <div className="grouped fields">
            <label>Tags</label>
            {/* Start  tags  ======*/}
            {tagsList.map((tag) => (
              <div key={tag._id} className="field">
                <div className="ui checkbox field">
                  <input
                    onChange={() => handleTagsChange(tag._id)}
                    checked={tags.includes(tag._id)}
                    type="checkbox"
                    id={`tag-${tag._id}`}
                  />
                  <label htmlFor={`tag-${tag._id}`}>{tag.title}</label>
                </div>
              </div>
            ))}

            {/* ====== finish tags */}
          </div>
        </div>
        {/*  ==============================   genre ================  */}
        <div className="four wide column">
          <div className="grouped fields">
            <label>Genres</label>
            {/* Start genres ====== */}
            {genres.map((g) => (
              <div key={g._id} className="ui radio checkbox field">
                <input
                  onChange={() => handleGenreChange(g._id)}
                  checked={genre === g._id}
                  id={`genre-${g._id}`}
                  type="radio"
                  name="example2"
                />
                <label htmlFor={`genre-${g._id}`}>{g.title}</label>
              </div>
            ))}
            {/* ====== finish genres  */}
          </div>
        </div>
        {/*  ==============================   sel ================  */}
        <div className="four wide column">
          <select
            value={sel}
            onChange={handleSelectChange}
            className="ui dropdown"
          >
            <option value="-1">Choose</option>
            {genres.map((g) => (
              <option key={g._id} value={g._id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>
        {/*  ==============================  multipleSelect ================  */}
        <div className="four wide column">
          <select
            value={multiSel}
            onChange={handleMultiSelect}
            multiple
            size={genres.length}
          >
            {genres.map((g) => (
              <option value={g._id} key={g._id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ====================================================== */}
    </form>
  );
};

export default FilmForm;
