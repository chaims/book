/**
 * @description interface vs type
 * @example 
 *      都可以描述对象或函数;
 *      都允许拓展，interface use extends，type use &
 *      type 可以声明基本类型别名，联合类型，元组等类型， interface不可
 *      type 语句中还可以使用 typeof 获取实例的 类型进行赋值
 *      interface 能够进行声明的自动合并
 */
interface Name {
    name: string
}

interface User extends Name {
    age?: number;
}
interface SetUser {
    (name: string, age: number): void;
}

type NameTest = {
    name: string
}
type UserTest = NameTest & {
    age: number
}
type SetUserTest = (name: string, age: number) => void;


interface User extends NameTest {}
type UserTestTwo = Name & {}

type NameTestTwo = string
interface Dog {
    wong()
}
interface Cat {
    miao()
}
type Pet = Dog | Cat;
type PetList = [Dog, Cat]
let div = document.createElement('div');
type B = typeof div
type StrOrNum = string | number;
type TextTest = string | { text: string};
type Callback<T> = (data: T) => void;

type Pair<T> = [T, T];
type Coordinatest = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T>};

/**
 * @description 泛型
 * @example 泛型接口、泛型类、泛型约束
 *  
 */

let generics_fun = <T>(arg: T): T => arg;
let generic_output = generics_fun('string');
generic_output = generics_fun<string>('string');

let generic_log = <T>(arg: T[]): T[] => arg;
generic_log = <T>(arg: Array<T>): Array<T> => arg;

let generic_myfun: <T>(arg: T) => T = generics_fun;
let generic_myfun_two: { <T>(arg: T): T } = generics_fun;

interface GenericFn {
    <T>(arg: T): T;
}
function generic_fn<T>(arg: T): T {
    return arg;
}
let myGenericFn: GenericFn = generic_fn;

interface GenericFnTwo<T> {
    (arg: T): T;
}
let myGenericFnTwo: GenericFnTwo<number> = generic_fn;

class GenericNumFn<T> {
    zeroValue: T;
    add: (x:T, y: T) => T;
}
let myGenericNumFn = new GenericNumFn<number>();
myGenericNumFn.zeroValue = 0;
myGenericNumFn.add = (x, y) => x + y;


interface LengthWise {
    length: number
}
function myGenericFnThree<T extends LengthWise>(args: T): T {
    return args;
}
myGenericFnThree('1');
myGenericFnThree({length: 10});

function getGenericPro<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
getGenericPro({ a: 1 }, "a");
getGenericPro({ a: 1 }, "m")


function createGeneric<T>(c: { new(): T }): T {
    return new c();
}

function createGenericInstance<T extends User>(c: new () => T): T {
    return new c()
}


