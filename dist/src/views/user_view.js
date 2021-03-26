"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render: function (_a) {
        var id = _a.id, username = _a.username, email = _a.email, created_at = _a.created_at;
        return {
            id: id,
            username: username,
            email: email,
            created_at: created_at
        };
    },
    renderMany: function (users) {
        var _this = this;
        return users.map(function (tool) { return _this.render(tool); });
    }
};
