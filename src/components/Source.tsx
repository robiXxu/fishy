import React from 'react';
import PropTypes from 'prop-types';

const Source = ({
  appIcon,
  id,
  name,
  thumbnail,
  onClick = id => console.log(`Clicked Source: ${id}`),
}) => (
  <div
    onClick={() => onClick(id)}
    className="max-w-sm bg-black rounded text-white font-bold h-48 p-3 grid justify-items-center text-center rounded-lg"
  >
    <img src={thumbnail.toDataURL()} alt={name} />
    <p className="overflow-ellipsis overflow-hidden">{name}</p>
  </div>
);

Source.propTypes = {
  appIcon: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string,
  thumbnail: PropTypes.any,
  onClick: PropTypes.func
};

export default Source;
