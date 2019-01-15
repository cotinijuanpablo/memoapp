import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddNote from './components/NoteForm';


import * as serviceWorker from './serviceWorker';

const render = () => {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" render={() => <Dashboard />}/>
                <Route exact path="/add" render={(props) => <AddNote {...props} />}/>
            </React.Fragment>
        </BrowserRouter>, document.getElementById('root')
    );
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
