import { Optional, VariableOptions } from '../types'

export const variableOptions: Record<string, Record<string, Optional<VariableOptions, 'name'>>> = {
  units: {
    size: {
      prop: 'SIZE',
      type: 'FLOAT',
      scopes: ['GAP', 'WIDTH_HEIGHT'],
    },
    opacity: {
      prop: 'opacity',
      type: 'FLOAT',
      scopes: ['OPACITY'],
    },
    radius: {
      prop: 'rounded',
      type: 'FLOAT',
      scopes: ['CORNER_RADIUS'],
    },
    border: {
      prop: 'border',
      type: 'FLOAT',
      scopes: ['STROKE_FLOAT'],
    },
    container: {
      prop: 'container',
      type: 'FLOAT',
      scopes: ['WIDTH_HEIGHT'],
    },
  },
  font: {
    size: {
      name: 'font/size',
      prop: 'text',
      type: 'FLOAT',
      scopes: ['FONT_SIZE'],
    },
    weight: {
      name: 'font/weight',
      prop: 'font',
      type: 'FLOAT',
      scopes: ['FONT_WEIGHT'],
    },
    leading: {
      prop: 'leading',
      type: 'STRING',
      scopes: ['LINE_HEIGHT'],
    },
    tracking: {
      prop: 'tracking',
      type: 'FLOAT',
      scopes: ['LETTER_SPACING'],
    },
  },
  colors: {
    all: {
      name: 'colors/$NAME',
      prop: 'colors',
      type: 'COLOR',
      scopes: ['SHAPE_FILL', 'TEXT_FILL', 'FRAME_FILL', 'STROKE_COLOR', 'EFFECT_COLOR'],
    },
  },
}
