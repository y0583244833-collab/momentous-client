import api from "./api";

export interface UploadedImage {
    id: string;
    url: string;
}

export const uploadImage = async (
    file: File
): Promise<UploadedImage> => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post<UploadedImage>(
        "/api/images",
        formData
    );

    return response.data;
};