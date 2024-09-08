import {HasFormatter} from "../interfaces";
import {Positions} from "../models";

export type ListModel = {
    item: HasFormatter,
    heading: string,
    position: Positions
}
    
