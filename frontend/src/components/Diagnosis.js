import React, { Component } from 'react';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


const mapStateToProps = state => ({
    mostLikelyDiagnosis: state.diagnosis.mostLikelyDiagnosis,
    listDiagnosis: state.diagnosis.listDiagnosis
});

class Symptom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayList: false
        };

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        const val = event.target.id;
        if (val === "no") {
            this.setState({ displayList: true });
        }
        console.log(val);
    }

    render() {
        return (
            <Card>
                {!this.state.displayList && <Card.Body>
                    <p>
                        {this.props.mostLikelyDiagnosis}
                    </p>
                    <Button variant="success" id="yes" onClick={e => this.handleClick(e)}>YES</Button>
                    <Button variant="danger" id="no" onClick={e => this.handleClick(e)} >NO</Button>
                </Card.Body>}

                {this.state.displayList && <ListGroup variant="flush">
                    {this.props.listDiagnosis.map(diagnosis => (
                        <ListGroup.Item>{diagnosis}</ListGroup.Item>
                    ))}
                </ListGroup>}
            </Card>
        );
    }
}
export default connect(mapStateToProps)(Symptom);