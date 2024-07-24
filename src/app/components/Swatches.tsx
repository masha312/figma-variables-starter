import { h } from 'preact';

interface Props {
  values: Record<string | number, string | number>
}

export default function ({ values }: Props) {
  return <div style={{
    display: 'flex',
    margin: '-5px 0',
    gap: 5,
  }}>
    {
      Object.values(values).map(value => {
        return <div style={{
          display: 'inline-block',
          width: 20,
          height: 20,
          borderRadius: 2,
          flexShrink: 0,
          backgroundColor: value,
        }} />
      })
    }</div>
}
