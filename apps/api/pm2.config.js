module.exports = {
  name: 'neziva_api',
  script: 'app.js',
  interpreter: 'bun',
  env: {
    PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // 保证 PATH 中有 bun
  },
}
