import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemLabel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px auto;
  outline: black 3px solid;
  width: 520px;
`;

const Flex = styled.div`
  display: flex;
`;

const LabelName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  border-bottom: black dotted 2px;
`;

const LabelInput = styled.input`
  font-size: 2rem;
  font-weight: bold;
  border-bottom: black dotted 2px;
`;

const LabelDetails = styled.div`
  text-align: left;
  & th,
  td {
    padding-right: 45px;
  }
`;

const LabelButton = styled.button`
  float: right;
  display: block;
  position: relative;
  top: 0;
  right: 0;
  width: 20px;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

const LabelEdit = props => {
  const { labelData } = props;
  const {
    name,
    productReference,
    category,
    subcategory,
    uom,
    description,
    edit,
  } = labelData;
  return (
    <ItemLabel>
      <Flex>
        <div>
          <LabelName>
            {edit ? (
              <LabelInput
                type="text"
                placeholder={name}
                defaultValue={name}
                name="name"
              />
            ) : (
              name
            )}
          </LabelName>
          <LabelDetails>
            <table>
              <tbody>
                <tr>
                  <th>Product reference</th>
                  <th>Category</th>
                </tr>
                <tr>
                  <td>
                    {edit ? (
                      <input
                        type="text"
                        placeholder={productReference}
                        defaultValue={productReference}
                        name="productReference"
                      />
                    ) : (
                      productReference
                    )}
                  </td>
                  <td>
                    {edit ? (
                      <input
                        type="text"
                        placeholder={category}
                        defaultValue={category}
                        name="category"
                      />
                    ) : (
                      category
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Subcategory</th>
                  <th>Unit of Measurement</th>
                </tr>
                <tr>
                  <td>
                    {edit ? (
                      <input
                        type="text"
                        placeholder={subcategory}
                        defaultValue={subcategory}
                        name="subcategory"
                      />
                    ) : (
                      subcategory
                    )}
                  </td>
                  <td>
                    {edit ? (
                      <input
                        type="text"
                        placeholder={uom}
                        defaultValue={uom}
                        name="uom"
                      />
                    ) : (
                      uom
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </LabelDetails>
        </div>
      </Flex>
      <div>
        <h4>Description</h4>
        <div>
          {edit ? (
            <textarea
              type="text"
              placeholder={description}
              defaultValue={description}
              name="description"
              rows="5"
              cols="65"
            />
          ) : (
            description
          )}
        </div>
      </div>
    </ItemLabel>
  );
};

LabelEdit.propTypes = {
  labelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    productReference: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subcategory: PropTypes.string.isRequired,
    uom: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
  }).isRequired,
};

export default LabelEdit;
