import {
 Button,
 Checkbox,
 Columns,
 Container,
 Dropdown,
 DropdownOption,
 render,
 Stack,
 Text,
 useWindowResize,
 VerticalSpace,
} from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { makeBus } from 'figma-messaging'
import type { Config, OptionsState } from '../types'
import { capitalize } from '../utils'
import Fieldset from './components/Fieldset'
import Swatches from './components/Swatches'
import Units from './components/Units'
import { MainHandlers } from './main'
import JSX = h.JSX

/**
 * Utility function to create a new options hash
 * @param source
 * @param group
 * @param name
 * @param checked
 */
function makeOptions(source: Config | OptionsState, group?: string, name?: string, checked = false): OptionsState {
  const newState: OptionsState = {}
  for (const groupKey of Object.keys(source)) {
    newState[groupKey] = {}
    for (const nameKey of Object.keys(source[groupKey as keyof typeof source])) {
      newState[groupKey][nameKey] = groupKey === group && nameKey === name
        ? checked
        : source[groupKey as keyof typeof source][nameKey] === true
    }
  }
  return newState
}

function Plugin(props: { collections: { name: string, id: string }[], config: Config }) {
  // props
  const { collections, config } = props

  // collection options
  const [collectionId, setCollectionId] = useState<string>(collections[0].id)
  const collectionOptions: Array<DropdownOption> = collections.map(collection => {
    return { value: collection.id, text: collection.name }
  })

  // create the options hash
  const [options, setOptions] = useState<OptionsState>(makeOptions(config))

  // toggle the correct nested option
  function toggleOne(group: string, name: string, event: JSX.TargetedEvent<HTMLInputElement>) {
    setOptions(makeOptions(options, group, name, event.currentTarget.checked))
  }

  // toggle all options in a named group
  function toggleGroup(name: string) {
    const group = options[name]
    const checked = Object.values(group).every(value => value)
    const newGroup = Object.keys(group).reduce((output, key) => {
      output[key] = !checked
      return output
    }, {} as Record<string, boolean>)
    const newOptions = {
      ...options,
      [name]: newGroup,
    }
    setOptions(newOptions)
  }

  // enabled
  const [enabled, setEnabled] = useState<boolean>(false)
  useEffect(() => {
    let state = false
    for (const group of Object.values(options)) {
      for (const value of Object.values(group)) {
        if (value) {
          state = true
        }
      }
    }
    setEnabled(state)
  }, [options])

  // events
  const [loading, setLoading] = useState(false)
  const bus = makeBus<MainHandlers>()

  function onCreateClick() {
    setLoading(true)
    bus.call('create', collectionId, options).then(data => {
      setLoading(false)
    })
  }

  function onWindowResize(size: { width: number; height: number }) {
    void bus.call('resize', size)
  }

  useWindowResize(onWindowResize, {
    maxWidth: 320,
    minHeight: 120,
    minWidth: 120,
  })

  return (
    <Container space="medium">
      <Fieldset label="Collection">
        <Dropdown
          placeholder="Collection"
          options={collectionOptions}
          value={collectionId}
          onChange={event => setCollectionId(event.currentTarget.value)}
        />
      </Fieldset>

      {Object.entries(config).map(([groupKey, groupValue]) => (
        <Fieldset label={capitalize(groupKey)} onToggle={() => toggleGroup(groupKey)}>
          <Stack space="medium">
            {Object.entries(groupValue).map(([nameKey, value]) => {
              const keys = Object.keys(value)
              return <div class="checkbox-group"
                          title={`${keys.length} values: ${Object.values(keys).join(', ')}`}
              >
                <Checkbox onChange={event => toggleOne(groupKey, nameKey, event)} value={options[groupKey][nameKey]}>
                  <div style={{ display: 'flex' }}>
                    <Text style={{ width: 70, flexShrink: 0 }}>{capitalize(nameKey)}</Text>
                    {
                      groupKey === 'colors'
                        ? <Swatches values={value} />
                        : <Units values={value} />
                    }
                  </div>
                </Checkbox>
              </div>
            })}
          </Stack>
        </Fieldset>
      ))}

      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth
                loading={loading} onClick={onCreateClick}
                disabled={!enabled}
        >Create</Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
