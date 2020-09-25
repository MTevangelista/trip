import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing';
import FindPlaces from './pages/FindPlaces';
import PlaceForm from './pages/PlaceForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/find-places" component={FindPlaces} />
            <Route path="/register-place" component={PlaceForm} />
        </BrowserRouter>
    )
}

export default Routes