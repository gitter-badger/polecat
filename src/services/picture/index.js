'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');
const filters = require('./filters');

module.exports = function () {
    const app = this;

    const db = new NeDB({
        filename: path.join(app.get('nedb'), 'pictures.db'),
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
    app.use('/pictures', service(options));

    // Get our initialize service to that we can bind hooks
    const pictureService = app.service('/pictures');

    // Set up our before hooks
    pictureService.before(hooks.before);

    // Set up our after hooks
    pictureService.after(hooks.after);

    pictureService.filter(filters);
};
