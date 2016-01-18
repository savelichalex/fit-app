require('base-extends');
var defer = require('base-frame-server/util.js').defer,
    Router = require('./router.js'),
    Diary = require('./components/Diary/Diary.js'),
    Rufie = require('./components/Rufie/Rufie.js'),
    MysqlManager = require('base-frame-server/MysqlManager'),
    Mediator = require('base-frame-server/Mediator')();

var router = new Router();
var diary = new Diary(Mediator);
var rufie = new Rufie(Mediator);
var mysqlManager = new MysqlManager();