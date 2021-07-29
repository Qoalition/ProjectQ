import React from 'react';
import PropTypes from 'prop-types';

// Components
import Header from '../components/header/header'
import Questions from '../components/questions/questions'
import 'boxicons';

const Feed = props => {
    return (
        <div>
            <Header />
            <Questions />
        </div>
    );
};

Feed.propTypes = {
    
};

export default Feed;