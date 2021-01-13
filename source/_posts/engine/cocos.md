---
title: Cocos Creator + Typescript 开发入门
date: 2021-01-13 13:45:00
update: 2020-01-13 17:30:00
tags:
  - Typescript
  - Cocos Creator
  - 游戏引擎
  - 待填坑
categories: 前端笔记
---

## 语法

### 属性类型的声明

```typescript
const { ccclass, property } = cc._decorator

const BlockType = cc.Enum({dog:1, cat: 2})

@ccclass
export default class Player extends cc.Component {
  // 整型
  @property(cc.Integer)
  blockCount: number = 0

  // 浮点型
  @property(cc.Float)
  blockWidth: number = 0

  // 布尔型
  @property(cc.Boolean)
  blockIsDead: boolean = false

  // 节点
  @property(cc.Node)
  blockItem: cc.Node = null

  // 节点数组
  @property([cc.Node])
  blockList: Array<cc.Node> = []

  // 文本
  @property(cc.Label)
  blockName: cc.Label = null

  // 预制体
  @property(cc.Prefab)
  blockPrefab: cc.Prefab = null

  // 坐标
  @property(cc.Vec2)
  blockVec: cc.Vec2 = cc.v2()

  // 枚举类型
  @property({
      type: BlockType
  })
  blockType = BlockType.dog

  start() {
    // init logic
  }
}
```