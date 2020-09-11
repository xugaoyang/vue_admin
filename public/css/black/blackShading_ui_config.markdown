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

#### 修改element占位文字颜色
```
// element-variables.scss line 58
旧：
$--color-text-placeholder: #C0C4CC !default;
新：
$--color-text-placeholder: #CECECE !default;
```

#### 修改element主要文字颜色
```
// element-variables.scss line 51
旧：
$--color-text-primary: #303133 !default;
新：
$--color-text-primary: #F2F2F2 !default;
```

#### 修改element次要文字颜色
```
// element-variables.scss line 56
旧：
$--color-text-secondary: #909399 !default;
新：
$--color-text-primary: #AEB9C3 !default;
```

#### 修改element一级边框颜色
```
// element-variables.scss line 60
旧：
$--border-color-base: #DCDFE6 !default;
新：
$--border-color-base: #24292E !default;
```

#### 修改element基础黑色
```
// element-variables.scss line 23
旧：
$--color-black: #000000 !default;
新：
$--color-black: #313940 !default;
```

#### 修改element文本框颜色样式
```
// theme-chalk/src/common/var.scss line 364/387
旧：
$--input-color: $--color-primary-light-1 !default;
$--input-border-color: $--color-primary-light-9 !default;
$--input-border-color-hover: $--color-primary-light-9 !default;
$--input-fill: $--color-primary-dark-9 !default;
$--input-hover-border: $--color-primary-light-9 !default;
$--input-focus-fill: $--color-primary-light-9 !default;

$--input-disabled-fill: $--color-primary-dark-9 !default;
$--input-disabled-border: $--disabled-border-base !default;
$--input-disabled-color: $--disabled-color-base !default;
新：
$--input-color: $--color-primary-dark-1 !default;
$--input-border-color: $--color-primary-dark-9 !default;
$--input-border-color-hover: $--color-primary-dark-9 !default;
$--input-fill: $--color-transparent-2 !default;
$--input-hover-border: $--color-primary-dark-9 !default;
$--input-focus-fill: $--color-primary-dark-9 !default;

$--input-disabled-fill: $--color-transparent-2 !default;
$--input-disabled-border: $--color-primary-dark-9 !default;
$--input-disabled-color: $--color-primary-dark-1 !default;
然后在element-variables.scss添加$--color-primary-dark-9变量
// theme-chalk/src/input.scss line 235
旧：
background-color: $--background-color-base;
新：
background-color: $--border-color-base;
```

#### 修改element多选框颜色样式
```
// theme-chalk/src/common/var.scss line 261/269
旧：
$--select-input-focus-background: $--color-primary !default;
$--select-multiple-input-color: #666 !default;
新：
$--select-input-focus-background: $--border-color-base !default;
$--select-multiple-input-color: #e6e6e6 !default;
//theme-chalk/src/select.scss line 130/133
旧:
background-color: #f0f2f5;
background-color: $--color-text-placeholder;
新：
background-color: #3b454e;
background-color: $--color-primary-dark-9;
```


#### 修改element树形控件颜色样式
```
// theme-chalk/src/common/var.scss line 628
旧：
$--tree-text-color: $--color-text-regular !default;
新：
$--tree-text-color: $--color-text-primary !default;
// theme-chalk/src/tree.scss line 9/42/66/121
旧：
background: $--color-black;
background-color: $--color-black;
background-color: $--border-color-base;
background-color: #4b545a;
新：
background: $--color-transparent-2;
background-color: $--color-transparent-3;
background-color: $--color-transparent-3;
background-color: $--color-transparent-3;
```

#### 修改element表格颜色样式
```
// theme-chalk/src/common/var.scss line 552-554/557/558
旧：
$--table-border-color: #1A242E !default;
$--table-border: 1px solid #1A242E !default;
$--table-text-color: #D4D2D3 !default;
$--table-current-row-background: $--color-primary-light-9 !default;
$--table-header-background: #1A222D !default;
新：
$--table-border-color: $--border-color-transparent !default;
$--table-border: 1px solid $--border-color-transparent !default;
$--table-text-color: #F2F2F2 !default;
$--table-current-row-background: $--border-color-base !default;
$--table-header-background: $--color-transparent-1 !default;
// theme-chalk/src/table.scss line 164/489/545
旧：
background-color: $--color-black;
background: #2c3238;
background-color: $--border-color-base;
新：
background-color: $--color-transparent-2;
background: $--color-transparent-2;
background-color: $--color-transparent-3;
```
#### 修改element卡片颜色样式
```
// theme-chalk/src/card.scss line 7
旧：
  background-color: $--color-black;
新：
  background-color: $--color-black;
// theme-chalk/src/common/var.scss line 647
旧：
$--card-border-color: $--color-black !default;
新：
$--card-border-color: $--border-color-transparent !default;
```

#### 修改element分页颜色样式
```
// theme-chalk/src/common/var.scss line 565/572
旧：
$--pagination-fill: $--color-black !default;
$--pagination-button-disabled-fill: $--color-white !default;
新：
$--pagination-fill: rgba(255,255,255,0.4) !default;
$--pagination-button-disabled-fill: #313940;
// theme-chalk/src/pagination.scss line 151/157/198-199
旧：
color: $--color-text-regular;
color: $--color-text-regular;
background-color: $--color-info-lighter;
color: $--color-text-regular;
新：
color: $--color-text-primary;
color: $--color-text-primary;
background-color: $--color-black;
color: $--color-text-primary;
```

#### 修改element标签页颜色样式
```
// theme-chalk/src/tabs.scss line 47/152/158/196/210/218/219/241
旧：
background-color: $--border-color-light;
border-bottom: 1px solid $--border-color-light;
border: 1px solid $--border-color-light;
border-bottom-color: $--color-white;
background: $-tab-active-color;
background-color: $--tabs-background-color-base;
border-bottom: 1px solid $--border-color-light;
background-color: $-tab-active-color;
新：
background-color: $--border-color-base;
border-bottom: 1px solid $--border-color-base;
border: 1px solid $--border-color-base;
border-bottom-color: $--color-black;
background: $--color-transparent-1;
background-color: $--color-transparent-1;
border-bottom: $--border-color-base;
background-color: rgba(27,37,58,0.5);
然后在element-variables添加 $--tabs-background-color-base、$-tab-active-color变量
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
// theme-chalk/src/common/var.scss line 476/478/481/483/485/
旧：
$--button-default-background-color:$--button-default-bgc !default;
$--button-default-border-color: $--border-color-base !default;
$--button-disabled-font-color: $--color-text-placeholder !default;
$--button-disabled-background-color: $--color-white !default;
$--button-disabled-border-color: $--border-color-base !default;
新：
$--button-default-background-color:#2e364b !default;
$--button-default-border-color:#4c5b79 !default;
$--button-disabled-font-color: $--button-disabled-color !default;
$--button-disabled-background-color: $--button-disabled-bgc !default;
$--button-disabled-border-color: $--button-disabled-bc !default;
然后在element-variables添加$--button-default-bgc变量
// theme-chalk/src/button.scss line 90/255、258、261、262
旧：
background-color: $--color-white;
border-right-color: rgba($--color-white, 0.5);
新：
background-color: $--color-black;
border-right-color: rgba($--border-color-base, 0.5);
```

#### 修改element折叠面板颜色样式
```
// theme-chalk/src/common/var.scss line 725/728/731
旧：
$--collapse-border-color: $--border-color-lighter !default;
$--collapse-header-fill: $--color-white !default;
$--collapse-content-fill: $--color-white !default;
新：
$--collapse-border-color: $--border-color-base !default;
$--collapse-header-fill: $--collaspe-header-bgc !default;
$--collapse-content-fill: $-tab-active-color !default;
```

#### 修改element对话框颜色样式
```
// theme-chalk/src/dialog.scss line 10
旧：
background: $--color-black;
新：
background: #151c2c;
```

#### 修改element时间选择器颜色样式
```
// theme-chalk/src/picker.scss line 59
旧：
color: $--color-text-regular;
新：
color: $--color-text-primary;
// theme-chalk/src/picker-panel.scss line 4-7/29/76
旧：
color: $--color-primary-light-1;
border: 1px solid $--color-primary-light-9;
box-shadow: $--box-shadow-light;
background: $--color-primary-light-9;
background-color: $--color-white;
color: $--color-primary-light-1;
新：
color: $--color-text-primary;
border: 1px solid $--border-color-base;
box-shadow: $--box-shadow-light;
background: $--color-black;
background-color: $--color-black;
color: $--color-text-primary;
// theme-chalk/src/common/var.scss line 690-691/694-696
旧：
$--datepicker-off-color: $--color-primary-light-1 !default;
$--datepicker-header-color: $--color-primary-light-1 !default;
$--datepicker-inner-border-color: $--color-primary-light-9 !default;
$--datepicker-inrange-color: $--color-primary-light-9 !default;
$--datepicker-inrange-hover-color: $--color-primary-light-9 !default;
新：
$--datepicker-off-color: $--color-text-primary !default;
$--datepicker-header-color: $--color-text-primary !default;
$--datepicker-inner-border-color: $--border-color-base !default;
$--datepicker-inrange-color: $--border-color-base !default;
$--datepicker-inrange-hover-color: $--border-color-base !default;
// theme-chalk/src/date-table.scss
旧：
border-bottom: solid 1px $--border-color-lighter;
新：
border-bottom: solid 1px $--border-color-base;
// theme-chalk/src/date-picker/date-table.scss line 117
旧：
background-color: $--background-color-base;
新：
background-color: $--color-common-dark-1;
// theme-chalk/src/date-picker/time-picker.scss line 5、6、33、34
旧：
border: solid 1px $--datepicker-border-color;
background-color: $--color-white;
border-top: 1px solid $--border-color-light;
border-bottom: 1px solid $--border-color-light;
新：
border: solid 1px $--border-color-base;
background-color: $--color-common-dark-2;
border-top: 1px solid $--border-color-base;
border-bottom: 1px solid $--border-color-base;
// theme-chalk/src/date-picker/time-spinner.scss line 96
旧：
background: $--background-color-base;
新：
background: $--color-common-dark-1;
```

#### 修改element弹窗颜色样式
```
// theme-chalk/src/message-box.scss line 13/15
旧：
background-color: $--color-black;
border: 1px solid $--border-color-lighter;
新：
background-color: #151c2c;
border: 1px solid $--border-color-base;
// theme-chalk/src/common/var.scss line 316
旧：
$--msgbox-content-color: $--color-text-regular !default;
新：
$--msgbox-content-color: $--color-text-primary !default;
```

#### 修改element文字提示颜色样式
```
// theme-chalk/src/common/var.scss line 589-590
旧：
$--tooltip-fill: $--border-color-base !default;
$--tooltip-color: $--color-white !default;
新：
$--tooltip-fill: #151c2c !default;
$--tooltip-color: $--color-text-primary !default;
```

#### 修改element菜单颜色样式
```
// theme-chalk/src/common/var.scss line 677
旧：
$--menu-item-hover-fill: $--color-primary-light-9 !default;
新：
$--menu-item-hover-fill: $--menu-active-bgc !default;
// theme-chalk/src/menu.scss line 30/213
旧：
background-color: $--color-primary;
background: $--color-primary;
新：
background-color: $--menu-active-bgc;
background: $--menu-active-bgc;
```

#### 修改element加载颜色样式
```
// theme-chalk/src/loading.scss line 17
旧：
background-color: rgba(255, 255, 255, .9);
新：
background-color: rgba(0, 0, 0, .9);
```

#### 修改element步骤条颜色样式
```
// theme-chalk/src/steps.scss line 9
旧：
background: $--background-color-base;
新：
background: $--tabs-background-color-base;
```

#### 修改element上传颜色样式
```
// theme-chalk/src/upload.scss line 63-64/92
旧：
background-color: #fff;
border: 1px dashed #d9d9d9;
color: $--color-text-regular;
新：
background-color: #3b454e;
border: 1px dashed #24292E;
color: $--color-text-primary;
```

#### 修改element标签颜色样式
```
// theme-chalk/src/common/var.scss line 599/601
旧：
$--tag-fill: $--color-black !default;
$--tag-border: rgba($--color-primary, 0.20) !default;
新：
$--tag-fill: $--color-transparent-2 !default;
$--tag-border: #20b4fc !default;
```

#### 修改element表单颜色样式
```
// theme-chalk/src/form.scss line 92
旧：
color: $--color-text-regular;
新：
color: $--color-text-primary;
```

#### 修改element计数器颜色样式
```
// theme-chalk/src/input-number.scss line 29
旧：
background: $--background-color-base;
新：
background: $--button-default-bgc;
```

#### 修改element弹出框颜色样式
```
// theme-chalk/src/common/var.scss line 578/580
旧：
$--popover-fill: $--color-white !default;
$--popover-border-color: $--border-color-lighter !default;
新：
$--popover-fill: $--color-common-dark-2 !default;
$--popover-border-color: $--color-common-dark-1 !default;

// theme-chalk/src/popover.scss line 13
旧：
color: $--color-text-regular;
新：
color: $--color-text-primary;
```
