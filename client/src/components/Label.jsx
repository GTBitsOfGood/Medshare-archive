import React from 'react';
import PropTypes from 'prop-types';

const Label = props => {
  const { labelData } = props;
  const {
    name,
    productReference,
    category,
    subcategory,
    uom,
    description,
  } = labelData;
  const imgURL = 'http://placekitten.com/g/200/300';
  return (
    <div className="item-label">
      <div className="item-label-main">
        <div>
          <img src={imgURL} alt="" />
        </div>
        <div>
          <div className="item-label-name">{name}</div>
          <div className="item-label-details">
            <table>
              <tbody>
                <tr>
                  <th>Product reference</th>
                  <th>Category</th>
                </tr>
                <tr>
                  <td>{productReference}</td>
                  <td>{category}</td>
                </tr>
                <tr>
                  <th>Subcategory</th>
                  <th>Unit of Measurement</th>
                </tr>
                <tr>
                  <td>{subcategory}</td>
                  <td>{uom}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="item-label-extra">
        <div className="item-label-header">Description</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

Label.propTypes = {
  labelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    productReference: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subcategory: PropTypes.string.isRequired,
    uom: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Label;
