import React from "react";

export function Label(props) {
    return (
      <div className="item-label">
        <div className="item-label-main">
          <div>
            <img src="http://placekitten.com/g/200/300" alt="" />
          </div>
          <div>
            <div className="item-label-name">{props.labelData.name}</div>
            <div className="item-label-details">
                <table>
                  <tbody>
                  <tr>
                    <th>Product reference</th>
                    <th>Category</th>
                  </tr>
                  <tr>
                    <td>{props.labelData.productReference}</td>
                    <td>{props.labelData.category}</td>
                  </tr>
                  <tr>
                    <th>Subcategory</th>
                    <th>Unit of Measurement</th>
                  </tr>
                  <tr>
                    <td>{props.labelData.subcategory}</td>
                    <td>{props.labelData.uom}</td>
                  </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        <div className="item-label-extra">
            <div className="item-label-header">Description</div>
            <div>
              {props.labelData.description}
            </div>
        </div>
      </div>
    );
}
