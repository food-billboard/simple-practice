
# joker finder  

## 内容  

### 左侧  
  16宫格  
### 右侧  
  提示文字记录  

## 流程  
  loading  
  提示文字  
  给定时间记住joker位置  
  卡牌翻面  
  正式开始  
  每一步骤停顿  
  步骤结束  

## 提示文字  
  马上就是愚人节了  
  让我们来玩一个简单的小游戏  
  我们按照步骤随机打乱卡牌  
  你能正确找到joker的位置吗   
  首先不要觉得很简单   
  他非常考验你的记忆力  

  那么正式开始吧（从这里开始反复）  
  花x秒记住现在joker的位置  
  。。。  
  时间到，正式开始  
  xxxx   
  xxxx  
  xxxx  
  OK，所有步骤完成  
  请确定卡牌的位置并点击  

    猜错了  
    是否明牌复刻  
      是（定时重复上述步骤）  
      否（重新开始）

    恭喜你，猜对了    

## 步骤map  
  第x行和第y行交换  
  第x列和第y列交换  
  上和下交换  
  左和右交换  
  顺时针旋转90*x度   
  逆时针旋转90*x度  
  忽略前x步  
  忽略后x步  
  正斜角第x个和第y个交换  
  反斜角第x个和第y个交换  
  正反斜角交换    

## 未完成   
  - 步骤细节  
  - 明牌复刻  
  - 右侧外框样式优化  
  