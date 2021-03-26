import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import * as yup from "yup";
import { UserRepository } from "../repositories/UsersRepository";
import usersView from '../views/user_view';

export default {

	async logged(req: Request, res: Response) {
		const userRepository = getCustomRepository(UserRepository)
		
		const user = await userRepository.findOne(req.userId);
		
		return res.status(200).json(usersView.render(user));
	},

	async index(req: Request, res: Response) {
		const userRepository = getCustomRepository(UserRepository)
		
		const user = await userRepository.find();
		return res.status(200).json(usersView.renderMany(user));
	},

	async create(req: Request, res: Response) {
		const { username, password, email } = req.body;
        const usersRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await usersRepository.findOne({ where: { email } });

        if (userAlreadyExists) {
            return res.status(400).json({
                message: 'User with this email already exists'
            })
        }
        
		const schema = yup.object().shape({
			username: yup.string().required(),
			password: yup.string().required(),
			email: yup.string().email().required(),
		});

		const isValid = await schema.isValid(req.body);

		if (!isValid) {
			return res.status(400).json({
				message: "Validation Failed!"
			})
		}

		const user = usersRepository.create({
			username,
			password,
			email,
		});

		await usersRepository.save(user);

		return res.status(201).json(user)
	},

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		const usersRepository = getCustomRepository(UserRepository);
		const user = await usersRepository.findOne({ where: { id } });
		
		if (!user) {
			return res.status(401).json({
				message: 'User not found!'
			})
		}

		try {
			await usersRepository.delete(id);

			return res.sendStatus(204);
		} catch (e) {
			return res.status(500).json({
				message: 'Error to deleting user'
			})
		}
	}
}
