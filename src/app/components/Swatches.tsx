import styles from '../assets/styles.css'

interface Props {
  values: Record<string | number, string | number>
}

export default function ({ values }: Props) {
  return <div style={{
    display: 'flex',
    margin: '-5px 0',
    gap: 5
  }}>
    {
    Object.values(values).map(value => {
      return <div class={styles.swatch} style={{ backgroundColor: value }}></div>
    })
  }</div>
}
