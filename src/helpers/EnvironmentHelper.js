import Repository from './Repository'

export default class EnvironmentHelper extends Repository {
  constructor (initialData) {
    const __global = window || global
    const data = initialData || (__global.env || { })

    super(data)

    // Attach server side setEnv helper
    if (this.server()) {
      const env = this

      __global.setEnv = function (data) {
        env.set(data)
      }
    }
  }

  server () {
    return this.get('environment') === 'server'
  }

  client () {
    return this.server() === false
  }

  debug () {
    return this.get('debug', true) === true
  }

  csrfToken () {
    if (this.server()) {
      return
    }

    const tokenMeta = document.head.querySelector('meta[name=csrf-token]')
    return tokenMeta ? tokenMeta.content : null
  }
}

export const Env = new EnvironmentHelper()
