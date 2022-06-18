import * as React from "react";
import { PlasmicButton6 } from "../plasmicComponents/plasmic/indiart_demo/PlasmicButton6";

function Button6_(props, ref) {
  const { plasmicProps } = PlasmicButton6.useBehavior(props, ref);
  return <PlasmicButton6 {...plasmicProps} />;
}

const Button6 = React.forwardRef(Button6_);

export default Object.assign(Button6, {
  __plumeType: "button"
});
