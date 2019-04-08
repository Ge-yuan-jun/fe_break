// 如果是对象/数组，返回一个空的对象/数组，
// 都不是的话直接返回原对象
// 判断返回的对象和原有对象是否相同就可以知道是否需要继续深拷贝
// 处理其他的数据类型的话就在这里加判断
function getEmpty(o){
	if(Object.prototype.toString.call(o) === '[object Object]'){
		return {};
	}
	if(Object.prototype.toString.call(o) === '[object Array]'){
		return [];
	}
	return o;
}

function BFSdeepClone(origin){
	let queue = [];
	let map = new Map(); // 记录出现过的对象，用于处理环

	let target = getEmpty(origin);
	if(target !== origin){
		queue.push([origin, target]);
		map.set(origin, target);
	}

	while(queue.length){
		let [ori, tar] = queue.shift();
		for(let key in ori){
			// 处理环状
			if(map.get(ori[key])){
				tar[key] = map.get(ori[key]);
				continue;
			}

			tar[key] = getEmpty(ori[key]);
			if(tar[key] !== ori[key]){
				queue.push([ori[key], tar[key]]);
				map.set(ori[key], tar[key]);
			}
		}
	}

	return target;
}

function DFSdeepClone(origin){
	let stack = [];
	let map = new Map(); // 记录出现过的对象，用于处理环

	let target = getEmpty(origin);
	if(target !== origin){
		stack.push([origin, target]);
		map.set(origin, target);
	}

	while(stack.length){
		let [ori, tar] = stack.pop();
		for(let key in ori){
			// 处理环状
			if(map.get(ori[key])){
				tar[key] = map.get(ori[key]);
				continue;
			}

			tar[key] = getEmpty(ori[key]);
			if(tar[key] !== ori[key]){
				stack.push([ori[key], tar[key]]);
				map.set(ori[key], tar[key]);
			}
		}
	}

	return target;
}

// test-1
[BFSdeepClone, DFSdeepClone].forEach(deepCopy=>{
	console.log(deepCopy({a:1}));
	console.log(deepCopy([1,2,{a:[3,4]}]))
	console.log(deepCopy(function(){return 1;}))
	console.log(deepCopy({
		x:function(){
			return "x";
		},
		val:3,
		arr: [
			1,
			{test:1}
		]
	}))

	let circle = {};
	circle.child = circle;
	console.log(deepCopy(circle));
})

/**测试数据 */
// 输入 字符串String
// 预期输出String
let str = 'String'
var strCopy = DFSdeepClone(str)
var strCopy1 = BFSdeepClone(str)
console.log(strCopy, strCopy1) // String String 测试通过
// 输入 数字 -1980
// 预期输出数字 -1980
let num = -1980
var numCopy = DFSdeepClone(num)
var numCopy1 = BFSdeepClone(num)
console.log(numCopy, numCopy1) // -1980 -1980 测试通过
// 输入bool类型
// 预期输出bool类型
let bool = false
var boolCopy = DFSdeepClone(bool)
var boolCopy1 = BFSdeepClone(bool)
console.log(boolCopy, boolCopy1) //false false 测试通过
// 输入 null
// 预期输出 null
let nul = null
var nulCopy = DFSdeepClone(nul)
var nulCopy1 = BFSdeepClone(nul)
console.log(nulCopy, nulCopy1) //null null 测试通过

// 输入undefined
// 预期输出undefined
let und = undefined
var undCopy = DFSdeepClone(und)
var undCopy1 = BFSdeepClone(und)
console.log(undCopy, undCopy1) //undefined undefined 测试通过
  //输入引用类型obj
let obj = {
  a: 1,
  b: () => console.log(1),
  c: {
    d: 3,
    e: 4
  },
  f: [1, 2],
  und: undefined,
  nul: null
}
var objCopy = DFSdeepClone(obj)
var objCopy1 = BFSdeepClone(obj)
console.log(objCopy === objCopy1) // 对象类型判断 false 测试通过
console.log(obj.c === objCopy.c) // 对象类型判断 false 测试通过
console.log(obj.c === objCopy1.c) // 对象类型判断 false 测试通过
console.log(obj.b === objCopy1.b) // 函数类型判断 false 测试通过
console.log(obj.b === objCopy.b) // 函数类型判断 false 测试通过
console.log(obj.f === objCopy.f) // 数组类型判断 false 测试通过
console.log(obj.f === objCopy1.f) // 数组类型判断 false 测试通过
console.log(obj.nul, obj.und) // 输出null，undefined 测试通过

// 输入环状数据
// 预期不爆栈且深度复制
let circleObj = {
  foo: {
    name: function() {
      console.log(1)
    },
    bar: {
      name: 'bar',
      baz: {
        name: 'baz',
        aChild: null //待会让它指向obj.foo
      }
    }
  }
}
circleObj.foo.bar.baz.aChild = circleObj.foo
var circleObjCopy = DFSdeepClone(circleObj)
var circleObjCopy1 = BFSdeepClone(circleObj)
console.log(circleObjCopy, circleObjCopy1) // 测试通过?

// 简单测试用例
var a = {
  num: 1
}
var b = {
  num: 2,
  a: a
}
a.b = b;

// console.log(a === b.a)
// console.log(a.b === b)
// console.log(a === a.b.a)

var c = DFSdeepClone(a)
console.log(c)
console.log(c === a)
console.log(c === c.b.a)