/*
 * @Author: Ge.Yuanjun 
 * @Date: 2018-02-05 12:53:31 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2018-02-05 13:20:11
 * @desc: 策略者模式的简单实现
 * 
 * 策略模式的优点：
 * - 利用组合、委托和多态的技术和思想，可以有效地避免多重条件选择语句
 * - 提供了一种对开放、封闭原则的完美支持，将算法封装在独立的 strategy 中，易于切换，易于理解、易于拓展
 * - 避免许多重复的复制粘贴工作
 * - 利用组合和委托来让 Context 拥有执行算法的能力，这也是集成的一种更轻便的替代方式
 * 
 * 策略模式的缺点：
 * - 会在程序中增加很多的策略类以及策略对象
 * - 要使用策略模式，必须了解所有的 strategy，要向客户暴露它的所有实现，这是违反最少知识原则的
 */


/** 策略定义 */
var strategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function (value, length, errorMsg) {
    // 限制最小长度
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function (value, errorMsg) {
    // 手机号码格式
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}

/** 策略运行类的实现 */
var Validator = function () {
  this.cache = []
}

Validator.prototype.add = function (dom, rule, errorMsg) {
  var ary = rule.split(':') // 将 strategy 和参数分来
  this.cache.push(function () { // 将校验步骤用空函数包装起来，并且放入 cache
    var strategy = ary.shift() // 用户挑选的strategy
    ary.unshift(dom.value) // 把 input 的 value 添加进参数列表
    ary.push(errorMsg) // 把 errorMsg 添加进参数列表
    return strategies[strategy].apply(dom, ary)
  })
}

Validator.prototype.start = function () {
  for (var i = 0, validateFunc; validateFunc = this.cache[i++];) {
    var msg = validateFunc() // 开始校验，并取得校验之后的返回值
    if (msg) { // 如果存在特定的返回值，说明校验没有通过
      return msg
    }
  }
}


/** 调用方式 */
var validateFunc = function () {
  var validator = new Validator() // 创建 validator 对象

  /** 添加校验规则 */
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于 6 位')
  validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')

  var errorMsg = validator.start() // 获得校验结果
  return errorMsg
}

var registerForm = document.getElementById('registerForm')
registerForm.onsubmit = function () {
  var errorMsg = validateFunc()
  if (errorMsg) {
    alert(errorMsg)
    return false // 阻止表单提交
  }
}