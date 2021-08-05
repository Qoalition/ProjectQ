import React from 'react';
import PropTypes from 'prop-types';

const comment = ({fill, stroke, strokeWidth}) => {
    return (
        <>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.24707 16V16.5L1.64708 16.2L5.58016 13.25H14.9971C15.9624 13.25 16.7471 12.4653 16.7471 11.5V2.5C16.7471 1.53468 15.9624 0.75 14.9971 0.75H2.99707C2.03175 0.75 1.24707 1.53468 1.24707 2.5V16ZM4.84733 11.3L3.24707 12.5V2.75H14.7471V11.25H4.99732H4.914L4.84733 11.3Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth}/>
            </svg>
            32
        </>
        
    );
};

comment.propTypes = {
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.string
};

comment.defaultProps = {
    fill: '#fff',
    stroke: null,
    strokeWidth: null
}

export default comment;
