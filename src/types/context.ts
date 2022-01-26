import { Context as OakContext } from "oak";

export class Context extends OakContext {
  user?: any;
}
