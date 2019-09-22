import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

/**
 * display the different symptoms a user can have
 */
class Symptom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symptoms: [],
            mostLikelyDiagnosis: '',
            listDiagnosis: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * before the component is being displayed.
     * get all the symptoms to be displayed in the select.
     */
    componentDidMount() {
        fetch('/api/symptoms')
            .then(response => response.json())
            .then(symptoms => this.setState({ symptoms: symptoms.data, value: symptoms.data[0] },
                () => this.props.dispatch({ type: 'USER_SYMPTOM_CHOSEN', symptomChosen: symptoms.data[0] })))
    }

    /**
     * 
     * @param {*} event 
     * when a user has selected a symptom, we retrieve our recommended diagnosis
     * and also the list of diagnosis.
     */
    handleClick(event) {
        const val = event.target.value;
        fetch('/api/diagnosis/' + val)
            .then(response => response.json())
            .then(diagnosis => this.setState({
                mostLikelyDiagnosis: diagnosis.data[0],
                listDiagnosis: diagnosis.data.slice(1)
            },
                () => {
                    this.props.dispatch({ type: 'USER_MOST_LIKELY_DIAGNOSIS_DEMAND', mostLikelyDiagnosis: diagnosis.data[0], listDiagnosis: diagnosis.data.slice(1) });
                    this.props.dispatch({ type: 'USER_SYMPTOM_CHOSEN', symptomChosen: val });
                }
            ))
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Please choose a symptom</Form.Label>
                    <Form.Control as="select" onClick={e => this.handleClick(e)}>
                        {
                            this.state.symptoms.map(symptom => (
                                <option key={symptom}>{symptom}</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>
            </Form>
        );
    }
}

export default Symptom;
