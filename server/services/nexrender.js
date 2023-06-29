// const {create} = require('@nexrender/types/job');
const path = require('path');
const fs = require('fs')
const configPath = path.resolve(__dirname, '../AE/ae_2/myjob.json');
import {render} from '@nexrender/core'
// Create a new Nexrender instance

// Load the nexrender config file

const configData = fs.readFileSync(configPath, 'utf8');
// Render job
const job = {
    ...configData
};

// Start the render process


// import { create } from "@nexrender/types/job";
//
// import path, { resolve } from 'path';
// import fs from 'fs';
//
//
export const videoGenerator = async (jsonPath, res) => {
    const configData = fs.readFileSync(jsonPath, 'utf8');
    const config = JSON.parse(configData);


    const result = await render(config, {
        workpath: '/Users/Edgar/.nexrender/',
        binary: '/Users/Edgar/Applications/aerender',
        skipCleanup: false,
        addLicense: false,
        debug: true,
        actions: {
            "custom-action": (job, settings, { input, params }, type) => {

            }
        },
    });
    const videoPath = path.resolve(result.output);

};
