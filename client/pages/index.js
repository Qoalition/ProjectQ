import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


// Components
import Header from '../components/header/header'
import Questions from '../components/questions/questions'

const Feed = ({ getQuestions }) => {

    useEffect(() => {
        // console.log(props)
    }, [])

    return (
        <div>
            <Header />
            <Questions allQuestions={getQuestions} />
        </div>
    );
};

const getQuestions = Feed.getInitialProps = async (ctx) => {
    const res = await fetch('http://localhost:5000/questions/get', {method: 'GET', mode: 'cors'})
    const json = await res.json()
    return { getQuestions: json }
}

Feed.propTypes = {
    getQuestions: PropTypes.array
};

Feed.defaultProps = {
    getQuestions: getQuestions
}

export default Feed;
