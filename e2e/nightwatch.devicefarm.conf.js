/* eslint-disable */
const path = require("path")

const GLOBALS_PATH = "./test/globals.js"
const REPORT_PATH = "./test/reports/"
const SPEC_PATH = "./test/specs/"
const PAGE_OBJECTS_PATH = './test/page-objects'
const CUSTOM_COMMANDS = [
  path.join(__dirname, 'test', 'commands'),
  path.join(__dirname, 'node_modules', 'nightwatch-accessibility', 'commands'),
  path.join(__dirname, 'node_modules', '@telus/nightwatch-visual', 'commands')
]

const CUSTOM_ASSERTIONS = [
  path.join(__dirname, 'test', 'assertions'),
  path.join(__dirname, 'node_modules', 'nightwatch-accessibility', 'assertions'),
  path.join(__dirname, 'node_modules', '@telus/nightwatch-visual', 'assertions')
]
const NIGHTWATCH_VISUAL_SELECTOR = '#app'
const NIGHTWATCH_VISUAL_TOLERANCE = 2.5
const NIGHTWATCH_VISUAL_PATH = path.join(__dirname, './test/visual-regression')

// DF
var defaultMobilePlatformName = "any"
var defaultMobilePlatformVersion = "any"
var defaultDeviceName = "generic"

var mobileBrowserName = process.env.browserName
var mobilePlatformName = process.env.platformName
//|| defaultMobilePlatformName;
var mobilePlatformVersion = process.env.platformVersion
//|| defaultMobilePlatformVersion;
var deviceName = process.env.deviceName || defaultDeviceName

var jsonConfig = {
  src_folders: [SPEC_PATH],
  globals_path: GLOBALS_PATH,
  output_folder: REPORT_PATH,
  custom_commands_path: CUSTOM_COMMANDS,
  custom_assertions_path: CUSTOM_ASSERTIONS,
  page_objects_path: PAGE_OBJECTS_PATH,
  selenium: {
    start_process: false
  },
  test_settings: {
    default: {
      selenium_port: 80,
      selenium_host: "devicefarm.fwd.wf",
      silent: true,
      end_session_on_fail: false,
      skip_testcases_on_fail: false,
      request_timeout_options: {
        timeout: 150000
      },
      globals: {
        waitForConditionTimeout: 30000
      },
      nightwatch_visual: {
        defaultSelector: NIGHTWATCH_VISUAL_SELECTOR,
        defaultTolerance: NIGHTWATCH_VISUAL_TOLERANCE,
        defaultPath: NIGHTWATCH_VISUAL_PATH
      },
      desiredCapabilities: {
        browserName: mobileBrowserName,
        platformName: mobilePlatformName,
        platformVersion: mobilePlatformVersion,
        deviceName: deviceName,
        javascriptEnabled: true,
        acceptSslCerts: true
      } 
    }
  }
}

module.exports = jsonConfig
