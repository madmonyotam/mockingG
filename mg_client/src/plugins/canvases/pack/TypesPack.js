import Pack from "./Pack";
import * as access from "../../access";

export default class TypesPack extends Pack {
  constructor(params) {
    super(params);

    this.limitByLevel = 2;

    this.colorScaleRange = [
      "white",
      "grey"
    ];

    this.textClasses = {
      in: "text",
      out: "light-text",
    }

  }
}