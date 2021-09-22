/**
 * 单例模式
 * 一个类只允许创建一个对象（或者实例），那这个类就是一个单例类，这种设计模式就叫作单例设计模式
 * js 无法实现一个严格的单例模式，没法阻止调用方自己生成一个实例
 * 
 * 适用场景：
 * 1. 处理资源访问冲突
 * 2. 标识全局唯一类
 * 
 * 关注点：
 * 1. 构造函数需要是 private 访问权限的，这样才能避免外部通过 new 创建实例
 * 2. 考虑对象创建时的线程安全问题
 * 3. 考虑是否支持延迟加载
 * 4. 考虑 getInstance() 性能是否高（是否加锁）
 * 
 * 实现方式：
 * 1. 饿汉式：初始化时创建完成
 * 2. 懒汉式：支持延迟加载
 * 3. 双重检测
 * 4. 静态内部类
 * 5. 枚举
 */

/**
 * 饿汉式实现方式
 * 
 * 1. 饿汉模式在类加载的时候就对实例进行创建，实例在整个程序周期都存在
 * 2. 好处：只在类加载的时候创建一次实例, 适合单例占用内存比较小，在初始化时就会被用到的情况
 * 3. 缺点：即使这个单例没有用到也会被创建，而且在类加载之后就被创建，内存就被浪费了
 */
namespace SingletonPattern {
  export class SingletonA {
    private static singleton: SingletonA = new SingletonA()

    private constructor () {}

    public static getInstance (): SingletonA {
      return SingletonA.singleton
    }

    public someBusinessLogic () {}
  }
}

/**
 * 懒汉式实现方式
 * 
 * 1. 懒汉模式中单例是在需要的时候才去创建的，如果单例已经创建，再次调用获取接口将不会重新创建新的对象，而是直接返回之前创建的对象
 * 2. 如果某个单例使用的次数少，并且创建单例消耗的资源较多，那么就需要实现单例的按需创建
 */
namespace SingletonPattern {
  export class SingletonB {
    private static instance: SingletonB

    private constructor () {}

    public static getInstance (): SingletonB {
      if (!SingletonB.instance) {
        SingletonB.instance = new SingletonB()
      }

      return SingletonB.instance
    }

    public someBusinessLogic () {}
  }
}


/**
 * test case
 */
const s1 = SingletonPattern.SingletonA.getInstance()
const s2 = SingletonPattern.SingletonA.getInstance()

const s3 = SingletonPattern.SingletonB.getInstance()
const s4 = SingletonPattern.SingletonB.getInstance()

console.log(s1 === s2) // true
console.log(s3 === s4) // true
console.log(s1 === s4) // false
console.log(s2 === s3) // false
