//@ts-check

const PROFILE = process.env.PROFILE || 'dev';

/**
 * @typedef {object} Properties
 * @property {string} token
 * @property {string} profile
 * @property {number} port
 * @property {string} dbpath
 * @property {boolean} useCors
 */

/** @type {Properties} */
const PROPS = require(`./config/props-${PROFILE}.json`);
PROPS.profile = PROFILE;

module.exports = PROPS;
