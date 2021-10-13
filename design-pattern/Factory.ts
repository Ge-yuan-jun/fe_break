/**
 * 工厂模式
 * 
 * 当创建逻辑比较复杂，是一个“大工程”的时候，我们就考虑使用工厂模式，封装对象的创建过程，将对象的创建和使用分离
 * 
 * 使用场景：
 * 
 * 第一种情况：
 *  类似规则配置解析的例子，代码中存在 if-else 分支判断，动态地根据不同的类型创建不同的对象。
 *  针对这种情况，我们就考虑使用工厂模式，将这一大坨 if-else 创建对象的代码抽离出来，放到工厂类中。
 * 还有一种情况：
 *  尽管我们不需要根据不同的类型创建不同的对象，但是，单个对象本身的创建过程比较复杂，比如前面提到的要组合其他类对象，做各种初始化操作。
 *  在这种情况下，我们也可以考虑使用工厂模式，将对象的创建过程封装到工厂类中。
 * 
 * 最本质的是否需要使用工厂模式的参考标准：
 * 
 * 1. 封装变化：创建逻辑有可能变化，封装成工厂类之后，创建逻辑的变更对调用者透明
 * 2. 代码复用：创建代码抽离到独立的工厂类之后可以复用
 * 3. 隔离复杂性：封装复杂的创建逻辑，调用者无需了解如何创建对象
 * 4. 控制复杂度：将创建代码抽离出来，让原本的函数或类职责更单一，代码更简洁
 * 
 * 分类：
 *  1. 简单工厂
 *  2. 工厂方法
 *  3. 抽象工厂
 */

/************* 工厂方法模式实现代码 *************/

// 产品接口中将声明所有具体产品都必须实现的操作
interface Product {
  operation(): string
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return 'ConcreteProduct1'
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return 'ConcreteProduct2'
  }
}

/**
 * 创建者类声明的工厂方法必须返回一个产品类的对象。创建者的子类通常会提供
 * 该方法的实现
 */
abstract class Creator {
  /**
   * 注意：实际业务中创建者还可提供一些工厂方法的默认实现
   */
  public abstract factoryMethod(): Product

  /**
   * 请注意，创建者的主要职责并非是创建产品。其中通常会包含一些核心业务
   * 逻辑，这些逻辑依赖于由工厂方法返回的产品对象。子类可通过重写工厂方
   * 法并使其返回不同类型的产品来间接修改业务逻辑
   */
  public someOperation(): string {
    // 调用工厂方法创建一个产品对象
    const product = this.factoryMethod()
    // 现在使用产品
    return `Creator: The same creator's code work with ${product.operation()}`
  }
}

/**
 * 具体产品需提供产品接口的各种实现。
 */
class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1()
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2()
  }
}

/*** 运行 ***/
function clientCode(creator: Creator) {
  console.log(`Client: 虽然我不知道 creator 类型, 但运行成功了.`)
  console.log(creator.someOperation())
}

/* 客户端代码可以自由选择对应的 creator 类型 */
console.log('App: ConcreteCreator1 发射')
clientCode(new ConcreteCreator1())
console.log('')

console.log('App: ConcreteCreator2 发射')
clientCode(new ConcreteCreator2())