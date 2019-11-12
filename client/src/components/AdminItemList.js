import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px auto;
  width: 60%;
`;

const Button = styled.button`
  display: block;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
`;

const AdminItemList = props => {
  const { data, displayLabel } = props;
  return (
    <div>
      <ItemList>
        {Object.keys(data).map(function(a) {
          const display = [];
          Object.keys(data[a]).map(function(Key) {
            if (Key === '_id') {
              return display;
            }
            return display.push(`${Key}: ${data[a][Key]}   `);
          });
          return (
            <Button
              onClick={() => {
                displayLabel(data[a]);
              }}
            >
              {display}
            </Button>
          );
        })}
      </ItemList>
    </div>
  );
};

AdminItemList.propTypes = {
  data: PropTypes.shape.isRequired,
  displayLabel: PropTypes.func.isRequired,
};

export default AdminItemList;
