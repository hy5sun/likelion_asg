function Enumerable (enumerable: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = enumerable;
    }
}

class Person {
    constructor(private name:string) {}

    @Enumerable
    get getName() {
        return this.name;
    }

    @Enumerable(false)
    set setName(name: string) {
        this.name = name;
    }
}

const person = new Person('Hyosun');
for (let key in person) {
    console.log('${key}: ${person[key]}');
}

