Backend is in Node.js, Frontend is with React + Redux
## How to use the project

1. Clone
2. Install the dependencies - `npm install` at the root, `npm install` at the root of the frontend direcory
3. `npm run dev` at the root of the project to launch the frontend and backend at the same time.
4. http://localhost:8080/api-docs/#/ Link to the documentation
5. `npm run test` at the root of the project to launch the tests for the backend

## How the backend works
1. The data-access is the layer where we read the csv file and convert it into a data structure that corresponds to my need.
2. The business-management calls the data access to retrieve the data. It is also in the business management that we manipulate the data and send it back to the frontend.
3. The routes are what connects the backend with the frontend. When the frontend sends a request, it follows a specific route. The route will then call a function of the business-management and send back the response to the frontend.
4. When we launch the server, we call the function getAllSymptomsInformation() to retrieve the data from the csv and intialize our global variable

## How the frontend works
1. The file App.js is the first file called. It calls the component MainPage, which is the layout of our web application.
2. Layout/MainPage.js is the component that will display the component that we need.
3. The components that are being displayed (Diagnonis, Report and Symptom) are in the folder components.
4. The different components communicates thanks to the sagas and the reducers.