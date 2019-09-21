import React, { Component } from 'react';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';


const mapStateToProps = state => ({
    mostLikelyDiagnosis: state.diagnosis.mostLikelyDiagnosis,
    listDiagnosis: state.diagnosis.listDiagnosis
  });

class Symptom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    handleChange(event) {
        switch (event.target.id) {
            case "email":
                this.setState({ email: event.target.value });
                break;
            case "password":
                this.setState({ password: event.target.value });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Card>
                <Card.Body>{this.props.mostLikelyDiagnosis}</Card.Body>
            </Card>
        );
    }
}
export default connect(mapStateToProps)(Symptom);