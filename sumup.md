##微信小程序相关总结

- 1-VM19746:1 vdSyncBatch 数据传输长度为 1394120 已经超过最大长度 1048576
  > 这种报错通常是setData更新数据时候太长,通常后台传过来的数据只会使用部分,可以只选取我们需要的部分
- 2-下拉刷新在onPullDownRefresh中请求,下拉自动出现刷新标志,只需要处理wx.stopPullDownRefresh()即何时停止
- 3-多重循环
  > 
  ```html
    <view wx:for="A">
      <view wx:for="itemA.attaches" wx:for-item="itemB">
        <text>{{itemB.text}}</text>
      </view>
    </view>
    <!-- wx:for循环出来的默认为item,wx:for-item相当于指定循环出来的对象的名称 -->
  ```
- 4-vscode中利用easy WXLESS插件可以将less文件编译成wxss文件,提高效率
- 5-注意在{{}}中三元表达式的运用
- 6-阻止冒泡事件catchtap
- 7-官方提供的rpx,以iphone6的750为设计原型,UI原型图上的标注可1:1设置,并且自动适应不同屏幕
- 8-跳转传参
  >
  ```html
    <view bindtap='toInvitationDetail' data-body="{{item.body}}" data-create-time="{{item.create_time}}" class='content-item' wx:for="{{invitationLists}}" wx:key="id">
    </view>
  ```
  ```javascript
    // 接收端 生命周期函数--监听页面加载
    onLoad: function (options) {
      this.setData({
        createTime: options.createTime,
        body: options.body
      })
    },
  ```
- 9-方法传参
  ```html
    <view class="picture-view">
      <image class="picture-item" mode="scaleToFill" wx:for="{{item.attaches}}" wx:for-item="attach" wx:for-index="index" wx:key="id" src="{{'http://36.110.107.219:20002/soekao-web-dist/getcha?content=zone_attach&key='+attach.attach_id+'&compress=1&account=17610992252&callback=_jp0'}}" catchtap='viewPic' data-pic-arr='{{item.attaches}}' data-index='{{index}}' lazy-load="true"></image>
    </view>
    <!-- data-index和data-pic-arr都是可以当作给方法传递的参数,也可以作为页面之间传递的参数 -->
  ```
  ```javascript
    viewPic: function (event) {
      let that = this
      console.log(event.currentTarget.dataset)
      let dataset = event.currentTarget.dataset
      let picArr = dataset.picArr
      let index = dataset.index
      let tempArr = []
      for (let item of picArr) {
        tempArr.push(`http://36.110.107.219:20002/soekao-web-dist/getcha?content=zone_attach&key=${item.attach_id}&compress=1&account=17610992252&callback=_jp0`)
      }
      wx.previewImage({
        current: tempArr[index],
        urls: tempArr
      })
    }
    // 取值: event.currentTarget.dataset.picArr  data-create-time => createTime
  ```
- 10-渲染方式有些奇特
  ```html
    <view class="course-root">
      <text class="choose-lesson">请选择课程</text>
      <block class="lesson-type">
        <text class="lesson-item">1234</text>
      </block>
    </view>
    <!--渲染成下面这种结构了 -->
    <page>
      <view class="course-root">
        <text class="choose-lesson">请选择课程</text>
        <text class="lesson-item">1234</text>
      </view>
    </page>
    <!-- 写css的时候 想让.lesson-type部分作为一个整体,给.lesson-item部分布局 -->
    <!-- 想要达到希望的效果，可以把block变为view -->
    ```
- 11-文字垂直居中的问题
  ```html
    <!-- 下面这种会带空行 -->
    <view wx:for="items">
      <text>
        {{item.text}}
      </text>
    </view>
    <!-- 下面这种不带空行 -->
    <view wx:for="items">
      <text>{{item.text}}</text>
    </view>
  ```