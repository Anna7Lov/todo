import PropTypes from "prop-types";
import "./DropDownList.scss";

export const DropDownList = ({
  items,
  handleSelectChange,
  additionalClass = ""
}) => {
  return (
    <div className={`drop-down-list ${additionalClass}`}>
      {items.map((elem) => (
        <label key={elem.id} className="drop-down-list__label">
          {elem.title}
          <select
            className="drop-down-list__select"
            defaultValue={elem.list[0].value}
            onChange={handleSelectChange}
          >
            {elem.list.map((item, index) => (
              <option key={item.id} disabled={index === 0} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
};

DropDownList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      list: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          value: PropTypes.string.isRequired
        })
      )
    })
  ),
  handleSelectChange: PropTypes.func.isRequired,
  additionalClass: PropTypes.string
};