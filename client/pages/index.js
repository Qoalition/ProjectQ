import React, { useEffect } from 'react';


// Components
import Header from '../components/header/header'
import Questions from '../components/questions/questions'

const Feed = ( props ) => {

    useEffect(() => {
        // console.log(props)
    }, [])

    return (
        <div>
            <Header />
            <Questions allQuestions={props.questions} usedTopics={props.topics} />
        </div>
    );
};

const data = Feed.getInitialProps = async (ctx) => {
    const [ questions, topics ] = await Promise.all([
        fetch('http://localhost:5000/questions/get', {method: 'GET', mode: 'cors'}).then(r => r.json()),
        fetch('http://localhost:5000/questions/getUniqueTopics', {method: 'GET', mode: 'cors'}).then(r => r.json())
    ])
    return { questions, topics }
}

export default Feed;
