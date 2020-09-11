#### 说明

##### 添加element按钮类型micro
```
// theme-chalk/src/button.scss line 157
@include m(micro) {
  @include button-size($--button-micro-padding-vertical, $--button-micro-padding-horizontal, $--button-micro-font-size, $--button-micro-border-radius);
  @include when(circle) {
    padding: $--button-micro-padding-vertical;
  }
}

// 然后在element-variables.scss添加micro相应设置
```

#### 修改element折叠面板颜色样式
```
// theme-chalk/src/common/var.scss line 728
旧：
$--collapse-header-fill: $--color-white !default;
新：
$--collapse-header-fill: rgb(250, 250, 250) !default;
```

#### 修改element文本框颜色样式
```
// theme-chalk/src/common/var.scss line 387
旧：
$--input-disabled-fill: $--disabled-fill-base !default;
新：
$--input-disabled-fill: #fff !default;
```

#### 修改element按钮颜色样式
```
// theme-chalk/src/button.scss line 78/81/82
旧：
color: $--button-disabled-font-color;
background-color: $--button-disabled-background-color;
border-color: $--button-disabled-border-color;
新：
color: $--button-disabled-font-color !important;
background-color: $--button-disabled-background-color !important;
border-color: $--button-disabled-border-color !important;
// theme-chalk/src/common/var.scss line 481/483/485/
旧：
$--button-disabled-font-color: $--color-text-placeholder !default;
$--button-disabled-background-color: $--color-white !default;
$--button-disabled-border-color: $--border-color-base !default;
新：
$--button-disabled-font-color: $--button-disabled-color !default;
$--button-disabled-background-color: $--button-disabled-bgc !default;
$--button-disabled-border-color: $--button-disabled-bc !default;
然后在element-variables添加$--button-default-bgc变量