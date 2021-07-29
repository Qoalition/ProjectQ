import React from 'react';
import PropTypes from 'prop-types';


// Components
import Header from '../components/header/header'
import Question from '../components/questions/question/question'

const Feed = props => {
    return (
        <div>
            <Header />
            <Question />
        </div>
    );
};

Feed.propTypes = {
    
};

export default Feed;