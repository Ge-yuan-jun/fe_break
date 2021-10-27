/*
 * @Author: Ge.Yuanjun 
 * @Date: 2021-10-28 00:17:59 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2021-10-28 01:13:21
 * @desc: 代码模式
 */

/**
 * 代理模式常用在业务系统中开发一些非功能性需求，比如：
 * 监控、统计、鉴权、限流、事务、幂等、日志。我们将这
 * 些附加功能与业务功能解耦，放到代理类统一处理，让程
 * 序员只需要关注业务方面的开发。除此之外，代理模式还
 * 可以用在 RPC、缓存等应用场景中。
 */

/**
 * Subject 接口声明 RealSubject 和代理的通用操作。只要
 * 客户机使用此接口与RealSubject一起工作，您就可以向
 * 其传递代理，而不是真正的subject。
 */
interface Subject {
  request(): void
}

/**
 * RealSubject 包含一些核心业务逻辑。RealSubject 可能
 * 存在比较缓慢或者异步的操作
 * 
 * 例如，纠正输入数据。利用代理可以解决这个问题，而无需任何
 * 对 RealSubject 更改代码。
 */
class RealSubject implements Subject {
  public request (): void {
    console.log('RealSubject 处理请求中')
  }
}

/**
 * 代理包含与 RealSubject 相同的属性
 */
class RealProxy implements Subject {
  private realSubject: RealSubject

  /**
   * 代理引用了 realSubject 对象，两种方式，1. 懒加载 2.
   * 调用方传入
   * @param realSubject 
   */
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject
  }

  /**
   * 代理模式常会使用发哦懒加载，常见场景有，缓存、权限控
   * 制、日志等，利用代理可以前置处理一些事项，之后再调用
   * realSubject 中的方法
   */
  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    // 前置处理
    console.log('Proxy: 前置处理')
    return true
  }

  private logAccess(): void {
    console.log('Proxy: 日志打印')
  }
}

/**
 * 客户端应该对代理模式无感知，调用方式及参数理应一样。真实
 * 场景中，客户端一般直接调用 realSubject ，本例中，只是
 * 简单为了展示用法，其实，你还可以继续拓展代理类
 */
function clientProxyCode (subject: Subject) {
  subject.request()
}

console.log('Client: 直接调用')
const realProxySubject = new RealSubject()
clientProxyCode(realProxySubject)

console.log('');

console.log('Client: 利用代理模式调用')
const proxyExample = new RealProxy(realProxySubject)
clientProxyCode(proxyExample)