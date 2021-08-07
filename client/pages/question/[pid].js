import React, { useEffect } from 'react';
import { useRouter } from 'next/router'

// Components
import Header from '../../components/header/header'
import Question from '../../components/questions/question/question'
import Answer from '../../components/answers/answers'
import Tags from '../../components/tags/tags'

const Post = ({ question }) => {
    const router = useRouter()
    const { pid } = router.query

    useEffect(() => {
        // console.log(pid);
        // console.log(question)
    })

    return (
        <div className="questionDetail">
            <Header />
            <div style={{
                maxWidth: '48rem',
                margin: 'auto'
            }}>
                <Tags topic={question[0].topic}/>
                <Question props={question[0]} />
                <hr />
                100 Answers
                <hr />
                <Answer />
                <Answer />
                <Answer />
            </div>
        </div>
    );
};

Post.getInitialProps = async ({ query: {pid} }) => {
    // console.log(pid)
    const headers = {
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question_id: pid })
    }
    try {
      const res = await fetch('http://localhost:5000/questions/getFullDetails', headers)
      const json = await res.json()
      return { question: json }
    } catch (err) {
      console.log(`err`, err);
      return {}
    }
  }

export default Post;
