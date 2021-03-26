import { Request, Response } from "express";
import { getCustomRepository, Like } from 'typeorm';
import * as yup from "yup";
import { ToolsRepository } from "../repositories/ToolsRepository";
import toolsView from "../views/tools_view";

export default {

	async index(req: Request, res: Response) {
		const toolsRepository = getCustomRepository(ToolsRepository)
		
		const tools = await toolsRepository.find();
		
		const { id } = req.params;
		const { tag } = req.query;

		if (tag) {
			const tags = await toolsRepository.find({
				where: { tags: Like(`%${tag}%`) }
			});
			
			if (tags.length <= 0) {
				return res.status(404).json({
					message: 'Not found with this query'
				})
			}
			return res.status(200).json(toolsView.renderMany(tags))
		} else if (id) {
			const tool = await toolsRepository.find({
				where: { id }
			});

			if (tool.length <= 0) {
				return res.status(404).json({
					message: 'Not found with this parameter'
				})
			}
			return res.status(200).json(toolsView.renderMany(tool))
		}
		
		return res.status(200).json(toolsView.renderMany(tools));
	},

	async create(req: Request, res: Response) {
		const { title, link, description, tags } = req.body;

		const schema = yup.object().shape({
			title: yup.string().required(),
			link: yup.string().required(),
			description: yup.string().required(),
			tags: yup.array().of(yup.string()).required()
		});

		const isValid = await schema.isValid(req.body);

		if (!isValid) {
			return res.status(400).json({
				message: "Validation Failed!"
			})
		}

		const toolsRepository = getCustomRepository(ToolsRepository);

		const tools = toolsRepository.create({
			title,
			link,
			description,
			tags
		});

		await toolsRepository.save(tools);

		return res.status(201).json(tools)
	},

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		const toolsRepository = getCustomRepository(ToolsRepository);
		const tools = await toolsRepository.findOne({ where: { id } });
		
		if (!tools) {
			return res.status(404).json({
				message: 'Tools not found!'
			})
		}

		try {
			await toolsRepository.delete(id);

			return res.sendStatus(204);
		} catch (e) {
			return res.status(500).json({
				message: 'Error to deleting tools'
			})
		}
	}
}
