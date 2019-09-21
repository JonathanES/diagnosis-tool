import React from 'react';
import { connect } from 'react-redux';
import Symptom from '../components/Symptom';
import Diagnosis from '../components/Diagnosis';


const mapStateToProps = state => ({
    display: state.diagnosis.display
});


const MainPage = ({ dispatch, display}) => ( 
    <div className="main-page">
        <Symptom dispatch={dispatch} />
        {display && <Diagnosis dispatch={dispatch} />}
    </div>
);

export default connect(mapStateToProps)(MainPage);
