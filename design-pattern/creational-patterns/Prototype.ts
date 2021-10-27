/*
 * @Author: Ge.Yuanjun 
 * @Date: 2021-10-27 01:33:23 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2021-10-27 01:49:18
 * @desc: 原型模式
 */
class ComponentWithBackReference {
  public prototype

  constructor(prototype: Prototype) {
    this.prototype = prototype
  }
}

class Prototype {
  public primitive: any
  public component: object
  public circularReference: ComponentWithBackReference
  public clone(): this {
    const clone = Object.create(this)
    // 对象属性需要使用 Object.create
    clone.component = Object.create(this.component)

    // 改变原型指向
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this }
    }

    return clone
  }
}

function prototypeClient() {
  const p1 = new Prototype()
  p1.primitive = 245
  p1.component = new Date()
  p1.circularReference = new ComponentWithBackReference(p1)

  const p2 = p1.clone()

  if (p1.primitive === p2.primitive) {
    console.log('Primitive 克隆成功. Yay!');
  } else {
    console.log('Primitive 克隆失败. Booo!');
  }

  if (p1.component === p2.component) {
    console.log('component 克隆失败. Booo!');
  } else {
    console.log('component 克隆成功. Yay!');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('Component with back reference 克隆失败. Booo!');
  } else {
    console.log('Component with back reference 克隆成功. Yay!');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('Component with back reference 指向原来的对象. Booo!');
  } else {
    console.log('Component with back reference 指向克隆的对象. Yay!');
  }
}
