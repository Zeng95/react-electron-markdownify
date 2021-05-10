const aliases = (prefix = `src`) => ({
  '@assets': `${prefix}/assets`,
  '@components': `${prefix}/components`,
  '@hooks': `${prefix}/hooks`,
  '@lib': `${prefix}/lib`,
  '@utils': `${prefix}/utils`,
})

module.exports = aliases
