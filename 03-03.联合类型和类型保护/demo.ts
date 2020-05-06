interface Dog {
  fly: boolean;
  bark: () => {};
}

interface Bird {
  fly: boolean;
  sing: () => {};
}

// 联合类型， TS只能显示公共的方法或1属性
function tar(anmio: Dog | Bird) {
  console.log(anmio.fly);
}

// 类型保护，1. 类型断言
function tar1(anmio: Dog | Bird) {
  if (anmio.fly) {
    (anmio as Bird).sing();
  } else {
    (anmio as Dog).bark();
  }
}

// 类型保护 2. in 方法
function tar2(anmio: Dog | Bird) {
  if ('sing' in anmio) {
    anmio.sing();
  } else {
    anmio.bark();
  }
}

// 类型保护 3. type 方法
function add(first: string | number, sec: string | number) {
  if (typeof first === 'string' || typeof sec === 'string') {
    return `${first}${sec}`;
  }
  return first + sec;
}
