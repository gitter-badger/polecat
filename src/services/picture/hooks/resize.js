'use strict';

// src\services\picture\hooks\resize.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const resizer = require('lwip');

// const defaults = {};
const encodings = {
    "image/png": "png",
    "image/gif": "gif",
    "image/jpeg": "jpg"
};

module.exports = (size, test) => {
    // options = Object.assign({}, defaults, options);

    return hook => new Promise((resolve, reject) => {
        if (test && !test(hook)) {
            resolve(hook);
        }

        resizer.open(hook.data.buffer, encodings[hook.data.mimetype], (err, image) => {
            let batch = image.batch();
            if(image.width() > size && image.height() > size) {
                batch.resize(size);
            }
            batch.toBuffer(encodings[hook.data.mimetype], (err, buffer) => {
                if (err) {
                    reject(err);
                }
                else {
                    hook.data.buffer = buffer;

                    resolve(hook);
                }
            });
        })
    });
};
