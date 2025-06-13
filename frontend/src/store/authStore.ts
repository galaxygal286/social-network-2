import { create } from 'zustand';
import {persist} from 'zustand/middleware'
import { LoginCredentials, AuthResponse,User, RegisterData, UpdateProfileData  } from '../types';
import authService from '../services/authService'
import useLoadingStore from './loadingStore'


interface AuthState {
    user: User | null
    token: string | null
    authenticated: boolean
    error: string | null
    login: (credentials: LoginCredentials) => Promise<void>
    register: (credentials: RegisterData) => Promise<boolean>
    updateUser:(data:User)=>void
    clearError: () => void
  }

const useAuthStore=create<AuthState>()(
  persist(
    (set)=>({
      user: null,
      token: null,
      authenticated: false,
      error: null,
      
      login: async (credentials: LoginCredentials) => {
        const { showLoading, hideLoading } = useLoadingStore.getState();
        try {
          showLoading();
          set({ 
            error: null 
          });
          const data: AuthResponse = await authService.login(credentials);
          
          set({
            token: data.token,
            user: data.user,
            authenticated: true,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Login failed',
          });
        }finally{
          hideLoading()
        }
      },
      register: async (data: RegisterData) => {
        const { showLoading, hideLoading } = useLoadingStore.getState();
        try {
          showLoading()
          set({ error: null });
          await authService.register(data);
          
          return true;
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Registration failed',
          });
          return false;
        }finally{
          hideLoading()
        }
      },
      updateUser:(data:User)=>{
        set((state:AuthState)=>({
          ...state,
          user:{
            ...state.user,
            name:data.name,
            bio:data.bio,
            profile_image_url:data.profile_image_url,
            cover_image_url:data.cover_image_url
          }
        }));
      },
      
      clearError: () => set({ error: null }),
  }),
  {
      name: 'auth-storage',
      partialize: (state:any) => ({ 
        user:state.user,
        token: state.token ,
        authenticated:state.authenticated
      }),
  }
  )
)

export default useAuthStore