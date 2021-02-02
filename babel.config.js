module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', '@babel/preset-typescript'],
  plugins: [
    // '@babel/plugin-syntax-dynamic-import',
    // '@babel/plugin-external-helpers',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-typescript'
  ]
}
