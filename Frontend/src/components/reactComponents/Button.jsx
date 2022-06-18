import * as React from "react";
import { PlasmicButton } from "../plasmicComponents/plasmic/indiart_demo/PlasmicButton";

function Button_(props, ref) {
  const { plasmicProps } = PlasmicButton.useBehavior(props, ref);
  return <PlasmicButton {...plasmicProps} />;
}

const Button = React.forwardRef(Button_);

export default Object.assign(Button, {
  __plumeType: "button"
});
