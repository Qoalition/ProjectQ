import React, { useLayoutEffect } from 'react'
import styles from './modal.module.scss'
import Close from '../../icons/close'

const modal = ({ display, open, question, description, handler, post, topic }) => {

    function showDescriptionBox(e) {
        const item = e.target;
        item.classList.toggle('open');
        const sibling = item.nextElementSibling;
        sibling.classList.toggle('show');
    }

    useLayoutEffect(() => {
        const e = document.getElementById('modal')
        display ? e.classList.add(styles.show) : e.classList.remove(styles.show)
    }, [display])

    return (
        <div id="modal" className={styles.modal}>
            <form onSubmit={(e) => post(e)}>
                <header>
                    <Close onClick={open}/>
                    <h3>Ask a Question</h3>
                </header>
                <fieldset>
                    <textArea 
                        id="questionField"
                        name="question"
                        value={question}
                        onChange={handler}
                        placeholder="Start your question with “What”, “Why”, “How”, etc." />
                    <aside>
                        <p className="open" onClick={showDescriptionBox}>Add more context to your question (optional)</p>
                        <textArea
                            id="descriptionField"
                            name="question_description"
                            value={description}
                            onChange={handler}
                            placeholder="If any, describe the circumstances that form the setting for your question in terms of which it can be fully understood and assessed."
                        />
                    </aside>
                    <div>
                        <select
                            name="topic"
                            value={topic}
                            onChange={handler}
                        >
                            <option value="" defaultValue disabled hidden>Select a Topic</option>
                            <option>Technology</option>
                            <option>Movies</option>
                            <option>Music</option>
                            <option>Writing</option>
                            <option>Computer Science</option>
                            <option>Dating</option>
                            <option>Relationships</option>
                            <option>Photography</option>
                            <option>Arts &amp; Crafts</option>
                            <option>Politics</option>
                            <option>Social Sciences</option>
                            <option>Health</option>
                            <option>Medicine</option>
                            <option>Life Advice</option>
                            <option>Entertainment</option>
                            <option>Food</option>
                            <option>Pop Culture</option>
                            <option>Science</option>
                            <option>Business</option>
                            <option>Money</option>
                            <option>Sports</option>
                            <option>News</option>
                            <option>Current Events</option>
                            <option>Education</option>
                            <option>Fitness</option>
                            <option>Retirement</option>
                            <option>Travel</option>
                            <option>Astronomy</option>
                            <option>Horticulture</option>
                            <option>Fashion</option>
                            <option>Marketing</option>
                            <option>Startups</option>
                            <option>Communication </option>
                        </select>
                        <div className="actions">
                            <button onClick={open}>Cancel</button>
                            <input type="submit" value="Add Question" />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    )   
};

export default modal;