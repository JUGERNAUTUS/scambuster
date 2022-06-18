import * as React from "react";
import { PlasmicTextInput } from "../plasmicComponents/plasmic/indiart_demo/PlasmicTextInput";

function TextInput_(props, ref) {
  const { plasmicProps } = PlasmicTextInput.useBehavior(props, ref);
  return <PlasmicTextInput {...plasmicProps} />;
}

const TextInput = React.forwardRef(TextInput_);

export default Object.assign(TextInput, {
  __plumeType: "text-input"
});
