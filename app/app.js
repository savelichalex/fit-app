var defer = require('base-frame-server/util.js').defer,
    Router = require('./router.js'),
    DiaryComponent = require('./components/Diary/Diary.js'),
    MysqlManager = require('base-frame-server/MysqlManager');

var router = new Router();
var diary = new DiaryComponent();
var mysqlManager = new MysqlManager();