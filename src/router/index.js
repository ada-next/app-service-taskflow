const Router = require("koa-router");
const router = new Router();

router.get('/get', ({ response }) => {
    response.body = 'template-service-name';
});
router.get('/set', ({ Service, response }) => {
    return Service.getService('testService').test().then(a => {
        response.body = a;
    }).catch(a => {
        response.body = a;
    });
});

module.exports = router;