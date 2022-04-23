console.log('function');

// 1. 함수 선언문
function myFunc(param){
    console.log(param + "run!!!");
}
myFunc('myFunc');

// 2. 함수 표현식
const myFunc2 = function(param){
    console.log(`${param} run!!!`);
}
myFunc2("myFunc2");

// 3. 객체 방식
let myFunc3 = new Function("param", "console.log(param+ ' run!!!')");
myFunc3('myFunc3');

// 4. 익명함수
(function(param){
    console.log(`${param} run!!!`);
})('myFunc4');

// 5. 화살표 함수(Arrow Function) (ES6~2015)
/*
    화살표 함수 규칙
    (1) 매개변수 지정 방법
        () => {...} // 매개변수가 없는 경우 ()소괄호를 해준다.
        x => {...} // 매개변수가 한 개인 경우 ()소괄호를 생략할 수 있다.
        (x, y) => {...} // 매개변수가 2개 이상일 경우 ()소괄호를 생략할 수 없다.

    (2) 함수 몸체 정의 방법
        x => { return x + x } // single line block으로 {}중괄호를 생략을 하지 않으며
                               return을 반드시 해준다.
        x => x + x            // 함수 몸체가 한 줄의 구문이라면 중괄호를 생략하면서
                                return도 생략가능하다.
        () => { return {a:1}; }
        () => ({a:1})       // 위표현과 동일하다. 객체 반환시 소괄호를 사용한다.
        () => {
            const x = 10;
            return x * x;
        }
*/

// ES5 - 익명함수
let add = function(a, b){
    return a + b;
}
console.log(add(1, 2));

// ES6 - 화살표 함수
let add2 = (a,b) => {return a+b};
console.log(add2(3,4))

let add3 = (a,b) => a+b;
console.log(add3(5,6))

// 콜백함수
let arrN = [1, 2, 3];
let pow = arrN.map(function(x){
    return x * x;
});
console.log(pow);

// 화살표 함수
const pow2 = arrN.map((x) => {return x*x});
console.log(pow2);

const pow3 = arrN.map((x) => x*x);
console.log(pow3)

// [6] 중첩함수
function getCalcNumbers(one, two){
    let result = plus(one, two);
    function plus(one, two){
        return one + two;
    }
    return result;
}
let calcResult = getCalcNumbers(10, 30);
console.log(calcResult);

// [7] 콜백함수
function getCalcNumCall(callback){
    let result = callback(10, 20);
    return result;
}

let callBackFunction = function(one, two){
    return one + two;
}
console.log(getCalcNumCall(callBackFunction))

// [8] 클로저(closure) : outer함수가 종료되더라도 inner함수를 통해
// 외부에서 outer함수의 자원을 참조할 수 있는 함수이다.
function outer(){
    let sum = 50;
    return function (){
        return sum;
    }
}

let outerCall = outer();
console.log(outerCall); // f(){return sum;}
let outerSum = outerCall();
console.log(`sum : ${outerSum}`); // sum : 50

// 중첩함수는 outer함수가 끝나면 외부에서 outer함수의 자원을 참조할 수 없다.
function outer2(){
    let num = 10;
    function inner2(){
        console.log(num);
    }
    inner2();
}

outer2();


// [2] 함수 파라미터

// 1. 기본 파라미터(default paramter) : (ES6)
function sum(a=0, b=0){
    return a+b;
}
console.log(sum(4,5));
console.log(sum(4));
console.log(sum());

// 2. 나머지 파라미터(Rest Parameter) : (ES6)
// - 파라미터 갯수를 가변으로 사용할 수 있도록 해주는 기능이다.
// - 맨 마지막 파라미터, 또는 단독 파라미터 매개변수명 앞에 붙여서
//   점 3개(...)를 해당 파라미터가 나머지 파라미터가 된다.
function sum2(...args){
    console.log(args);
}
sum2(1,2,3,4,5);
sum2(1,2,3);
sum2(1);

let result = 0;
function sum3(...args){
    args.forEach(function(element){
        result += element;
    });
}
sum3(1,2,3);
console.log(`result : ${result}`);

// function sum4(a, b, ...args){
//     let result2 = a + b;
//     args.forEach(function(element){
//         result2 += element;
//     });
//     return result2;
// }

function sum4(a, b, ...args){
    let result2 = a + b;
    args.forEach((element) => 
        result2 += element
    );
    return result2;
}
console.log(sum4(1,2,3,4,5));
console.log(sum4(2,5,3));

// 3. arguments 객체
// - 함수 안에서만 기본으로 사용할 수 있는 자바스크립트 객체이다.
// - 함수 런타임 시점에 자동으로 생성되는 객체이며, 함수 코드 및
//   파라미터와는 무관하게 자동 생성된다.
// - 함수 실행시 함수로 전달된 실제 인자들의 정보를 담고 있는 객체이다.
// - 함수 선언에서 파라미터로 정의한 변수 갯수보다 실제 함수 호출 시
//   전달하는 인자의 개수가 다를 수 있는 자바스크립트의 특성을 고려해 만들어진
//   객체이다.

function sum5(){
    let result = 0;
    for(let i = 0; i<arguments.length; i++){
        result += arguments[i];
    }
    return result;
}
console.log(sum5(1,2,3,4,5));

// 4. 커링(curring) : 한 번에 인자를 하나만 받는 기능이다.

// 2개의 파라미터를 가지는 함수
function orderSet(burger, beverage){
    console.log(`1세트: ${burger}, ${beverage}`);
}
orderSet('치즈버거', '콜라');

// 커링으로 해체하면
function orderSetCurring(burger){
    return function(beverage){
        console.log(`세트 : ${burger}, ${beverage}`);
    }
}
let order = orderSetCurring('치즈버거');
console.log(order) //ƒ (beverage){console.log(`세트 : ${burger}, ${beverage}`);}
order('콜라');

// 2개의 인자를 체인 형태로 넘겨 커링을 실행 할 수도 있다.
orderSetCurring('치즈버거')('콜라');


// [3] Spread Operator(펼침 연산자 = 전개 연산자)
// - 스프레드 연산자는 변수명 앞에 마침표 3개를 연달아 붙여(...)표시한다.

// 1. 함수에서 Rest Parameter

// 2. 배열복사, 객체복사
let arr = [1,2,3];
let num = [...arr]; // 배열복사 (Deep Copy) - 주소와 값 둘 다 똑같이 복사
console.log(num);

let data = arr; // (Shallow Copy) - 값만 복사
console.log(data);

console.log(`arr == num : ${arr==num}`);
console.log(`arr == data : ${arr==data}`);

let rect = {color : 'red', width:42, height: 30};
let cloneRect = {...rect} // 객체복사
console.log(cloneRect);

// 3. 배열병합, 객체병합
let arr2 = [1,3,5];
let mergeArr = [...arr, ...arr2]; // 배열 병합
console.log(mergeArr);

let circle = {color:'blue', width:30, height:20};
// 객체를 병합할 때는 중복된 이름이 있으면 업데이트가 된다.
let mergeShape = {...rect, ...circle}; // 객체병합
console.log(mergeShape);

// 4. 구조분해할당(Destructuring)
// - 배열이나 객체에서 사용한다.
var a, b;
[a, b] = [10, 20];
console.log(`a=${a}, b=${b}`);

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(`a=${a}, b=${b}, rest=${rest}`);

let x, y;
x=3, y=7;
console.log(`x=${x}, y=${y}`);
[y, x] = [x, y];
console.log(`x=${x}, y=${y}`);

({a, b, ...rest} = {a:'red', b:20, height:30, padding:5});
console.log(`a=${a}, b=${b}, rest=${rest}`);
console.log(`rest.height : ${rest.height}, rest.padding : ${rest.padding}`);

console.log(arr)
console.log(Math.min(...arr));