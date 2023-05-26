import {Templates} from "../models";

export class TemplatesController {
    static getAllTemplate = async (req, res, next) => {
        try {
            const {search = ""} = req.query;
            const filter = req.query.filter || {}

            const templates = await Templates.findAndCountAll({
                where: {
                    $and: filter,
                    $or: {
                        title: {$like: `%${search || ""}%`},
                        duration: {$like: `%${search || ""}%`},
                    },
                }
            })
            res.json({
                templates: templates.rows,
                count: templates.count
            })
        } catch (e) {
            next(e)
        }
    }

    static getSingleTemplate = async (req, res, next) => {
        try {
            const {id} = req.params;

            const template = await Templates.findByPk(id)
            res.json({
                template
            })
        } catch (e) {
            next(e)
        }
    }

}