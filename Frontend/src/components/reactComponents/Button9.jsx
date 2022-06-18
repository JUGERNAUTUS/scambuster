import * as React from "react";
import { PlasmicButton9 } from "../plasmicComponents/plasmic/indiart_demo/PlasmicButton9";

function Button9_(props, ref) {
  const { plasmicProps } = PlasmicButton9.useBehavior(props, ref);
  return <PlasmicButton9 {...plasmicProps} />;
}

const Button9 = React.forwardRef(Button9_);

export default Object.assign(Button9, {
  __plumeType: "button"
});
