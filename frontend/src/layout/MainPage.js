import React from 'react';
import { connect } from 'react-redux';
import Symptom from '../components/Symptom';
import Diagnosis from '../components/Diagnosis';
import Report from '../components/Report';


const mapStateToProps = state => ({
    displayDiagnosis: state.diagnosis.displayDiagnosis,
    displayReport: state.report.displayReport
});


const MainPage = ({ dispatch, displayDiagnosis, displayReport}) => ( 
    <div className="main-page">
        <Symptom dispatch={dispatch} />
        {displayDiagnosis && <Diagnosis dispatch={dispatch} />}
        {displayReport && <Report/>}
    </div>
);

export default connect(mapStateToProps)(MainPage);
