import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing';
import LeisurePoints from './pages/LeisurePoints';
import UtilityPoints from './pages/UtilityPoints';
import PlaceForm from './pages/PlaceForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/leisure-points" component={LeisurePoints} />
            <Route path="/utility-points" component={UtilityPoints} />
            <Route path="/register-place" component={PlaceForm} />
        </BrowserRouter>
    )
}

export default Routes