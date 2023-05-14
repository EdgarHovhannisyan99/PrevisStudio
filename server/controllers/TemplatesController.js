import {Templates} from "../models";


export class TemplatesController {
    static getAllTemplate = async (req, res, next) => {
        try {
            const templates = await Templates.findAndCountAll()
            res.json({
                templates: templates.rows,
                count: templates.count
            })
        }catch (e) {
            next(e)
        }
    }

}