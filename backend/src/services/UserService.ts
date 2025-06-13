import pool from "../config/database"
import {User, UserResponse} from "../models/UserModel"
import bcrypt from 'bcrypt'

class UserService{
    async getUserByEmail(email:string):Promise<User|null>{
        const result=await pool.query('SELECT * FROM users WHERE email = $1',[email])
        return result.rows[0] || null
    }
    async createUser(user_data:Omit<User, 'id'|'created_at'|'updated_at'>):Promise<void>{
        const {name,email,password}=user_data
        const salt=await bcrypt.genSalt(10)
        const hashed_password=await bcrypt.hash(password,salt)
        await pool.query(`
            INSERT INTO users (name,email,password)
            VALUES ($1,$2,$3)`,
            [name,email,hashed_password]
        )
    }
    async updateProfile(userId:number,name:string,bio?:string,profileImage?:string,coverImage?:string):Promise<UserResponse | null>{
        const res=await pool.query(
            `UPDATE users
             SET name = COALESCE($1, name),
                 bio = COALESCE($2, ''),
                 profile_image_url = COALESCE($3, profile_image_url),
                 cover_image_url = COALESCE($4, cover_image_url)
             WHERE id = $5
             RETURNING id, name, bio, profile_image_url, cover_image_url`,
            [name,bio,profileImage,coverImage,userId]
          );
          return res.rows[0]
    }
    async getUserById(id: number): Promise<UserResponse | null> {
        const result = await pool.query(
          `SELECT id, name, email, bio, profile_image_url, cover_image_url, created_at
           FROM users WHERE id = $1`,
          [id]
        );
        return result.rows[0];
      }
}

export default new UserService()