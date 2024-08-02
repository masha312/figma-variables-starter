import { makeBus } from 'figma-messaging'
import { showUI } from '@create-figma-plugin/utilities'
import { config } from '../config/tailwind'
import { variableOptions } from '../config/figma'
import { createVariables, skipPrivate } from '../utils'
import { type OptionsState } from '../types'

function create (collectionId: string, options: OptionsState): boolean {
  // get the collection
  const collection: VariableCollection | null = collectionId
    ? figma.variables.getVariableCollectionById(collectionId)
    : figma.variables.createVariableCollection(collectionId)

  // if we have a collection, create variables
  if (collection) {
    // loop over options and reconcile with config
    for (const [group, groupValue] of Object.entries(options)) {
      for (const [name, checked] of Object.entries(groupValue)) {
        // only create checked options
        if (checked) {
          // variables
          // @ts-ignore
          const varConfig = config[group][name]
          const varProps = group === 'colors'
            ? variableOptions.colors.all
            : variableOptions[group][name]
          const varOptions = {
            ...varProps,
            name: varProps.name?.replace('$NAME', name) || name,
            prop: name,
          }
          createVariables(collection, varConfig, varOptions)
        }
      }
    }
    return true
  }
  return false
}

function resize (size: { width: number, height: number }) {
  const { width, height } = size
  figma.ui.resize(width, height)
}

const handlers = ({
  create,
  resize,
})

export type MainHandlers = typeof handlers

export default function () {
  // handlers hash
  makeBus(handlers)

  // collections
  let collections = figma.variables.getLocalVariableCollections()
  if (collections.length === 0) {
    const collection = figma.variables.createVariableCollection('Collection 1')
    collections.push(collection)
  }

  // ui props
  const props = {
    collections: collections.map(({ id, name }) => ({ id, name })),
    config: skipPrivate(config),
  }

  // show ui
  showUI({
    width: 420,
    height: 800,
  }, props)
}
