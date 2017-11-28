import React from "react";
import { Switch, Route } from "react-router-dom";

import Starter from './components/Starter/Starter';

export default (
    <Switch>
        <Route exact path="/" component={Starter} />
    </Switch>
)