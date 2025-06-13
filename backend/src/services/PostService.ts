import pool from "../config/database"
import { Post } from "../models/PostModel"
import bcrypt from 'bcrypt'

class PostService {
  async createPost(user_id: number, text: string, post_image?: string): Promise<Post> {
    const res = await pool.query(`
            INSERT INTO posts (user_id,text,post_image)
            VALUES ($1,$2,$3)
            RETURNING id, user_id, text, post_image, created_at`,
      [user_id, text, post_image]
    ); console.log(res.rows)
    return res.rows[0]
  }
  async fetchPosts(user_id: number, page: number, limit: number): Promise<Post[]> {
    const offset = (page - 1) * limit

    const posts = await pool.query(`
        SELECT 
          p.*,
          u.id as user_id,
          u.name as user_name,
          u.profile_image_url,
          (SELECT EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1)) as has_liked,
          (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count,
          (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.user_id IN (
          SELECT following_id FROM follows WHERE follower_id = $1
        ) OR p.user_id = $1
        ORDER BY p.created_at DESC
        LIMIT $2 OFFSET $3
      `, [user_id, limit, offset])

    return posts.rows

  }
  async getPostById(post_id:number,user_id:number):Promise<Post>{
    const post = await pool.query(`
        SELECT 
          p.*,
          u.id as user_id,
          u.name as user_name,
          u.profile_image_url,
          (SELECT EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1)) as has_liked,
          (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count,
          (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.id = $2
      `, [user_id,post_id])

    return post.rows[0]
  }
  async likePost(post_id: number, user_id: number): Promise<void> {
    await pool.query(
      'INSERT INTO likes (post_id, user_id) VALUES ($1, $2)',
      [post_id, user_id]
    );
  }

  async unlikePost(post_id: number, user_id: number): Promise<void> {
    await pool.query(
      'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
      [post_id, user_id]
    );
  }

}

export default new PostService()