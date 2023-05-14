import {GET_ALL_TEMPLATES, GET_ALL_TEMPLATES_FAIL, GET_ALL_TEMPLATES_SUCCESS} from "../actions/templates";


const initialState = {
    templatesList: [],
    templatesListStatus: '',
    count: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TEMPLATES : {
            return {
                ...state,
                templatesList: [],
                templatesListStatus: 'Request',
            };
        }

        case GET_ALL_TEMPLATES_SUCCESS : {
            return {
                ...state,
                templatesList: action.payload.templates,
                templatesListStatus: 'Success',
                count: action.payload.count
            };
        }

        case GET_ALL_TEMPLATES_FAIL: {
            return {
                ...state,
                videosListStatus: 'Error',
            };
        }

        default: {
            return state;
        }
    }
}