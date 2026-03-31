"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var env_1 = require("./config/env");
app_1.default.listen(env_1.env.PORT, function () {
    console.log("Server running on port ".concat(env_1.env.PORT));
});
