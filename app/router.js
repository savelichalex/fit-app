var BaseRouter = require('base-frame-server/baseRouter');

function Router() {
    this.init();
}

Router.prototype = {
    routes: {
        '/': 'index',
        'diary': 'diary',
        'POST api/diary': 'diary_new-record'
    }
};

Router.extends(BaseRouter);

module.exports = Router;