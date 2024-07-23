import { h } from 'preact'

import { sortEntries } from '../../utils'

interface Props {
  values: Record<string | number, string | number>
}

export default function ({ values }: Props) {
  const entries = sortEntries(values)
  return <div style={{ overflow: 'hidden', marginTop: -7, marginBottom: -7, marginRight: -24 }}>
    <div style={{ overflow: 'hidden', height: 24 }}>
      <div style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>{entries.map(([key, value]) => (<span style={{
        backgroundColor: '#9992',
        minWidth: 22,
        textAlign: 'center',
        padding: '3px 6px',
        borderRadius: 2,
        display: 'inline-block',
        marginRight: 6,
      }} title={String(value)}>{key}</span>))}</div>
    </div>
  </div>
}
