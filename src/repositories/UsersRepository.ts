import { EntityRepository, Repository } from "typeorm";
import Users from "../models/Users";

@EntityRepository(Users)
class UserRepository extends Repository<Users> {}

export { UserRepository };
