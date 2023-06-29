import {Templates} from "../models";
import fs from "fs";
import path from "path";
import {videoGenerator} from "../services/nexrender";
import {log} from "debug";
import {stringToRGB} from "../services/utils";

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


    static videoRender = async (req, res, next) => {
        try {
            let {
                color,
                font,
                duration,
                text,
                rgb,
                size,
            } = req.body

            const configData = JSON.parse(fs.readFileSync(path.join(__dirname, '../AE/ae_2/defaultJob.json'), 'utf8'));

            if(rgb){
                rgb = stringToRGB(rgb)
            }

            if (configData && configData['assets']) {
                configData.assets.map(asset => {
                    if (asset.property === 'Source Text') {
                        asset.value = text || 'hello'
                    }
                    if(asset.property === 'Effects.Fill.Color' && rgb) {
                        asset.value = rgb
                    }
                    if(asset.property === 'Source Text.font' && font) {
                        asset.value = font
                    }
                    if(asset.property === 'Scale' && size) {
                        asset.value = [size, size]
                    }
                })
            }

            const frameEnd = ('00000' + duration * 25).slice(-5)

            if (configData.template.frameEnd !== frameEnd) {
                configData.template.frameEnd = frameEnd
            }
            console.log(configData)

            fs.writeFileSync(path.join(__dirname, '../AE/ae_2/myjob.json'), JSON.stringify(configData))

            await videoGenerator(path.join(__dirname, '../AE/ae_2/myjob.json'), res)

            const sourcePath = path.join(__dirname, '../AE/ae_2/export/test-preview.mp4');

            const destinationPath = path.join(__dirname, '../public/templates/test-preview.mp4');

            const sourceStream = fs.createReadStream(sourcePath);
            const destinationStream = fs.createWriteStream(destinationPath);

            sourceStream.pipe(destinationStream);

            destinationStream.on('finish', () => {
                console.log('File copied successfully.');
            });

            destinationStream.on('error', (err) => {
                console.error('An error occurred while copying the file:', err);
            });

            res.json({
                status: 200
            })
        } catch (e) {
            next(e)
        }
    }

    static videoShot = async (req, res, next) => {
        try {
            const data = req.body
            const configData = JSON.parse(fs.readFileSync(path.join(__dirname, '../AE/ae_2/defaultJob.json'), 'utf8'));

            if (configData && configData['assets']) {
                configData.assets.map(asset => {
                    if (asset.property === 'Source Text') {
                        asset.value = data.text || 'hello'
                    }
                })
            }

            configData.template.frameEnd = '00075'

            fs.writeFileSync(path.join(__dirname, '../AE/ae_2/myjob.json'), JSON.stringify(configData))


            await videoGenerator(path.join(__dirname, '../AE/ae_2/myjob.json'), res)


            res.json({
                status: 200
            })
        } catch (e) {
            next(e)
        }
    }


}