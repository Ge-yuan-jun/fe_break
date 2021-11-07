/*
 * @Author: Ge.Yuanjun 
 * @Date: 2021-11-07 22:21:33 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2021-11-07 22:59:44
 * @desc: 装饰器模式
 */

/**
 * 如果你希望在无需修改代码的情况下即可使用对象， 且希
 * 望在运行时为对象新增额外的行为， 可以使用装饰模式。
 */

/**
 * 装饰可以改变组件接口所定义的操作。
 */
interface Component {
  operation(): string
}

/**
 * 具体组件提供操作的默认实现，这些类在程序中可能有几个
 * 变体
 */
class ConcreteComponent implements Component {
  public operation(): string {
    return 'ConcreteComponent'
  }
}

/**
 * 装饰基类与其它组件遵循相同的接口。这类的主要任务是定义
 * 所有具体装饰的封装接口。封装的默认实现代码中可能会包含
 * 一个保存被封装组件的成员变量，并且负责对其进行初始化
 */
class Decorator implements ConcreteComponent {
  protected component: Component

  constructor(component: Component) {
    this.component = component
  }

  // 装饰基类会直接将所有工作分派给被封装组件。具体装饰中则可以新增一些
  // 额外的行为
  public operation(): string {
    return this.component.operation()
  }
}

/**
 * 具体装饰必须在被封装对象上调用方法，不过也可以自行在结果中添加一些内容。
 * 装饰必须在调用封装对象之前或之后执行额外的行为。
 */
class ConcreteDecoratorA extends Decorator {
  /**
   * 具体装饰可调用其父类的操作实现，而不是直接调用被封装对象。这种方式
   * 可简化装饰类的扩展工作。
   */
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`
  }
}

class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`
  }
}

function clientDecoratorCode(component: Component) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}

// test demo
const simple = new ConcreteComponent()
console.log('Client: I\'ve got a simple component:')
clientDecoratorCode(simple)
console.log('')

const decorator1 = new ConcreteDecoratorA(simple)
const decorator2 = new ConcreteDecoratorB(decorator1)
console.log('Client: Now I\'ve got a decorated component:')
clientDecoratorCode(decorator2)