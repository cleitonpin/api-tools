import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepository";
import usersView from '../views/user_view';

export default {
    async authenticate(req: Request, res: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const { email, password } = req.body;

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }

        const isValidPassword = bcrypt.compare(password, user.password);

        if (!(isValidPassword)) return res.sendStatus(401);

        return res.status(200).json({
            user: usersView.render(user),
            token: user.generateToken()
        })
    }
}