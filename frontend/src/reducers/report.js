const defaultState = {
    report: {},
    displayReport: false
};

const report = (state = defaultState, action) => {
    switch (action.type) {
        case 'REPORT':
            return {
                ...state,
                report: action.report,
                displayReport: true
            };
        case 'DO_NOT_DISPLAY_REPORT':
            return {
                ...state,
                report: {},
                displayReport: false
            };
        default:
            return state;
    }
};

export default report;