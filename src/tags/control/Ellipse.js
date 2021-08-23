import { types } from "mobx-state-tree";

import * as Tools from "../../tools";
import Registry from "../../core/Registry";
import ControlBase from "./Base";
import { customTypes } from "../../core/CustomTypes";
import { AnnotationMixin } from "../../mixins/AnnotationMixin";
import SeparatedControlMixin from "../../mixins/SeparatedControlMixin";

/**
 * Ellipse
 * Ellipse is used to add ellipse (elliptical Bounding Box) to an image
 * @example
 * <View>
 *   <Ellipse name="ellipse1-1" toName="img-1" />
 *   <Image name="img-1" value="$img" />
 * </View>
 * @name Ellipse
 * @meta_title Ellipse Tags for Adding Elliptical Bounding Box to Images
 * @meta_description Label Studio Ellipse Tags customize Label Studio to add elliptical bounding boxes to images for machine learning and data science projects.
 * @param {string} name                  - Name of the element
 * @param {string} toName                - Name of the image to label
 * @param {float} [opacity=0.6]          - Opacity of ellipse
 * @param {string} [fillColor]           - Ellipse fill color
 * @param {string} [strokeColor=#f48a42] - Stroke color in hexadecimal
 * @param {number} [strokeWidth=1]       - Width of the stroke
 * @param {boolean} [canRotate=true]     - Show or hide rotation control
 */
const TagAttrs = types.model({
  name: types.identifier,
  toname: types.maybeNull(types.string),

  opacity: types.optional(customTypes.range(), "1"),
  fillcolor: types.optional(customTypes.color, "#f48a42"),

  strokewidth: types.optional(types.string, "1"),
  strokecolor: types.optional(customTypes.color, "#f48a42"),
  fillopacity: types.optional(customTypes.range(), "0.2"),

  canrotate: types.optional(types.boolean, true),
});

const Model = types
  .model({
    type: "ellipse",
  })
  .views(self => ({
    get hasStates() {
      const states = self.states();

      return states && states.length > 0;
    },
  }))
  .actions(self => ({
    afterCreate() {
      const ellipse = Tools.Ellipse.create({ activeShape: null });

      ellipse._control = self;

      self.tools = { ellipse };
    },
  }));

const EllipseModel = types.compose("EllipseModel", ControlBase, AnnotationMixin, SeparatedControlMixin, TagAttrs, Model);

const HtxView = () => {
  return null;
};

Registry.addTag("ellipse", EllipseModel, HtxView);

export { HtxView, EllipseModel };
