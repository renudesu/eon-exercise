import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Stepper.css";

export default class Stepper extends Component {
  constructor() {
    super();
    this.state = {
      steps: []
    };
  }

  componentDidMount() {
    const { steps, currentStepNumber } = this.props;
    const stepsState = steps.map((step, index) => {
      const stepObj = {};
      stepObj.description = step.description;
      stepObj.iconClass = step.iconClass;
      stepObj.highlighted = index === 0 ? true : false;
      stepObj.selected = index === 0 ? true : false;
      stepObj.completed = false;
      return stepObj;
    });

    const currentSteps = this.updateStep(currentStepNumber, stepsState);

    this.setState({
      steps: currentSteps
    });
  }

  componentDidUpdate(prevProps) {
    const { steps } = this.state;
    const currentSteps = this.updateStep(this.props.currentStepNumber, steps);

    if (prevProps.currentStepNumber !== this.props.currentStepNumber)
      this.setState({
        steps: currentSteps
      });
  }

  updateStep(stepNumber, steps) {
    const newSteps = [...steps];
    let stepCounter = 0;
    while (stepCounter < newSteps.length) {
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false
        };
        stepCounter++;
      }
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true
        };
        stepCounter++;
      }
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false
        };
        stepCounter++;
      }
    }

    return newSteps;
  }

  render() {
    const { direction, stepColor } = this.props;
    const { steps } = this.state;
    const stepsJSX = steps.map((step, index) => {
      return (
        <div className="step-wrapper" key={index}>
          <div
            className={`step-number ${step.selected ? "step-number-selected" : "step-number-disabled"
              }`}
            style={{ background: `${step.selected ? stepColor : "none"}` }}
          >
            <i className={step.iconClass}></i>
          </div>
          <div
            className={`step-description ${step.highlighted &&
              "step-description-active"}`}
          >
            {step.description}
          </div>
          {
            index !== steps.length - 1 && (
              <div className={`divider-line divider-line-${steps.length}`} />
            )
          }
        </div >
      );
    });

    return (<>
      <div className={`stepper-wrapper-${direction}`}>{stepsJSX}</div>
      <div className="container">{this.props.children}</div>
    </>);
  }
}

Stepper.propTypes = {
  direction: PropTypes.string.isRequired,
  currentStepNumber: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  stepColor: PropTypes.string.isRequired
};
