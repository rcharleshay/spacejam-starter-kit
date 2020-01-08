exports.config = {
  app_name: [ process.env.NEW_RELIC_APP_NAME ],
  license_key: process.env.NEW_RELIC_LICENSE_KEY || 'pebkac',
  logging: {
    level: process.env.NEW_RELIC_LOG_LEVEL || 'info',
    filepath: process.env.NEW_RELIC_LOG || 'stdout'
  },
  agent_enabled: process.env.NEW_RELIC_ENABLED || false,
  distributed_tracing: {
    enabled: true
  }
}
