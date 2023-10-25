// src/ui.tsx
import { render, Container, Text, VerticalSpace, } from "@create-figma-plugin/ui";
function Plugin(props) {
    return (<Container space="medium">
      <VerticalSpace space="medium"/>
      <Text>{props.greeting}</Text>
      <VerticalSpace space="medium"/>
    </Container>);
}
export default render(Plugin);
