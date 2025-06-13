import { create } from 'zustand';
import { UpdateProfileData  } from '../types';
import useLoadingStore from './loadingStore'
import userService from '../services/userService';
import useAuthStore from './authStore';


interface UserState {
    error:string|null
    updateProfile: (data: UpdateProfileData) => Promise<void>
    clearError: () => void
  }

const useUserStore=create<UserState>(
    (set)=>({
     error:null,
      updateProfile:async (data:UpdateProfileData)=>{
        const { showLoading, hideLoading } = useLoadingStore.getState();
        const {updateUser}=useAuthStore.getState()
        try {
            showLoading();
            set({ error: null });
            const userData=await userService.updateProfile(data);
            updateUser(userData)
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Failed to update profile',
            });
          }finally{
            hideLoading()
          }
      },
      clearError: () => set({ error: null })
  })
)

export default useUserStore