import Person = Some.Person;
import greet = Some.greet;

var user = {
    firstName: 'Sasha',
    lastName: 'Even'
};

class Someone implements Person {
    firstName:string;
    lastName:string;

}

greet(user);