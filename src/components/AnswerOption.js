import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
    return (
        <li className="answerOption">
            <input
                type="checkbox"
                className="radioCustomButton"
                name="radioGroup"
                id={props.answerType}
                value={props.answerType}
                onChange={props.onAnswerSelected}
                checked={false}

            />
            {/* eslint-disable-next-line react/style-prop-object */}
            <label className="radioCustomLabel" htmlFor={props.answerType} style={{backgroundColor:'white'}}>
                {props.answerContent}
            </label>
        </li>
    );
}

AnswerOption.propTypes = {
    answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    right_answer: PropTypes.string.isRequired
};

export default AnswerOption;
