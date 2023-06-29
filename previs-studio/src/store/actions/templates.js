export const GET_ALL_TEMPLATES = 'GET_ALL_TEMPLATES'
export const GET_ALL_TEMPLATES_FAIL = 'GET_ALL_TEMPLATES_FAIL'
export const GET_ALL_TEMPLATES_SUCCESS = 'GET_ALL_TEMPLATES_SUCCESS'

export function getAllTemplates(formData) {
    return {
        type: GET_ALL_TEMPLATES,
        payload: {
            formData
        }
    }
}

export const GET_SINGLE_TEMPLATE = 'GET_SINGLE_TEMPLATE'
export const GET_SINGLE_TEMPLATE_FAIL = 'GET_SINGLE_TEMPLATE_FAIL'
export const GET_SINGLE_TEMPLATE_SUCCESS = 'GET_SINGLE_TEMPLATE_SUCCESS'

export function getSingleTemplate(templateId) {
    return {
        type: GET_SINGLE_TEMPLATE,
        payload: {
            templateId
        }
    }
}

export const CLEAR_SINGLE_TEMPLATE = 'GET_SINGLE_TEMPLATE'

export function clearSingleTemplate() {
    return {
        type: CLEAR_SINGLE_TEMPLATE,
    }
}

export const VIDEO_RENDER = 'VIDEO_RENDER'
export const VIDEO_RENDER_FAIL = 'VIDEO_RENDER_FAIL'
export const VIDEO_RENDER_SUCCESS = 'VIDEO_RENDER_SUCCESS'

export function videoRenderAction (templatesData) {
    return {
        type: VIDEO_RENDER,
        payload: {
            templatesData
        }
    }
}

export const RETURN_TO_EDIT = 'RETURN_TO_EDIT'

export function returnToEdit() {
    return {
        type: RETURN_TO_EDIT,
    }
}

export const VIDEO_SHOT = 'VIDEO_SHOT'
export const VIDEO_SHOT_FAIL = 'VIDEO_SHOT_FAIL'
export const VIDEO_SHOT_SUCCESS = 'VIDEO_SHOT_SUCCESS'

export function shotAction (id) {
    return {
        type: VIDEO_SHOT,
        payload: {
            id
        }
    }
}