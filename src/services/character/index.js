'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');
const filters = require('./filters');

module.exports = function () {
    const app = this;

    const db = new NeDB({
        filename: path.join(app.get('nedb'), 'characters.db'),
        autoload: true
    });

    let options = {
        Model: db,
        paginate: {
            default: 5,
            max: 25
        }
    };

    // Initialize our service with any options it requires
    app.use('/characters', service(options));

    // Get our initialize service to that we can bind hooks
    const characterService = app.service('/characters');

    // Set up our before hooks
    characterService.before(hooks.before);

    // Set up our after hooks
    characterService.after(hooks.after);

    characterService.filter(filters);
};
