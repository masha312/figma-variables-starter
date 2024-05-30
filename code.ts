

/* Create spacing variables */
function createSpacing(collection: VariableCollection) {
  type Spacing = {
    [key: number]: number;
  }

  const spacing: Spacing = {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,

  }

  for (const key in spacing) {

    const existingSpaceVariableId = collection.variableIds.find((variableId: any) => figma.variables.getVariableById(variableId)?.name === `space/${key}`);
    let existingSpaceVariable;
    if (existingSpaceVariableId) {
      existingSpaceVariable = figma.variables.getVariableById(existingSpaceVariableId);
    }


    if (existingSpaceVariable) {
      existingSpaceVariable.setValueForMode(collection.modes[0].modeId, spacing[key]);
    } else {
      const spacerVariable = figma.variables.createVariable(`space/${key}`, collection.id, "FLOAT");
      spacerVariable.setValueForMode(collection.modes[0].modeId, spacing[key]);
      spacerVariable.scopes = ["GAP"]
    }
  }

}

/* Create radii variables */
function createRadii(collection: VariableCollection) {
  type Radii = {
    [key: string]: number;
  }

  const radii: Radii = {
    'none': 0,
    'sm': 2,
    'base': 4,
    'md': 6,
    'lg': 8,
    'xl': 12,
    '2xl': 16,
    '3xl': 24,
    'full': 999,
  }

  for (const key in radii) {

    const existingRadiiVariableId = collection.variableIds.find((variableId: any) => figma.variables.getVariableById(variableId)?.name === `radii/${key}`);
    let existingRadiiVariable;
    if (existingRadiiVariableId) {
      existingRadiiVariable = figma.variables.getVariableById(existingRadiiVariableId);
    }

    if (existingRadiiVariable) {
      existingRadiiVariable.setValueForMode(collection.modes[0].modeId, radii[key]);
    } else {
      const radiiVariable = figma.variables.createVariable(`radii/${key}`, collection.id, "FLOAT");
      radiiVariable.setValueForMode(collection.modes[0].modeId, radii[key]);
      radiiVariable.scopes = ["CORNER_RADIUS"]

    }
  }
}

/* Create color variables */
const slate: Color = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
}
const gray: Color = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
  950: '#030712',
}
const zinc: Color = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#09090b',
}
const neutral: Color = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
}
const stone: Color = {
  50: '#fafaf9',
  100: '#f5f5f4',
  200: '#e7e5e4',
  300: '#d6d3d1',
  400: '#a8a29e',
  500: '#78716c',
  600: '#57534e',
  700: '#44403c',
  800: '#292524',
  900: '#1c1917',
  950: '#0c0a09',
}
const red: Color = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
}
const orange: Color = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
  950: '#431407',
}
const amber: Color = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
}
const yellow: Color = {
  50: '#fefce8',
  100: '#fef9c3',
  200: '#fef08a',
  300: '#fde047',
  400: '#facc15',
  500: '#eab308',
  600: '#ca8a04',
  700: '#a16207',
  800: '#854d0e',
  900: '#713f12',
  950: '#422006',
}
const lime: Color = {
  50: '#f7fee7',
  100: '#ecfccb',
  200: '#d9f99d',
  300: '#bef264',
  400: '#a3e635',
  500: '#84cc16',
  600: '#65a30d',
  700: '#4d7c0f',
  800: '#3f6212',
  900: '#365314',
  950: '#1a2e05',
}
const green: Color = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
};
const emerald: Color = {
  50: '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
  950: '#022c22',
};
const cyan: Color = {
  50: '#ecfeff',
  100: '#cffafe',
  200: '#a5f3fc',
  300: '#67e8f9',
  400: '#22d3ee',
  500: '#06b6d4',
  600: '#0891b2',
  700: '#0e7490',
  800: '#155e75',
  900: '#164e63',
  950: '#083344',
};
const teal: Color = {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6',
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',
  950: '#042f2e',
};
const sky: Color = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  950: '#082f49',
};
const blue: Color = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
};
const indigo: Color = {
  50: '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
  950: '#1e1b4b',
};
const violet: Color = {
  50: '#f5f3ff',
  100: '#ede9fe',
  200: '#ddd6fe',
  300: '#c4b5fd',
  400: '#a78bfa',
  500: '#8b5cf6',
  600: '#7c3aed',
  700: '#6d28d9',
  800: '#5b21b6',
  900: '#4c1d95',
  950: '#2e1065',
};
const purple: Color = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
};
const fuchsia: Color = {
  50: '#fdf4ff',
  100: '#fae8ff',
  200: '#f5d0fe',
  300: '#f0abfc',
  400: '#e879f9',
  500: '#d946ef',
  600: '#c026d3',
  700: '#a21caf',
  800: '#86198f',
  900: '#701a75',
  950: '#4a044e',
};
const pink: Color = {
  50: '#fdf2f8',
  100: '#fce7f3',
  200: '#fbcfe8',
  300: '#f9a8d4',
  400: '#f472b6',
  500: '#ec4899',
  600: '#db2777',
  700: '#be185d',
  800: '#9d174d',
  900: '#831843',
  950: '#500724',
};
const rose: Color = {
  50: '#fff1f2',
  100: '#ffe4e6',
  200: '#fecdd3',
  300: '#fda4af',
  400: '#fb7185',
  500: '#f43f5e',
  600: '#e11d48',
  700: '#be123c',
  800: '#9f1239',
  900: '#881337',
  950: '#4c0519',
};

type Color = {
  [key: number]: string;
}

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const red = ((bigint >> 16) & 255) / 255;
  const green = ((bigint >> 8) & 255) / 255;
  const blue = (bigint & 255) / 255;
  return { r: red, g: green, b: blue };
}

function createColorGroup(name: string, set: Color, collection: VariableCollection) {
  for (const key in set) {

    const existingColorVariableId = collection.variableIds.find((variableId: any) => figma.variables.getVariableById(variableId)?.name === `color/${name}/${key}`);
    let existingColorVariable;
    if (existingColorVariableId) {
      existingColorVariable = figma.variables.getVariableById(existingColorVariableId);
    }


    if (existingColorVariable) {
      const RGB = hexToRgb(set[key]);
      existingColorVariable.setValueForMode(collection.modes[0].modeId, RGB);
    } else {
      const colorVariable = figma.variables.createVariable(`color/${name}/${key}`, collection.id, "COLOR");
      const RGB = hexToRgb(set[key]);
      colorVariable.setValueForMode(collection.modes[0].modeId, RGB);
      colorVariable.scopes = ["ALL_SCOPES"]
    }


  }
}


function createSlateColor(collection: VariableCollection) {
  createColorGroup("slate", slate, collection);
}

function createGrayColor(collection: VariableCollection) {
  createColorGroup("gray", gray, collection);
}

function createZincColor(collection: VariableCollection) {
  createColorGroup("zinc", zinc, collection);
}

function createNeutralColor(collection: VariableCollection) {
  createColorGroup("neutral", neutral, collection);
}

function createStoneColor(collection: VariableCollection) {
  createColorGroup("stone", stone, collection);
}

function createRedColor(collection: VariableCollection) {
  createColorGroup("red", red, collection);
}

function createOrangeColor(collection: VariableCollection) {
  createColorGroup("orange", orange, collection);
}

function createAmberColor(collection: VariableCollection) {
  createColorGroup("amber", amber, collection);
}

function createYellowColor(collection: VariableCollection) {
  createColorGroup("yellow", yellow, collection);
}

function createLimeColor(collection: VariableCollection) {
  createColorGroup("lime", lime, collection);
}

function createGreenColor(collection: VariableCollection) {
  createColorGroup("green", green, collection);
}

function createEmeraldColor(collection: VariableCollection) {
  createColorGroup("emerald", emerald, collection);
}

function createTealColor(collection: VariableCollection) {
  createColorGroup("teal", teal, collection);
}

function createCyanColor(collection: VariableCollection) {
  createColorGroup("cyan", cyan, collection);
}

function createSkyColor(collection: VariableCollection) {
  createColorGroup("sky", sky, collection);
}

function createBlueColor(collection: VariableCollection) {
  createColorGroup("blue", blue, collection);
}

function createIndigoColor(collection: VariableCollection) {
  createColorGroup("indigo", indigo, collection);
}

function createVioletColor(collection: VariableCollection) {
  createColorGroup("violet", violet, collection);
}

function createPurpleColor(collection: VariableCollection) {
  createColorGroup("purple", purple, collection);
}

function createFuchsiaColor(collection: VariableCollection) {
  createColorGroup("fuchsia", fuchsia, collection);
}

function createPinkColor(collection: VariableCollection) {
  createColorGroup("pink", pink, collection);
}

function createRoseColor(collection: VariableCollection) {
  createColorGroup("rose", rose, collection);
}

/* Show plugin window and pull existing collections / show input field for new collection */
figma.showUI(__html__,
  { width: 520, height: 800, title: "Variables Starter" });

const existingCollections = figma.variables.getLocalVariableCollections();

if (existingCollections.length > 0) {
  const collectionPairs = existingCollections.map((localCollection) => ({
    name: localCollection.name,
    id: localCollection.id
  }));

  figma.ui.postMessage({
    type: "render-collections",
    collectionPairs
  })
} else {
  figma.ui.postMessage({
    type: "render-collection-input"
  })
}


/* Create selected variables */
figma.ui.onmessage = msg => {
  if (msg.type === 'create-variables') {
    let collection;
    if (msg.collectionId) {
      collection = figma.variables.getVariableCollectionById(msg.collectionId);
    }

    if (!collection) {
      collection = figma.variables.createVariableCollection(msg.collectionId);
    }

    if (collection) {
      if (msg.checkboxStates.slate) {
        createSlateColor(collection);
      }
      if (msg.checkboxStates.gray) {
        createGrayColor(collection);
      }
      if (msg.checkboxStates.zinc) {
        createZincColor(collection);
      }
      if (msg.checkboxStates.neutral) {
        createNeutralColor(collection);
      }
      if (msg.checkboxStates.stone) {
        createStoneColor(collection);
      }
      if (msg.checkboxStates.red) {
        createRedColor(collection);
      }
      if (msg.checkboxStates.orange) {
        createOrangeColor(collection);
      }
      if (msg.checkboxStates.amber) {
        createAmberColor(collection);
      }
      if (msg.checkboxStates.yellow) {
        createYellowColor(collection);
      }
      if (msg.checkboxStates.lime) {
        createLimeColor(collection);
      }
      if (msg.checkboxStates.green) {
        createGreenColor(collection);
      }
      if (msg.checkboxStates.emerald) {
        createEmeraldColor(collection);
      }
      if (msg.checkboxStates.teal) {
        createTealColor(collection);
      }
      if (msg.checkboxStates.cyan) {
        createCyanColor(collection);
      }
      if (msg.checkboxStates.sky) {
        createSkyColor(collection);
      }
      if (msg.checkboxStates.blue) {
        createBlueColor(collection);
      }
      if (msg.checkboxStates.indigo) {
        createIndigoColor(collection);
      }
      if (msg.checkboxStates.violet) {
        createVioletColor(collection);
      }
      if (msg.checkboxStates.purple) {
        createPurpleColor(collection);
      }
      if (msg.checkboxStates.fuchsia) {
        createFuchsiaColor(collection);
      }
      if (msg.checkboxStates.pink) {
        createPinkColor(collection);
      }
      if (msg.checkboxStates.rose) {
        createRoseColor(collection);
      }
      if (msg.checkboxStates.spacing) {
        createSpacing(collection);
      }
      if (msg.checkboxStates.radii) {
        createRadii(collection);
      }
    }
  }

  figma.notify("Created variables ✅")
  figma.closePlugin();
};
