import {api} from "./Api";

export default class templates {
    static getAllTemplates(search = '', filter = {}) {
        return api.get('templates/all', {
            params: {
                search,
                filter
            }
        })
    }

    static getSingleTemplates(id) {
        return api.get(`templates/single/${id}`)
    }
}