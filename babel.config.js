module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      ['@babel/env', { targets: { esmodules: true } }]
    ],
    env: {
      test: {
        presets: [['@babel/preset-env', {
          targets: { node: 'current' },
        }]],
      },
    },
  }
}
