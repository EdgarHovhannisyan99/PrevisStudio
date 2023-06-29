import {SET_IMAGE_FOR_CROP} from "../actions/imgActions";

const initialState = {
    formData: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_IMAGE_FOR_CROP : {
            return {
                ...state,
                formData: action.payload.formData
            };
        }

        default :  {
            return  {
                ...state
            }
        }

    }
}