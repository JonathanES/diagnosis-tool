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

/**
 * component to display all the symptoms
 */
class Symptom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayList: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
    }
    /**
     * 
     * @param {*} event 
     * we check if the diagonis is correct or not.
     * if the user says no, we display the list of diagonises without the one that the user refused
     * if the user says yes, we increase the frequency of the diagonise and display the report
     */
    handleClick(event) {
        const val = event.target.id;
        if (val === "no") {
            this.props.dispatch({ type: 'USER_DISPLAY_LIST_DIAGNOSIS_DEMAND', mostLikelyDiagnosis: this.props.mostLikelyDiagnosis, listDiagnosis: this.props.listDiagnosis });
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

    /**
     * 
     * @param {*} diagnosis 
     * take as param a diagonis
     * this diagonis is removed from the list of diagonis
     * the previous recommendation is inserted in the list of diagonis
     * the new recommended diagonis is the one that has been chosen by the user
     * the user will then need to confirm his choice or choose another diagnosis
     */
    handleCardClick(diagnosis) {
        const listDiagnosis = this.props.listDiagnosis;
        const index = listDiagnosis.indexOf(diagnosis);
        if (index > -1) {
            listDiagnosis.splice(index, 1);
            listDiagnosis.push(this.props.mostLikelyDiagnosis);
            this.props.dispatch({ type: 'USER_DISPLAY_LIST_DIAGNOSIS_DEMAND', mostLikelyDiagnosis: diagnosis, listDiagnosis: listDiagnosis });
        }
    }

    render() {
        return (
            <div id="diagnosis">
                <Card>
                    {!this.props.displayListDiagnosis && <Card.Body>
                        <p>
                            {this.props.mostLikelyDiagnosis}
                        </p>
                        <Button variant="success" id="yes" onClick={e => this.handleClick(e)}>YES</Button>
                        <Button variant="danger" id="no" onClick={e => this.handleClick(e)} >NO</Button>
                    </Card.Body>}

                    {this.props.displayListDiagnosis &&
                        <div id="list-diagnosis">
                            <Card bg="info" text="white">
                                <Card.Body>Please select the diagnosis that seems to be the most likely correct</Card.Body>
                            </Card>
                            <ListGroup variant="flush">
                                {this.props.listDiagnosis.map(diagnosis => (
                                    <ListGroup.Item onClick={e => this.handleCardClick(diagnosis)}>{diagnosis}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>}
                </Card>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Symptom);