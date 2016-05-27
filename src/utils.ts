import {Person} from "./Person";
export class Utils {
    static greet(person:Person):void {
        console.log("Hello! " + person.firstName + " " + person.lastName);
    }
}