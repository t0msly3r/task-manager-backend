"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema, property = 'body') => (req, res, next) => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
        return res.status(400).json({
            errors: zod_1.z.treeifyError(result.error),
        });
    }
    req[property] = result.data;
    next();
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map