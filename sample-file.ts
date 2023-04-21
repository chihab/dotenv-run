class User {
name: string;
age: number;
constructor(name: string, age: number) {
this.name = name;
this.age = age;
}

const u = new User('John', 30);
console.log(u.name); 