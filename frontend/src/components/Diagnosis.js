import React, { Component } from 'react';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


const mapStateToProps = state => ({
    symptomChosen: state.symptom.symptomChosen,
    mostLikelyDiagnosis: state.diagnosis.mostLikelyDiagnosis,
    listDiagnosis: state.diagnosis.listDiagnosis,
    displayListDiagnosis: state.diagnosis.displayListDiagnosis
});

class Symptom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayList: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
    }
    handleClick(event) {
        const val = event.target.id;
        if (val === "no") {
            this.props.dispatch({ type: 'USER_DISPLAY_LIST_DIAGNOSIS_DEMAND', mostLikelyDiagnosis: this.props.mostLikelyDiagnosis, listDiagnosis: this.props.listDiagnosis});
        }
        else if (val === "yes") {
            let data = {
                "diagnosis": this.props.mostLikelyDiagnosis,
                "symptom": this.props.symptomChosen
            }
            fetch("/api/report", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(async response => {
                response = await response.json();
                console.log(response.data);
                this.props.dispatch({ type: 'USER_REPORT', report: response.data })
            }).catch(err => {
                console.log(err);
            })
        }
        console.log(val);
    }

    handleCardClick(diagnosis) {
        const listDiagnosis = this.props.listDiagnosis;
        const index = listDiagnosis.indexOf(diagnosis);
        if (index > -1){
            listDiagnosis.splice(index,1);
            listDiagnosis.push(this.props.mostLikelyDiagnosis);
            this.props.dispatch({ type: 'USER_DISPLAY_LIST_DIAGNOSIS_DEMAND', mostLikelyDiagnosis: diagnosis, listDiagnosis: listDiagnosis});
        }
    }

    render() {
        return (
            <Card>
                {!this.props.displayListDiagnosis && <Card.Body>
                    <p>
                        {this.props.mostLikelyDiagnosis}
                    </p>
                    <Button variant="success" id="yes" onClick={e => this.handleClick(e)}>YES</Button>
                    <Button variant="danger" id="no" onClick={e => this.handleClick(e)} >NO</Button>
                </Card.Body>}

                {this.props.displayListDiagnosis && <ListGroup variant="flush">
                    {this.props.listDiagnosis.map(diagnosis => (
                        <ListGroup.Item onClick={e => this.handleCardClick(diagnosis)}>{diagnosis}</ListGroup.Item>
                    ))}
                </ListGroup>}
            </Card>
        );
    }
}
export default connect(mapStateToProps)(Symptom);