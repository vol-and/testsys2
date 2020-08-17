import React, {useState} from 'react';
import './div.css';

export default props => {

    let [question, setQuestion] = useState(props.data.frage);
    let [answers, setAnswer] = useState(props.data.antworten);

    React.useEffect(() => {
        props.updateFunction({
            frage: question,
            antworten: answers
        }, props.data);
    }, [question, ...answers]);

    const updateAnswerField = index => ev => {
        let newAnswerArr = [...answers];
        newAnswerArr[index].text = ev.target.value;
        setAnswer(newAnswerArr);
    };
    const updateCheckbox = index => ev => {
        let newAnswerArr = [...answers];
        newAnswerArr[index].korrekt = ev.target.checked;
        setAnswer(newAnswerArr);
    };

    const removeQuestion = (e) => {
        props.removeFunction(props.data)
    };

    return (
        <div className="row que">
            <div className="col-12">
                Question:
                <input className='question' onChange={evt => setQuestion(evt.currentTarget.value)} value={question}
                       name='question' type='text' size='100'/>
                <div className='answerSection'>
                    Answers:
                    <br/>
                    {answers.map((answer, index) => (
                        <div className='row' key={'row_' + index}>
                            <div className="col-12">
                                <input type='text' value={answer.text} onChange={updateAnswerField(index)}/>
                                <input type="checkbox" onChange={updateCheckbox(index)} checked={answer.korrekt}
                                       data-toggle="tooltip" title='Mark the right answer.'/>
                                       <i className="fa fa-info-circle"></i>
                            </div>
                        </div>
                    ))}
                </div>
                <button type='button' className='btn btn-danger remove' onClick={removeQuestion}>Remove Question</button>
            </div>
        </div>
    );
}