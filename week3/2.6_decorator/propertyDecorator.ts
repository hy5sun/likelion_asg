function format(formatString: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
        let value = target[propertyKey];

        function getter() {
            return '${formatString} ${value}';
        }

        function setter(newVal: string) {
            value = newVal;
        }

        return {
            get: getter,
            set: setter,
            Enumerable: true,
            configurable: true,
        }
    }
}

class Greeter {
    @format('Hello')
    greeting: string;
}

const a = new Greeter();
a.greeting = 'World';
console.log(a.greeting); //속성을 읽을 때 게터가 호출되면서 Hello World가 출력됨