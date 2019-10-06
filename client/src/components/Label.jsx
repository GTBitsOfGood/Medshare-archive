import React from "react";

export function Label(props) {
  const {
    name, 
    productReference,
    category,
    subcategory,
    uom,
    description
  } = props.labelData;
    return (
      <div className="item-label">
        <div className="item-label-main">
          <div>
            <img src="http://placekitten.com/g/200/300" alt="" />
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
            <div>
              {description}
            </div>
        </div>
      </div>
    );
}
