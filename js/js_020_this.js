// 자바스크립트에서 this는 호출한 객체를 의미한다.
// 호출한 객체가 없을 경우에는 기본값으로 window객쳉이다.

console.log(this); // window

let member = {
  name: "홍길동",
  show: function () {
    console.log(this);
  },
};
member.show(); // {name: '홍길동', show: ƒ}

/////////////////////////////////////////////////
function displayThis() {
  console.log(this); // window
}
displayThis();

/////////////////////////////////////////////////
let member1 = {
  name: "홍길동1",
  show: function () {
    console.log(this); // {name: '홍길동1', show: ƒ}
  },
};
member1.show();

let member2 = {
  name: "홍길동2",
  show: function () {
    console.log(this); // {name: '홍길동2', show: ƒ}
  },
};
member2.show();

let member3 = {
  name: "홍길동3",
  show: function () {
    console.log(this); // {name: '홍길동3', show: ƒ}
  },
};
member3.show();

////////////////////////////////////////////////////
// 이벤트에서 this
let btn = document.querySelector("#btn");
btn.addEventListener("click", function () {
  console.log(this);
  console.log(btn == this);
});

////////////////////////////////////////////////////////

const hong = {
  name: "홍길동",
};
const jung = {
  name: "정해인",
};
function showThisName() {
  // 여기에서 this는 window를 가리킨다.
  // this.name은 window.name이랑 같아서 window에는 name없으므로 빈문자열
  console.log(this.name);
  // console.log(this);
}

showThisName();

/////////////////////////////////////////////////////////
// call() : call메서드는 모든 함수에서 사용할 수 있으며
//          this값을 특정값으로 지정할 수 있다.
showThisName.call(hong); // 홍길동
showThisName.call(jung); // 정해인

/////////////////////////////////////////////////////////
function update(birthYear, job) {
  this.birthYear = birthYear;
  this.job = job;
}

// this로 사용할 객체와 update함수의 매개변수에서 받을 인자를 넘긴다.
update.call(hong, 2000, "프로그래머");
console.log(hong); // {name: '홍길동', birthYear: 2000, job: '프로그래머'}

update.call(jung, 2016, "디자이너");
console.log(jung); // {name: '정해인', birthYear: 2016, job: '디자이너'}

//////////////////////////////////////////////////////////
// apply
// 1. apply는 함수 매개변수를 처리하는 방법을 제외하면 call과 같다.
// 2. call은 일반적인 함수와 마찬가지로 매개변수로 직접 받지만,
//    apply는 매개변수를 배열로 받는다.

// apply()메소드를 사용할 때는 인자를 배열로 넘기며, 결과는 call()메소드를
// 사용할 때와 같다.
update.apply(hong, [2000, "프로그래머"]);
console.log(hong);
update.apply(jung, [2016, "디자이너"]);
console.log(jung);

/////////////////////////////////////////////////////////
const minNum = Math.min(3, 5, 9, 2, 8);
const maxNum = Math.max(3, 5, 9, 2, 8);
console.log(`minNum=${minNum}`); // minNum=2
console.log(`maxNum=${maxNum}`); // maxNum=9

const nums = [3, 5, 9, 2, 8];
const minNum2 = Math.min(nums);
const maxNum2 = Math.min(nums);
console.log(`minNum2=${minNum2}`); // minNum2:NaN
console.log(`maxNum2=${maxNum2}`); // maxNum2:NaN

// spread operator로 인자값을 넘긴다.
const minNum3 = Math.min(...nums);
const maxNum3 = Math.max(...nums);
console.log(`minNum3=${minNum3}`); // minNum3=2
console.log(`maxNum3=${maxNum3}`); // maxNum3=9

// call() 적용
const minNum4 = Math.min.call(null, ...nums);
const maxNum4 = Math.max.call(null, ...nums);
console.log(`minNum4:${minNum4}`); //minNum4:2
console.log(`maxNum4:${maxNum4}`); //maxNum4:9

//apply() 적용
// const minNum5 = Math.min.apply(null, ...nums);
// const maxNum5 = Math.max.apply(null, ...nums);
// console.log(`minNum5:${minNum5}`); //minNum5:2
// console.log(`maxNum5:${maxNum5}`); //maxNum5:9

///////////////////////////////////////////////////////
//bind()
let displayThis1 = displayThis.bind(member1);
displayThis1(); // {name: '홍길동1', show: ƒ}

btn.addEventListener("click", displayThis1, false); // {name: '홍길동', show: ƒ}

// 함수 안에 함수 this는 window을 의미한다.
// 하지만 이 this가 호출객체를 가르키도록 bind()를 이용해서
// 설정할 수 있다.
let member5 = {
  name: "홍길동",
  show: function () {
    function printShow() {
      console.log(this);
    }
    // printShow();
    console.log("===", this);
    setTimeout(printShow.bind(this), 50);
  },
};

member5.show();

//////////////////////////////////////////
// Arrow Function
let member6 = {
  name: "홍길동",
  showBasic: function () {
    console.log(this); // {name: '홍길동', showBasic: ƒ, showArrow: ƒ}
    console.log(this === member6); // true
    console.log(this.name); // 홍길동
  },
  showArrow: () => {
    console.log(this); // Window
    console.log(this === member6); // false
    console.log(this.name); // 아무것도 출력이 안됨
  },
};

member6.showBasic();
member6.showArrow();

//화살표 함수를 call(), apply()를 이용해서 this의 값을 변경할 수 있다.
let park = {
  name: "박동일",
};

const idata = () => {
  console.log(this); // window
};
idata.call(park);
////////////////////////////////////////////////
// Arrow Function(화살표 함수)는 객체생성이 안된다.
const Person = (name, age) => {
  this.name = name;
  this.age = age;
};
// Uncaught TypeError: Person is not a constructor
// const pn = new Person();

console.dir(Person);

// 선언되어 있지 않은 변수를 사용할 수 없다.
// Uncaught ReferenceError: args is not defined
const kdata = () => {
  console.log(args);
};
// kdata();
