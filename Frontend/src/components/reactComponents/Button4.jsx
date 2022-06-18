import * as React from "react";
import { PlasmicButton4 } from "../plasmicComponents/plasmic/indiart_demo/PlasmicButton4";

function Button4_(props, ref) {
  const { plasmicProps } = PlasmicButton4.useBehavior(props, ref);
  return <PlasmicButton4 {...plasmicProps} />;
}

const Button4 = React.forwardRef(Button4_);

export default Object.assign(Button4, {
  __plumeType: "button"
});
