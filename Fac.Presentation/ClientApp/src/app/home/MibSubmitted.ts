import { CaseBase } from "./CaseBase";
import { FacCase } from "./FacCase";

export interface MibSubmitted extends CaseBase {
  facCase: FacCase;
}
