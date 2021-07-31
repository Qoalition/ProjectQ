import React from 'react';
import PropTypes from 'prop-types';

// Components
import Header from '../components/header/header'
import Question from '../components/questions/question/question'

// STILL WORKING ON BREAKING THIS INTO COMPONENTS

const Feed = props => {
    return (
        <div>
            <Header />
            <div style={{
                maxWidth: '48rem',
                margin: 'auto'
            }}>
                <ul>
                    { /* Tags */ }
                    <li>Psychology</li>
                    <li>Behavior</li>
                </ul>
                <Question />
                <hr />
                100 Answers
                <hr />
                Insert answers here... (need an answer component with interactive elements)
            </div>
        </div>
    );
};

Feed.propTypes = {
    
};

export default Feed;
