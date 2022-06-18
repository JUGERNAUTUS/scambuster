import * as React from "react";
import { PlasmicButton7 } from "../plasmicComponents/plasmic/indiart_demo/PlasmicButton7";

function Button7_(props, ref) {
  const { plasmicProps } = PlasmicButton7.useBehavior(props, ref);
  return <PlasmicButton7 {...plasmicProps} />;
}

const Button7 = React.forwardRef(Button7_);

export default Object.assign(Button7, {
  __plumeType: "button"
});
