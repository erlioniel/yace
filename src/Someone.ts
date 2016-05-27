import {Person} from "./Person";
export class Someone implements Person {
    firstName:string;
    lastName:string;

    constructor(firstName:string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    hi():string {
        return "Hi! My name is " + this.firstName + this.lastName;
    }
}