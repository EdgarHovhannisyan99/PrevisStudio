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

    static videoRender(templatesData) {
        return api.post(`templates/render`,  {
            ...templatesData
        })
    }

    static videShot(id) {
        return api.post(`templates/shot`,  {
            id
        })
    }
}