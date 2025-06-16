import { CreatePostData, Post, Comment } from '../types'
import api from '../api'
import useAuthStore from '../store/authStore';

const userService = {
  createPost: async (data: CreatePostData): Promise<Post> => {
    const formData = new FormData()
    formData.append("text", data.text)
    if (data.post_image) formData.append("post_image", data.post_image);
    const res = await api.post<Post>('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const user = useAuthStore.getState().user
    return {
      id: res.data.id,
      user_id: res.data.user_id,
      text: res.data.text,
      created_at: res.data.created_at,
      user_name: user?.name,
      profile_image_url: user?.profile_image_url,
      has_liked: false,
      likes_count: 0,
      comments_count: 0,
      post_image: res.data.post_image
    }
  },
  getPosts: async (page: number, limit: number): Promise<Post[]> => {
    const res = await api.get<Post[]>(`/posts/?page=${page}&limit=${limit}`)
    return res.data
  },
  getPost: async (postId: number): Promise<Post> => {
    const res = await api.get<Post>(`/posts/${postId}`)
    return res.data
  },
  likePost: async (post_id: number): Promise<void> => {
    await api.post(`/posts/like?post_id=${post_id}`)
  },
  unlikePost: async (post_id: number): Promise<void> => {
    await api.post(`/posts/unlike?post_id=${post_id}`)
  },
  fetchComments: async (post_id: number): Promise<Comment[]> => {
    const res = await api.get(`/posts/commentsx?post_id=${post_id}`)
    return res.data
  },
  createComment: async (post_id: number, text: string): Promise<Comment> => {
    const res = await api.post(`/posts/comments`, {
      post_id,
      text
    })
    const user = useAuthStore.getState().user
    return {
      id:res.data.id,
      user_id: res.data.user_id,
      post_id: res.data.id,
      text: res.data.text,
      created_at: res.data.created_at,
      user_name: user?.name,
      profile_image_url: user?.profile_image_url
    }
  }
};

export default userService