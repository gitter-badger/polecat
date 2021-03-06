'use strict';

// src\services\derivative\hooks\add-full.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

// const defaults = {};

module.exports = () => {
    // options = Object.assign({}, defaults, options);

    return hook => {
        const pictureService = hook.app.service('pictures');

        if(!hook.full) {
            return hook;
        }

        return pictureService.create(Object.assign({}, hook.full, { type: "full" }))
            .then(data => {
                hook.data.fullId = data.id;

                return hook;
            });
    }
};
