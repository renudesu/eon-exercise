import React from 'react';
import Stepper from "./stepper/Stepper";

import QuestionsComponent from './components/Questions';
import PackageComponent from './components/Package';
import OfferComponent from './components/Offer';

import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1
    };
  }

  handleClick(clickType) {
    const { currentStep } = this.state;
    let newStep = currentStep;
    clickType === "next" ? newStep++ : newStep--;

    if (newStep > 0 && newStep <= 5) {
      this.setState({
        currentStep: newStep
      });
    }
  }

  render() {
    const { currentStep } = this.state;

    return (
      <>
        <div className="stepper-container-horizontal">
          <Stepper
            direction="horizontal"
            currentStepNumber={currentStep - 1}
            steps={stepsArray}
            stepColor="purple"
          >
            {currentStep === 1 ? <QuestionsComponent handleClick={() => this.handleClick("next")} /> : <></>}
            {currentStep === 2 ? <PackageComponent /> : <></>}
            {currentStep === 3 ? <OfferComponent /> : <></>}
          </Stepper>
        </div>
      </>
    );
  }
}

const stepsArray = [
  { description: "A few simple questions", iconClass: "fa fa-home" },
  { description: "Select your preferred package", iconClass: "fa fa-tv" },
  { description: "Your personalised offer", iconClass: "fa fa-list" }
];

export default App;
