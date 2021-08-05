import React from 'react';
import PropTypes from 'prop-types';



const close = ({onClick, fill, stroke}) => {
    return (
        <>
            <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill={fill} stroke={stroke}><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/></svg>
        </>
    );
};

close.propTypes = {
    fill: PropTypes.string,
    stroke: PropTypes.string
};

close.defaultProps = {
    fill: '#fff',
    stroke: null,
}

export default close;
