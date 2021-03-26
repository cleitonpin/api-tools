import request from 'supertest';
import { getConnection, getCustomRepository } from "typeorm";
import { app } from "../app";
import createConnection from '../database/connection';
import { UserRepository } from '../repositories/UsersRepository';

describe('users', () => {

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

    
    it('Should be able to create a new user', async () => {
        const res = await request(app).post("/user").send({
            username: "Lok",
            password: "123",
            email: "test@example.com.br"
        })

        expect(res.status).toBe(201);
    });

    it('Should not be able to create a user with exists email', async () => {
        const res = await request(app).post("/user").send({
            username: "Lok",
            password: "123",
            email: "test@example.com.br"
        })

        expect(res.status).toBe(400);
    });

    it("You shouldn't be able to create without an argument", async () => {
        const res = await request(app).post("/user").send({
            password: "123",
            email: "test@example.com.br"
        })

        expect(res.status).toBe(400);
    });

    it("should authentication with valid credentials", async () => {
        const usersRepository = getCustomRepository(UserRepository);
        
		const user = usersRepository.create({
			username: "lok1",
			password: "123",
			email: "t23123st@example.com.br",
		});

		await usersRepository.save(user);
        
        const res = await request(app).post("/login").send({
            password: user.password,
            email: user.email
        });

        expect(res.status).toBe(200);

    })

    it("should return jwt token when authenticated", async () => {
        const usersRepository = getCustomRepository(UserRepository);
        
		const user = usersRepository.create({
			username: "lok",
			password: "123",
			email: "testlok@example.com.br",
		});

		await usersRepository.save(user);

        const res = await request(app).post("/login").send({
            password: user.password,
            email: user.email
        });

        expect(res.body).toHaveProperty('token');
    })

    it("should be able to access private routes when authenticated", async () => {
        const usersRepository = getCustomRepository(UserRepository);
        
		const user = usersRepository.create({
			username: "lok",
			password: "123",
			email: "ttttt@example.com.br",
		});
        
        const res = await request(app)
            .get("/user/profile")
            .set('Authorization', `Bearer ${user.generateToken()}`);
        
        expect(res.status).toBe(200);
    });

    it("should not be able to access private routes when not authenticated", async () => {
        const res = await request(app)
            .get("/user/profile")
        
        expect(res.status).toBe(401);
    })

    it("should not be able to access private routes with invalid jwt token", async () => {
        const res = await request(app)
            .get("/user/profile")
            .set('Authorization', `Bearer 21323123`);
        
        expect(res.status).toBe(401);
    })
})