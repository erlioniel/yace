module Some {
    export interface Person {
        firstName:string,
        lastName:string
    }
    export function greet(person:Person) {
        console.log("Hello! " + person.firstName + " " + person.lastName);
    }

}
