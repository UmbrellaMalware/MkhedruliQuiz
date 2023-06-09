import React, {Component} from 'react';
import {get_quiz} from './api/quizQuestions';
import Quiz from './components/Quiz';
import logo from './logo-round.png';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {},
            result: '',
            right_answer: '',
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.handleQuizChange = this.handleQuizChange.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    componentDidMount() {

        let q = get_quiz()
        const shuffledAnswerOptions = q.answers
        this.setState({
            ...this.state,
            question: q.question,
            answerOptions: shuffledAnswerOptions,
            right_answer: q.right_answer
        });

    }

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        console.log(event.currentTarget.value)
        if (this.state.right_answer === event.currentTarget.value) {
            setTimeout(()=>this.nextQuestion(), 400)
        }
    }

    nextQuestion() {
        let answers = this.state.answerOptions
        for (let i = 0; i < answers.length; i++) {
            let checkbox = document.getElementById(answers[i].type)
            let element = checkbox.parentElement.children[1]
            element.style.backgroundColor = 'white'
            element.checked = false
            checkbox.disabled = false

        }
        let q = get_quiz()
        this.setState({
            question: q.question,
            answerOptions: q.answers,
            answer: '',
            right_answer: q.right_answer
        });

    }

    handleQuizChange(event) {
        let answers = this.state.answerOptions
        let chosen = event.target.value
        for (let i = 0; i < answers.length; i++) {
            let checkbox = document.getElementById(answers[i].type)
            let element = checkbox.parentElement.children[1]
            let value = checkbox.parentElement.children[0].value
            element.checked = false
            checkbox.disabled = true
            console.log(element)
            if (chosen !== this.state.right_answer && value === chosen) {
                element.style.backgroundColor = 'red'
            }
            if (value === this.state.right_answer) {
                element.style.backgroundColor = 'green'
            }

        }

    }

    setUserAnswer(answer) {
        this.setState((state, props) => ({
            answer: answer,
        }));
    }

    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                onAnswerSelected={this.handleAnswerSelected}
                OnQuizChange={this.handleQuizChange}
                nextQuestion={this.nextQuestion}

            />
        );
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" style={{
                          maxWidth: '100%',
                          height: 'auto'
                    }}/>
                    <h2>Mkhedruli quiz</h2>
                </div>
                {this.renderQuiz()}
            </div>
        );
    }
}

export default App;
