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
  width: 50px;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

const LabelEdit = props => {
  const { labelData, edit, handleEditFinish } = props;
  const {
    ProductName,
    ProductRef,
    CategoryName,
    SubCategory,
    UnitMeasureName,
    description,
  } = labelData;
  return (
    <ItemLabel>
      <Flex>
        <div>
          <LabelName>
            {edit ? (
              <LabelInput
                type="text"
                placeholder={ProductName}
                defaultValue={ProductName}
                name="name"
              />
            ) : (
              ProductName
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
                        placeholder={ProductRef}
                        defaultValue={ProductRef}
                        name="productReference"
                      />
                    ) : (
                      ProductRef
                    )}
                  </td>
                  <td>
                    {edit ? (
                      <input
                        type="text"
                        placeholder={CategoryName}
                        defaultValue={CategoryName}
                        name="category"
                      />
                    ) : (
                      CategoryName
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
                        placeholder={SubCategory}
                        defaultValue={SubCategory}
                        name="subcategory"
                      />
                    ) : (
                      SubCategory
                    )}
                  </td>
                  <td>
                    {edit ? (
                      <input
                        type="text"
                        placeholder={UnitMeasureName}
                        defaultValue={UnitMeasureName}
                        name="uom"
                      />
                    ) : (
                      UnitMeasureName
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </LabelDetails>
        </div>
      </Flex>
      <div>
        {/*<h4>Description</h4>
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
        </div>*/}
      </div>
      {edit ? (
        <LabelButton onClick={handleEditFinish}> Done </LabelButton>
      ) : (
        description
      )}
    </ItemLabel>
  );
};

LabelEdit.propTypes = {
  labelData: PropTypes.shape({
    ProductName: PropTypes.string.isRequired,
    ProductRef: PropTypes.string.isRequired,
    CategoryName: PropTypes.string.isRequired,
    SubCategory: PropTypes.string.isRequired,
    UnitMeasureName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  edit: PropTypes.bool.isRequired,
  handleEditFinish: PropTypes.func.isRequired,
};

export default LabelEdit;
