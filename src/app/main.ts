import { on, showUI } from '@create-figma-plugin/utilities'
import { variableOptions } from '../config/figma'
import { config } from '../config/tailwind'
import { createVariables, skipPrivate } from '../utils'
import { ConfigChoices } from '../types'

function onSubmit(collectionId: string, options: ConfigChoices) {
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
  }
}

function onResize(size: { width: number, height: number }) {
  const { width, height } = size
  figma.ui.resize(width, height)
}

export default function () {
  on('CREATE', onSubmit)
  on('RESIZE', onResize)

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

  showUI({
    width: 420,
    height: 800,
  }, props)
}
