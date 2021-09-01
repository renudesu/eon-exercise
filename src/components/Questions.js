import React from "react";
import './Questions.css';

export default class QuestionsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: 0,
            questions: [
                {
                    question: 'Do you have any shading on your roof from chimneys or nearby trees?',
                    description: 'This will help us recommend the most appropriate solar package for your home',
                    answer: '',
                    icon: 'fa fa-home'
                },
                {
                    question: `Do you own your own home, whether that's outright or mortgaged?`,
                    description: "",
                    answer: '',
                    icon: 'fa fa-sun-o'
                },
                {
                    question: 'Do you know how many panels you need?',
                    description: "This will help us recommend the most appropriate solar package for your home",
                    answer: '',
                    icon: ''
                }
            ],
            optionalQuestion: {
                'Yes': {
                    question: 'Which of these would best describe your home?',
                    description: "Helping us to understand the size of you home allows us to recommend the most approriate size of your solar installation.",
                    answer: ''
                },
                'No': {
                    question: 'How many panels do you need?',
                    description: '',
                    answer: '',
                }
            },
            dropDown: {
                options: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                selected: ''
            },
            building: {
                selected: '',
                index: 0
            }
        };
    }

    handleChange = (index, selectedValue) => {
        const questions = this.state.questions;
        questions[index].answer = selectedValue;
        for (var counter = index + 1; counter < questions.length; counter++) {
            questions[counter].answer = '';
        }
        this.setState({
            selected: index + 1,
            questions: questions,
            dropDown: {
                ...this.state.dropDown,
                selected: ''
            },
            building: {
                selected: '',
                index: 0

            }
        });
    }

    handleClick = (value) => {
        this.setState({
            dropDown: {
                ...this.state.dropDown,
                selected: value + ' Panels'
            },
            building: {
                selected: '',
                index: 0

            }
        });
    }

    buildDropdown = () => {
        const dropdownOptions = this.state.dropDown.options.map((number, index) => {
            return (
                <li onClick={() => this.handleClick(number)} key={`dropdown_options_${index}`}><span className="dropdown-item" >{number} Panels</span></li>
            )
        });
        return (< div className="dropdown" >
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {this.state.dropDown.selected.length ? this.state.dropDown.selected : 'Number of panels'}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {dropdownOptions}
            </ul>
        </div >);
    }

    itemSelect = (value, itemNumber) => {
        this.setState({
            building: {
                selected: value,
                index: itemNumber
            },
            dropDown: {
                ...this.state.dropDown,
                selected: ''
            },
        });
    }

    buildItems = () => {
        return (
            <div className="row items-container">
                <div className={`col-md-3 item ${this.state.building.index === 1 ? 'active' : ''}`}>
                    <i className="fa fa-building" onClick={() => this.itemSelect('Flat/Apartment', 1)}></i>
                    <span>Flat/Apartment</span>
                </div>
                <div className={`col-md-3 item ${this.state.building.index === 2 ? 'active' : ''}`}>
                    <i className="fa fa-building" onClick={() => this.itemSelect('Terraced House', 2)}></i>
                    <span>Terraced House</span>
                </div>
                <div className={`col-md-3 item ${this.state.building.index === 3 ? 'active' : ''}`}>
                    <i className="fa fa-building" onClick={() => this.itemSelect('Semi Detached house', 3)}></i>
                    <span>Semi Detached house</span>
                </div>
                <div className={`col-md-3 item ${this.state.building.index === 4 ? 'active' : ''}`}>
                    <i className="fa fa-building" onClick={() => this.itemSelect('Detached house', 4)}></i>
                    <span>Detached house</span>
                </div>
            </div>
        );
    }

    displayDynamicQuestions = () => {
        const selectedValue = this.state.questions[this.state.selected - 1].answer;
        return (
            <>
                <h3 className="heading">{this.state.optionalQuestion[selectedValue].question}</h3>
                <h5 className="sub-heading">{this.state.optionalQuestion[selectedValue].description}</h5>
                {selectedValue === 'Yes' ? <>
                    {this.buildDropdown()}
                </> : <>
                    {this.buildItems()}
                </>}
            </>
        );
    }

    render() {
        const questions = this.state.questions.map((item, index) => {
            if (index <= this.state.selected) {
                return (<div key={`question_${index}`} className="questions">
                    <h3 className="heading">{item.question}</h3>
                    <h5 className="sub-heading">{item.description}</h5>
                    <i className={item.icon}></i>
                    <button type="button" className={`btn btn-warning ${item.answer === 'No' ? 'btn-selected' : ''}`} onClick={_ => this.handleChange(index, 'No')}>No</button>
                    <button type="button" className={`btn btn-primary ${item.answer === 'Yes' ? 'btn-selected' : ''}`} onClick={_ => this.handleChange(index, 'Yes')}>Yes</button>
                </div>)
            }
            else {
                return null;
            }
        })
        return (
            <div className="row" >
                <h3 className="heading">Your Location</h3>
                <h5 className="sub-heading">Please enter your postcode</h5>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter your post code here" id="autocomplete" />
                    <div className="input-group-btn custom-btn">
                        <button className="btn btn-default" type="submit">
                            <i className="fa fa-map-marker"></i>
                        </button>
                    </div>
                </div>
                <div className="questions-container">
                    {questions}
                    {this.state.questions.length === this.state.selected ? this.displayDynamicQuestions() : <></>}
                    <div className="buttons-container">
                        {(this.state.dropDown.selected.length || this.state.building.index) ? <button className="btn btn-default" onClick={() => this.props.handleClick()}>Continue</button> : <></>}
                    </div>

                </div>
            </div>
        )
    }
}
