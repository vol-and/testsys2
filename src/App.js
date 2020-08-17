import React, {Component} from 'react';
import DivSection from './DivSection/Div';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            divs: []
        };
    }

    addDiv = () => {
        this.setState({
            divs: [...this.state.divs, {
                frage: '',
                antworten: [
                    {text: '', korrekt: false},
                    {text: '', korrekt: false},
                    {text: '', korrekt: false},
                    {text: '', korrekt: false}
                ]
            }]
        })
    };

    updateDiv = (data, div) => {
        this.setState({
            divs: this.state.divs.map(el => {
                if (el === div) {
                    return data;
                } else {
                    return el;
                }
            })
        });
    };

    removeDiv = (removeMe) => {
        this.setState({
            divs: this.state.divs.filter(div => div !== removeMe)
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let myRequest = new Request(
            'http://localhost:80/send',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    this.state.divs
                )
            }
        );

        fetch(myRequest)
            .then(res => res.json())
            .catch(err => console.log(err))
    };

    createComponents = () => {
        return this.state.divs.map((div) =>
            <DivSection updateFunction={this.updateDiv}
                        allData={this.state.divs} // send array with all created divs
                        removeFunction={this.removeDiv}
                        saveData={this.onChange}
                        data={div}/>);
    };

     load = () => {
        fetch('/result', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(
            resp => resp.json()
        ).then(
            questions => {
                console.log(questions);
            }
        );
    };



    render() {
        return (
            <>
                <div className='row my-3'>
                    <div className="col-12 d-flex justify-content-center">
                        <button className='btn btn-primary mx-2' onClick={this.addDiv}>Add New Question</button>
                        <button className='btn btn-warning' onClick={this.handleSubmit}>Save to Database</button>
                        <button className='btn btn-success mx-2' onClick={this.load}>Show</button>
                    </div>
                </div>
                {this.createComponents()}
            </>
        )
    }
}

export default App;