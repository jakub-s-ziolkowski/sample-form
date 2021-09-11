'use strict';

import { receiveData } from './receiveData.js';

const signIn = (req, res) =>
    receiveData(req, res, content => {

        console.log(content);
    });

const signUp = (req, res) =>
    receiveData(req, res, content => {

        console.log(content);
    });

export { signIn, signUp };
