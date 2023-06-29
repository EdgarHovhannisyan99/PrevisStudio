export const SET_IMAGE_FOR_CROP = 'SET_IMAGE_FOR_CROP'

export function setImgForCrop(formData) {
    return {
        type: SET_IMAGE_FOR_CROP,
        payload: {
            formData
        }
    }
}


