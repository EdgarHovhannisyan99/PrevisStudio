import {Users, Templates} from "../models";

async function main() {
    for (const Model of [Users, Templates]) {
        await Model.sync({ alter: true });
        console.log(Model);
    }
    process.exit(0);
}

main().catch(console.error);
