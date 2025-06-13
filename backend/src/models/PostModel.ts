export interface Post{
    id: string
    user_id: string
    text: string
    user_name?:string
    profile_image_url?:string
    created_at: string
    has_liked:boolean
    likes_count: number
    comments_count: number
    post_image: string
}
