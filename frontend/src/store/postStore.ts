import { create } from 'zustand';
import { Comment, CreatePostData, Post } from '../types';
import useLoadingStore from './loadingStore';
import postService from '../services/postService'

interface PostStore {
  posts: Post[],
  currentPost: Post | null
  error: string | null

  comments: Comment[];

  createPost: (data: CreatePostData) => Promise<void>
  fetchPosts: (page: number, limit: number) => Promise<void>
  getPost: (postId: number) => Promise<void>
  likePost: (post_id: number) => Promise<void>
  unlikePost: (post_id: number) => Promise<void>

  fetchComments: (post_id: number) => Promise<void>;
  createComment: (post_id: number, text: string) => Promise<void>;
  // deleteComment: (comment_id: string) => Promise<void>;
  clearComments: () => void;
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  currentPost: null,
  error: null,

  comments: [],

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
  getPost: async (postId) => {
    try {
      const post = await postService.getPost(postId)
      set(() => ({
        currentPost: post
      }));
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to fetch post')
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
        }),
        currentPost: state.currentPost?.id === post_id
          ? {
            ...state.currentPost,
            has_liked: true,
            likes_count: state.currentPost.likes_count + 1
          } : state.currentPost
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
        }),
        currentPost: state.currentPost?.id === post_id
          ? {
            ...state.currentPost,
            has_liked: false,
            likes_count: state.currentPost.likes_count - 1
          } : state.currentPost
      }));
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to unlike post')
    }
  },

  fetchComments: async (post_id) => {
    try {
      const comments=await postService.fetchComments(post_id);
      set({
        comments:comments
      });
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to fetch comments')
    }
  },
  createComment: async (post_id,text) => {
    try {
      const comment = await postService.createComment(post_id,text);
      set((state)=>({
        comments:[comment].concat(state.comments)
      }))
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to fetch comments')
    }
  },
  // deleteComment: async (post_id) => {
  //   try {
  //     await postService.fetchComments(post_id);
  //   } catch (error: any) {
  //     alert(error.response?.data?.message || 'Failed to fetch comments')
  //   }
  // },
  clearComments: () => set({ comments: [] }),
}));

export default usePostStore