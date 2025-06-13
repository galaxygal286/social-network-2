import {UpdateProfileData, User} from '../types'
import api from '../api'

const userService = {
    updateProfile: async (data: UpdateProfileData): Promise<User> => {
      const formData=new FormData()
      formData.append("name",data.name)
      if(data.bio) formData.append("bio",data.bio);
      if(data.profile_image) formData.append("profile_image",data.profile_image);
      if(data.cover_image) formData.append("cover_image",data.cover_image);console.log(Object.fromEntries(formData))
      const res=await api.post<User>('/users/profile', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data
    }
  };

  export default userService