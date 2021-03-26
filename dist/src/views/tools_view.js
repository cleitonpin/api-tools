"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render: function (_a) {
        var id = _a.id, title = _a.title, link = _a.link, description = _a.description, tags = _a.tags;
        return {
            id: id,
            title: title,
            link: link,
            description: description,
            tags: tags
        };
    },
    renderMany: function (tools) {
        var _this = this;
        return tools.map(function (tool) { return _this.render(tool); });
    }
};
