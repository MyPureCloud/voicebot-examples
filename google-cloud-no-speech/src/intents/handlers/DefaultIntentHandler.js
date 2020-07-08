'use strict';

class DefaultIntentHandler {
    constructor() {
    }

    canHandle(request) {
      return true;
    }

    handle(request, response) {
        throw 'Unable to find a handler for this request.';
    }
  }

module.exports = DefaultIntentHandler;