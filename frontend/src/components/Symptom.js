import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';


class Symptom extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            symptoms: [],
            mostLikelyDiagnosis: '',
            listDiagnosis: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('/api/symptoms')
            .then(response => response.json())
            .then(symptoms => this.setState({ symptoms: symptoms.data, value: symptoms.data[0] }));
    }

    handleChange(event) {
        const val = event.targget.value;
        fetch('/api/diagnosis/' + val)
            .then(response => response.json())
            .then(diagnosis => this.setState({ mostLikelyDiagnosis: diagnosis.data[0], listDiagnosis: diagnosis.data.slice(1) }));;
        this.props.dispatch({ type: 'USER_MOST_LIKELY_DIAGNOSIS_DEMAND', mostLikelyDiagnosis: this.state.mostLikelyDiagnosis, listDiagnosis: this.state.listDiagnosis});
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Example select</Form.Label>
                    <Form.Control as="select" onChange={e => this.handleChange(e)}>
                        {
                            this.state.symptoms.map(symptom => (
                                <option>{symptom}</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>
            </Form>
        );
    }
}

export default Symptom;
