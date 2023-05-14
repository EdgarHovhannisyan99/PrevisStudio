export const GET_ALL_TEMPLATES = 'GET_ALL_TEMPLATES'
export const GET_ALL_TEMPLATES_FAIL = 'GET_ALL_TEMPLATES_FAIL'
export const GET_ALL_TEMPLATES_SUCCESS = 'GET_ALL_TEMPLATES_SUCCESS'

export function getAllTemplates() {
    return {
        type: GET_ALL_TEMPLATES,
    }
}