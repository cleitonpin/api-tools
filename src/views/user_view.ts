import Users from '../models/Users';

export default {

    render({
        id,
        username,
        email,
        created_at
    }: Users) {
		return {
			id,
			username,
			email,
			created_at
		}
	},
	renderMany(users: Users[]) {
		return users.map(tool => this.render(tool))
	}
}