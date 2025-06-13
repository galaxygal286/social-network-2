import { create } from 'zustand';
import { CreatePostData, Post } from '../types';
import useLoadingStore from './loadingStore';
import postService from '../services/postService'

interface PostStore {
  posts: Post[]
  error: string | null
  createPost: (data: CreatePostData) => Promise<void>
  fetchPosts: (page: number, limit: number) => Promise<void>
  likePost: (post_id: number) => Promise<void>
  unlikePost: (post_id: number) => Promise<void>
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  error: null,
  createPost: async (data: CreatePostData) => {
    const { showLoading, hideLoading } = useLoadingStore.getState();
    try {
      showLoading();
      set({ error: null });
      const post = await postService.createPost(data);
      set((state: PostStore) => ({ posts: [post].concat(state.posts) }))
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create post')
    } finally {
      hideLoading()
    }
  },
  fetchPosts: async (page = 1, limit = 10) => {
    try {
      const posts = await postService.getPosts(page, limit);

      if (page === 1) {
        set({ posts });
      } else {
        set((state) => ({
          posts: [...state.posts, ...posts],
        }));
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to fetch posts')
    }
  },
  likePost: async (post_id) => {
    try {
      await postService.likePost(post_id);

      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === post_id)
            return { ...post, has_liked: true, likes_count: post.likes_count + 1 }
          return post
        })
      }));

    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to like post')
    }
  },

  unlikePost: async (post_id) => {
    try {
      await postService.unlikePost(post_id);

      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === post_id)
            return { ...post, has_liked: false, likes_count: post.likes_count - 1 }
          return post
        })
      }));
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to unlike post')
    }
  },

}));

export default usePostStore