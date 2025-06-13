export interface User{
    id:string
    name:string
    email:string
    password:string
    bio?:string
    profile_image_url?:string
    cover_image_url?:string
    created_at:Date
    updated_at:Date
}

export type UserResponse=Omit<User,'password'>