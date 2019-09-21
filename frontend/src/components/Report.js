import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const mapStateToProps = state => ({
    report: state.report.report
});

class Report extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        const report = this.props.report;
        const data = [];
        for (let key in report){
            data.push({name: key, pv: report[key]})
        }
        this.setState({data: data});
    }

    render() {
        return (
            <BarChart
                width={650}
                height={300}
                data={this.state.data}
                margin={{
                    top: 5, right: 0, left: 0, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tick={{fontSize: '10px'}} dataKey={"name"} allowDataOverflow={true} >
                </XAxis>
                <YAxis tick={{ fontSize: 15 }}>
                  <Label value="Frequency" angle={-90} position="insideLeft" textAnchor="middle" />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" barSize={30} />
            </BarChart>
        )
    };
}

export default connect(mapStateToProps)(Report);