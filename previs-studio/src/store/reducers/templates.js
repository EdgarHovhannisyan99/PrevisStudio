import {
    CLEAR_SINGLE_TEMPLATE,
    GET_ALL_TEMPLATES,
    GET_ALL_TEMPLATES_FAIL,
    GET_ALL_TEMPLATES_SUCCESS,
    GET_SINGLE_TEMPLATE,
    GET_SINGLE_TEMPLATE_FAIL,
    GET_SINGLE_TEMPLATE_SUCCESS,
    RETURN_TO_EDIT,
    VIDEO_RENDER,
    VIDEO_RENDER_SUCCESS, VIDEO_SHOT, VIDEO_SHOT_SUCCESS
} from "../actions/templates";


const initialState = {
    templatesList: [],
    singleTemplate: {},
    templatesListStatus: '',
    generatingStatus: '',
    singleTemplateStatus: '',
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

        case GET_SINGLE_TEMPLATE: {
            return {
                ...state,
                singleTemplateStatus: 'Request',
            };
        }

        case GET_SINGLE_TEMPLATE_SUCCESS: {
            return {
                ...state,
                singleTemplateStatus: 'Success',
                singleTemplate: action.payload.template
            };
        }

        case GET_SINGLE_TEMPLATE_FAIL: {
            return {
                ...state,
                singleTemplateStatus: 'Error',
            };
        }

        case CLEAR_SINGLE_TEMPLATE: {
            return {
                ...state,
                singleTemplate: {},
            };
        }

        case VIDEO_RENDER: {
            return {
                ...state,
                generatingStatus: 'generate',
            };
        }

        case VIDEO_SHOT: {
            return {
                ...state,
                generatingStatus: 'generate',
            };
        }

        case VIDEO_SHOT_SUCCESS: {
            return {
                ...state,
                generatingStatus: 'success',
            };
        }

        case VIDEO_RENDER_SUCCESS: {
            return {
                ...state,
                generatingStatus: 'success',
            };
        }

        case RETURN_TO_EDIT: {
            return {
                ...state,
                generatingStatus: '',
            };
        }


        default: {
            return state;
        }
    }
}