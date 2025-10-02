import { axiosInstance } from "@/utils/axiosInstance";

export const sendPostAction = async (formData: FormData) => {
    const imageFile = formData.get('imageFile');
    
    if(imageFile) {
        const res = await axiosInstance.post('/storage/postsImages', formData);
        const image = res.data;

        formData.append('imageUrl', image.data.publicUrl);
    }

    const response = await axiosInstance.post('/posts', formData);

    return { errorMessage: response.data.errorMessage}
}