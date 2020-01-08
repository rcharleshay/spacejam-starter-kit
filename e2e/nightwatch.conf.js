/* eslint-disable */
const path = require('path')

const GLOBALS_PATH = './test/globals.js'
const REPORT_PATH = './test/reports/'
const SPEC_PATH = ['./test/specs/']
const PAGE_OBJECTS_PATH = './test/page-objects'
const CUSTOM_COMMANDS = [
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

const accessibilityTesting = process.env.accessibilityTesting || true
const visualTesting = process.env.visualTesting || true

module.exports = {
  src_folders: SPEC_PATH,
  globals_path: GLOBALS_PATH,
  output_folder: REPORT_PATH,
  custom_commands_path: CUSTOM_COMMANDS,
  custom_assertions_path: CUSTOM_ASSERTIONS,
  page_objects_path: PAGE_OBJECTS_PATH,
  webdriver: {
    server_path: 'node_modules/.bin/chromedriver',
    port: 9515
  },
  test_settings: {
    default: {
      launch_url: 'http://127.0.0.1',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['no-sandbox', 'window-size=1280,800']
        },
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      globals: {
        accessibilityTesting: accessibilityTesting,
        visualTesting: visualTesting,
        waitForConditionTimeout: 30000
      },
      nightwatch_visual: {
        defaultSelector: NIGHTWATCH_VISUAL_SELECTOR,
        defaultTolerance: NIGHTWATCH_VISUAL_TOLERANCE,
        defaultPath: NIGHTWATCH_VISUAL_PATH
      },
      end_session_on_fail: false,
      skip_testcases_on_fail: false
    },
    headless: {
      desiredCapabilities: {
        chromeOptions: {
          args: ['no-sandbox', 'headless', 'window-size=1280,800']
        }
      }
    }
  }
}
