import Tools from '../models/Tools';

export default {
	render({
		id,
		title,
		link,
		description,
		tags
	}: Tools) {
		return {
			id,
			title,
			link,
			description,
			tags
		}
	},
	renderMany(tools: Tools[]) {
		return tools.map(tool => this.render(tool))
	}
}