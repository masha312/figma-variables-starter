import { Container, Link, Muted, Text, VerticalSpace } from '@create-figma-plugin/ui'
import { h } from 'preact'

interface FieldsetProps {
  label: string
  onToggle?: () => void
  children?: h.JSX.Element
}

export default function (props: FieldsetProps) {
  const { label, onToggle, children } = props

  function onClick(event: MouseEvent) {
    event.preventDefault()
    if (onToggle) {
      onToggle()
    }
  }

  return <div>
    <VerticalSpace space="extraLarge" />
    <Text>
      <Muted>{label}
        {onToggle && <span> | <Link href="#" onClick={onClick}>Toggle all</Link></span>}
      </Muted>
    </Text>
    <VerticalSpace space="large" />
    <Container space="medium">
      {children}
    </Container>
    <VerticalSpace space="medium" />
  </div>
}
