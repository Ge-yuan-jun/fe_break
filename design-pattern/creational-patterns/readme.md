## 设计模式-创建型

### 目标

创建型模式主要解决对象的创建问题，封装复杂的创建过程，解耦对象的创建代码和使用代码。

### 分类

- [单例模式](https://github.com/Ge-yuan-jun/fe_break/blob/master/design-pattern/creational-patterns/Singleton.ts)用来创建全局唯一的对象

- [工厂模式](https://github.com/Ge-yuan-jun/fe_break/blob/master/design-pattern/creational-patterns/Factory.ts)用来创建不同但是相关类型的对象（继承同一父类或者接口的一组子类），由给定的参数来决定创建哪种类型的对象

- [建造者模式](https://github.com/Ge-yuan-jun/fe_break/blob/master/design-pattern/creational-patterns/Builder.ts)是用来创建复杂对象，可以通过设置不同的可选参数，“定制化”地创建不同的对象

- [原型模式](https://github.com/Ge-yuan-jun/fe_break/blob/master/design-pattern/creational-patterns/creational-patterns/Prototype.ts)针对创建成本比较大的对象，利用对已有对象进行复制的方式进行创建，以达到节省创建时间的目的