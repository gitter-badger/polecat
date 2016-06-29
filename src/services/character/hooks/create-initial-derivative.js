'use strict';

// src\services\character\hooks\create-initial-derivative.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

// const defaults = {};

module.exports = () => {
    // options = Object.assign({}, defaults, options);

    return hook => {
        const derivativeService = hook.app.service('derivatives');

        return derivativeService.create(hook.data)
            .then(data => {
                hook.data = Object.assign({}, hook.data, { defaultId: data._id, derivativeIds: [ data._id ] });

                return hook;
            })
    };
};
