import { EnvironmentHelper } from '../'

it('set value in env without crashing', () => {
  const Env = new EnvironmentHelper({})

  Env.set('test', 'value')
})

it('get default value', () => {
  const Env = new EnvironmentHelper({})

  const value = Env.get('test', 'default_value')

  expect(value).toBe('default_value')
})

it('simple direct observe should work', () => {
  const Env = new EnvironmentHelper({})

  expect.assertions(1)

  Env.observe('test_path', () => {
    expect(
      Env.get('test_path')
    ).toBe('value')
  })

  Env.set('test_path', 'value')
})

it('simple direct observe can trigger multiple times', () => {
  const Env = new EnvironmentHelper({})

  expect.assertions(3)

  Env.observe('test_path', () => {
    expect(true).toBe(true)
  })

  Env.set('test_path', 'value')
  Env.set('test_path', 'value2')
  Env.set('test_path', 'value3')
})

it('nested direct observe should work', () => {
  const Env = new EnvironmentHelper({})

  expect.assertions(1)

  Env.observe('test.path', () => {
    expect(
      Env.get('test.path')
    ).toBe('value')
  })

  Env.set('test.path', 'value')
})

it('parent observe should work', () => {
  const Env = new EnvironmentHelper({})

  const path = 'test.path'

  expect.assertions(3)

  expect(
    Env.get(path)
  ).toBe(null)

  Env.set(path, 'value 1')

  expect(
    Env.get(path)
  ).toBe('value 1')

  Env.observe('test', () => {
    expect(
      Env.get(path)
    ).toBe('value 2')
  })

  Env.set(path, 'value 2')
})

it('deep parent observe should work', () => {
  const Env = new EnvironmentHelper({})

  const path = 'test.path.with.some.extra.children'
  const observedPath = 'test'

  expect.assertions(3)

  expect(
    Env.get(path)
  ).toBe(null)

  Env.set(path, 'value 1')

  expect(
    Env.get(path)
  ).toBe('value 1')

  Env.observe(observedPath, () => {
    expect(
      Env.get(path)
    ).toBe('value 2')
  })

  Env.set(path, 'value 2')
})

it('deep parent observe with arrays should work', () => {
  const Env = new EnvironmentHelper({})

  const path = 'test.path.with.2.some.extra.3.children'
  const observedPath = 'test'

  expect.assertions(3)

  expect(
    Env.get(path)
  ).toBe(null)

  Env.set(path, 'value 1')

  expect(
    Env.get(path)
  ).toBe('value 1')

  Env.observe(observedPath, () => {
    expect(
      Env.get(path)
    ).toBe('value 2')
  })

  Env.set(path, 'value 2')
})

it('deep observe with parent update', () => {
  const Env = new EnvironmentHelper({})

  const path = 'test.path'
  const observedPath = 'test.path.with.0.some.extra.children'
  const val = (nestedVal) => {
    return {
      with: [
        {
          some: {
            extra: {
              children: nestedVal
            }
          }
        }
      ]
    }
  }

  expect.assertions(3)

  expect(
    Env.get(path)
  ).toBe(null)

  Env.set(path, val('value 1'))

  expect(
    Env.get(observedPath)
  ).toBe('value 1')

  Env.observe(observedPath, () => {
    expect(
      Env.get(observedPath)
    ).toBe('value 2')
  })

  Env.set(path, val('value 2'))
})

it('deep observe with offset parent update', () => {
  const Env = new EnvironmentHelper({})

  const setPath = 'test.path'
  const getPath = 'test.path.with.0.some.extra.children'
  const observePath = 'test.path.with.0.some'

  const val = (nestedVal) => {
    return {
      with: [
        {
          some: {
            extra: {
              children: nestedVal
            }
          }
        }
      ]
    }
  }

  expect.assertions(3)

  expect(
    Env.get(getPath)
  ).toBe(null)

  Env.set(setPath, val('value 1'))

  expect(
    Env.get(getPath)
  ).toBe('value 1')

  Env.observe(observePath, () => {
    expect(
      Env.get(getPath)
    ).toBe('value 2')
  })

  Env.set(setPath, val('value 2'))
})

it('observing with remove', () => {
  const Env = new EnvironmentHelper({})

  const setPath = 'test.path'
  const getPath = 'test.path.with.0.some.extra.children'
  const observePath = 'test.path.with.0.some'

  const val = (nestedVal) => {
    return {
      with: [
        {
          some: {
            extra: {
              children: nestedVal
            }
          }
        }
      ]
    }
  }

  expect.assertions(3)

  expect(
    Env.get(getPath)
  ).toBe(null)

  Env.set(setPath, val('value 1'))

  expect(
    Env.get(getPath)
  ).toBe('value 1')

  const handleObserve = () => {
    expect(
      Env.get(getPath)
    ).toBe('value 2')

    Env.removeObserveListener(observePath, handleObserve)

    Env.set(setPath, val('value 3'))
  }

  Env.observe(observePath, handleObserve)

  Env.set(setPath, val('value 2'))
})

it('observing with manual remove', () => {
  const Env = new EnvironmentHelper({})

  const setPath = 'test.path'
  const getPath = 'test.path'
  const observePath = 'test.path'

  const val = (nestedVal) => {
    return nestedVal
  }

  expect.assertions(1)

  const handleObserve = () => {
    expect(
      Env.get(getPath)
    ).toBe('value 2')

    Env._observeCallbacks[observePath] = []

    Env.set(setPath, val('value 3'))
  }

  Env.observe(observePath, handleObserve)

  Env.set(setPath, val('value 2'))
})

it('observing with manual remove using delete', () => {
  const Env = new EnvironmentHelper({})

  const setPath = 'test.path'
  const getPath = 'test.path'
  const observePath = 'test.path'

  const val = (nestedVal) => {
    return nestedVal
  }

  expect.assertions(1)

  const handleObserve = () => {
    expect(
      Env.get(getPath)
    ).toBe('value 2')

    delete Env._observeCallbacks[observePath]

    Env.set(setPath, val('value 3'))
  }

  Env.observe(observePath, handleObserve)

  Env.set(setPath, val('value 2'))
})

it('observing deeper than get/set', () => {
  const Env = new EnvironmentHelper({})

  const setPath = 'test.path'
  const getPath = 'test.path.with.0.1'
  const observePath = 'test.path.with.0.1.2'

  const val = (nestedVal) => {
    return {
      with: [
        [
          [],
          [
            [],
            [],
            {
              test: nestedVal
            }
          ]
        ]
      ]
    }
  }

  expect.assertions(3)

  expect(
    Env.get(getPath)
  ).toBe(null)

  Env.set(setPath, val('value 1'))

  expect(
    Env.get(getPath)[2].test
  ).toBe('value 1')

  Env.observe(observePath, () => {
    expect(
      Env.get(getPath)[2].test
    ).toBe('value 2')
  })

  Env.set(setPath, val('value 2'))
})

it('can handle objects with numeric keys', () => {
  const Env = new EnvironmentHelper({})

  const setPath = 'globals.domains'
  const getPath = 'globals.domains.4'
  const observePath = 'globals.domains.4'

  const val = (nestedVal) => {
    return {
      4: {
        dataKey: nestedVal
      }
    }
  }

  expect.assertions(3)

  expect(
    Env.get(getPath)
  ).toBe(null)

  Env.set(setPath, val('value 1'))

  expect(
    Env.get(getPath).dataKey
  ).toBe('value 1')

  Env.observe(observePath, () => {
    expect(
      Env.get(getPath).dataKey
    ).toBe('value 2')
  })

  Env.set(setPath, val('value 2'))
})

it('multiple observers on children of path works', () => {
  const Env = new EnvironmentHelper({})

  const setPath = 'company'
  const getPath = 'company.subscription'
  const observePath = 'company.subscription'

  const val = (nestedVal) => {
    return {
      id: 1,
      name: 'test',
      subscription: {
        id: nestedVal
      }
    }
  }

  expect.assertions(4)

  expect(
    Env.get(getPath)
  ).toBe(null)

  Env.set(setPath, val('value 1'))

  expect(
    Env.get(getPath).id
  ).toBe('value 1')

  Env.observe(`${observePath}.id`, () => {
    expect(
      Env.get(getPath).id
    ).toBe('value 2')
  })

  Env.observe(observePath, () => {
    expect(
      Env.get(getPath).id
    ).toBe('value 2')
  })

  Env.set(setPath, val('value 2'))
})
