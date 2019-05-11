const Router = require("koa-router");
const router = new Router();
router.get('/get', ({ response }) => {
    response.body = 'template-service-name';
});

module.exports = router;