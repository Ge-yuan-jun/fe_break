/*
 * @Author: Ge.Yuanjun 
 * @Date: 2021-11-05 22:25:44 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2021-11-05 22:52:01
 * @desc: 桥接模式
 */

/**
 * “抽象部分”定义了两个类层次结构中“控制”部分的接口。它管理着一个指向“实
 * 现部分”层次结构中对象的引用，并会将所有真实工作委派给该对象
 */
class Abstraction {
  protected implementation: Implementation

  constructor(implementation: Implementation) {
    this.implementation = implementation
  }

  public operation(): string {
    const result = this.implementation.operationImplementation()
    return `Abstraction: Base operation with ${result}`
  }
}

/**
 * 你可以独立于设备类的方式从抽象层中扩展类
 */
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    const result = this.implementation.operationImplementation()
    return `ExtendedAbstraction: Extended operation with ${result}`
  }
}

/**
 * “实现部分”接口声明了在所有具体实现类中通用的方法。它不需要与抽象接口相
 * 匹配。实际上，这两个接口可以完全不一样。通常实现接口只提供原语操作，而
 * 抽象接口则会基于这些操作定义较高层次的操作。
 */
interface Implementation {
  operationImplementation(): string
}

/**
 * 所有设备都遵循相同的接口
 */
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return 'platformA trigger'
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return 'platformB trigger'
  }
}

function bridgeClientCode(abstraction: Abstraction) {
  console.log(abstraction.operation())
} 

let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
bridgeClientCode(abstraction)

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation)
