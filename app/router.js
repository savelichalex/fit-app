var BaseRouter = require('base-frame-server/baseRouter');

function Router() {
    this.init();
}

Router.prototype = {
    routes: {
        '/': 'index',
        'diary': 'diary',
        'rufie': 'rufie',
        'POST api/diary': 'diary_new-record',
        'GET api/diary/exercises/:exercise': 'diary_exercises_search'
    }
};

Router.extends(BaseRouter);

module.exports = Router;