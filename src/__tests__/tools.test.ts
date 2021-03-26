import request from 'supertest';
import { getConnection, getCustomRepository } from "typeorm";
import { app } from "../app";
import createConnection from '../database/connection';
import { ToolsRepository } from '../repositories/ToolsRepository';

describe('tools', () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async (done) => {
        const connection = getConnection();
        
        for (const entity of connection.entityMetadatas) {
            const repository = getConnection().getRepository(entity.name); // Get repository
            await repository.clear(); // Clear each entity table's content
        }

        await connection.close();
        done()
    });

    it('Should be able to create a new tool', async () => {
        const res = await request(app).post("/tools").send({
            "title": "Notion",
            "link": "https://notion.so",
            "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
            "tags": [
                "organization",
                "planning",
                "collaboration",
                "writing",
                "calendar"
            ]
        })

        expect(res.status).toBe(201);
    })

    it('Should be able to list all tools', async () => {
        const res = await request(app).get("/tools");

        expect(res.status).toBe(200);
    })

    it('Should be able to delete one tool', async () => {

        const toolsRepository = getCustomRepository(ToolsRepository);

		const tools = toolsRepository.create({
            title: "Notion",
            link: "https://notion.so",
            description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
            tags: [
                "organization",
                "planning",
                "collaboration",
                "writing",
                "calendar"
            ]
		});
        await toolsRepository.save(tools);

        const res = await request(app).delete(`/tools/${tools.id}`);
        const get = await request(app).get(`/tools/${tools.id}`);

        expect(res.status).toBe(204);
        expect(get.status).toBe(404);
    });

    it('You must not be able to delete a non-existent tool', async () => {

        const res = await request(app).delete(`/tools/26e9dc1d-1b05-4a71-922f-96d514041744`);

        expect(res.status).toBe(404);
    });

    it('Must be able to find by tag', async () => {

        const toolsRepository = getCustomRepository(ToolsRepository);

		const tools = toolsRepository.create({
            title: "Notion",
            link: "https://notion.so",
            description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
            tags: [
                "organization",
                "planning",
                "collaboration",
                "writing",
                "calendar"
            ]
		});
        await toolsRepository.save(tools);

        const res = await request(app).get('/tools').query({ tag: tools.tags[0] });

        expect(res.status).toBe(200);
    })

    it('Must not be able to find by tag', async () => {

        const toolsRepository = getCustomRepository(ToolsRepository);

		const tools = toolsRepository.create({
            title: "Notion",
            link: "https://notion.so",
            description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
            tags: [
                "organization",
                "planning",
                "collaboration",
                "writing",
                "calendar"
            ]
		});
        await toolsRepository.save(tools);

        const res = await request(app).get('/tools').query({ tag: 'test' });

        expect(res.status).toBe(404);
    });

    it("You shouldn't be able to create without an argument", async () => {

        const res = await request(app).post("/tools").send({
            "link": "https://notion.so",
            "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
            "tags": [
                "organization",
                "planning",
                "collaboration",
                "writing",
                "calendar"
            ]
        })

        expect(res.status).toBe(400);
    });
})