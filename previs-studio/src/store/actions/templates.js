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