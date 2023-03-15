const alphabet = {
    "ა": "а",
    "ბ": "б",
    "გ": "г",
    "დ": "д",
    "ე": "е",
    "ვ": "в",
    "ზ": "з",
    "თ": "т",
    "ი": "и",
    "კ": "к",
    "ლ": "л",
    "მ": "м",
    "ნ": "н",
    "ო": "о",
    "პ": "п",
    "ჟ": "ж",
    "რ": "р",
    "ს": "с",
    "ტ": "т",
    "უ": "у",
    "ფ": "ф",
    "ქ": "к",
    "ღ": "гх",
    "ყ": "кх",
    "შ": "ш",
    "ჩ": "ч",
    "ც": "ц",
    "ძ": "дз",
    "წ": "ц",
    "ჭ": "ч",
    "ხ": "х",
    "ჯ": "дж",
    "ჰ": "х'e"
}

const georgian = Object.keys(alphabet)

const russian = Object.values(alphabet)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function create_answer(georgian_letter, russian){
    let right_answer = alphabet[georgian_letter];
    let index = russian.indexOf(right_answer)
    russian.splice(index, 1)
    let wrong_answers = []
    for (let i = 0; i < 3; i++) {
        index = Math.floor(Math.random() * russian.length)
        let answer = russian[index]
        russian.splice(index, 1)

        wrong_answers.push(
            {
                type: answer,
                content: answer,
                right_answer: right_answer
            }
        )
    }
    wrong_answers.push({
        type: right_answer,
        content: right_answer,
        right_answer: right_answer
    })
    wrong_answers = shuffleArray(wrong_answers)
    return wrong_answers
}

function create_quiz(georgian, russian) {
    georgian = shuffleArray(georgian)
    let letter = georgian[0]
    return {
            right_answer: alphabet[letter],
            question: "Which of these letters is " + letter + "?",
            answers: create_answer(letter, Array.from(russian))
        }
}


var quizQuestions = create_quiz(georgian, russian);

export function get_quiz() {
    return create_quiz(georgian, russian);
}
export default quizQuestions;
