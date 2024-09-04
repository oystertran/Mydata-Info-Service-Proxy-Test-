const profile = require('../controllers/profile.js');

function PROFILE_ROUTER(router) {
    var self = this;
    self.handleRoutes(router);
}

PROFILE_ROUTER.prototype.handleRoutes = function (router){
    router.get("/profile/biz/:compNo", profile.biz, profile.procRPC);

    router.get("/profile/comp/:compNo", profile.comp, profile.procRPC);
} 

module.exports = PROFILE_ROUTER;