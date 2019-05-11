# 响应
```
正常
{
    "code": 200,
    "message": "成功",
    "data": []  //查询结果
}

出错
{
    "code": 不等于200,
    "message": error
}
```

# 接口

## job 岗位

### 添加

- 接口：/job/add

- 方式：POST

- 参数

字段|说明
--|--
name|岗位名
area|面积

### 删除

- 接口：/job/del

- 方式：POST

- 参数

字段|类型说明
--|--|--
ids|array|

### 修改

- 接口：/job/update

- 方式：POST

- 参数

字段|说明
--|--
id|id
name|岗位名
area|面积

### 查找

- 接口：/job/get

- 方式：GET

- 参数


## office 办公楼

### 添加

- 接口：/office/add

- 方式：POST

- 参数

字段|说明
--|--
name|办公楼名称

### 删除

- 接口：/office/del

- 方式：POST

- 参数

字段|类型说明
--|--|--
ids|array|

### 修改

- 接口：/office/update

- 方式：POST

- 参数

字段|说明
--|--
id|id
name|办公楼名称

### 查找

- 接口：/office/get

- 方式：GET

- 参数

### 根据办公楼查单位

- 接口：/office/getUnit

- 方式：GET

- 参数

字段|说明
--|--
id|办公楼id

### 根据办公楼查房间

- 接口：/office/getRoom

- 方式：GET

- 参数

字段|说明
--|--
id|办公楼id

## room 房间

### 添加

- 接口：/room/add

- 方式：POST

- 参数

字段|说明
--|--
name|房间号
area|面积
office_id|办公楼id

### 删除

- 接口：/room/del

- 方式：POST

- 参数

字段|类型说明
--|--|--
ids|array|

### 修改

- 接口：/room/update

- 方式：POST

- 参数

字段|说明
--|--
id|id
name|房间号
area|面积
office_id|办公楼id

### 查找

- 接口：/room/get

- 方式：GET

- 参数

### 根据房间查用户

- 接口：/room/getUser

- 方式：GET

- 参数

字段|说明
--|--
id|房间id


## unit 单位

### 添加

- 接口：/unit/add

- 方式：POST

- 参数

字段|类型|说明
--|--|--
name|string|单位名称
office_ids|数组|办公楼ids
job_ids|数组|岗位ids


### 删除

- 接口：/unit/del

- 方式：POST

- 参数

字段|类型说明
--|--|--
ids|array|

### 修改

- 接口：/unit/update

- 方式：POST

- 参数

字段|类型|说明
--|--|--
id||id
name|string|单位名称
office_ids|数组|办公楼ids
job_ids|数组|岗位ids

### 查找

- 接口：/unit/get

- 方式：GET

- 参数


### 根据单位查办公楼

- 接口：/unit/getOffice

- 方式：GET

- 参数

字段|说明
--|--
id|单位id

### 根据单位查房间

- 接口：/unit/getRoom

- 方式：GET

- 参数

字段|说明
--|--
id|单位id


### 根据单位查岗位

- 接口：/unit/getJob

- 方式：GET

- 参数

字段|说明
--|--
id|单位id

### 根据单位查人员

- 接口：/unit/getUser

- 方式：GET

- 参数

字段|说明
--|--
id|单位id

## user 人员

### 添加

- 接口：/user/add

- 方式：POST

- 参数

字段|说明
--|--
name|人员名称
sex|性别
phone|电话
unit_id|单位id
room_id|房间id
job_id|岗位id


### 删除

- 接口：/user/del

- 方式：POST

- 参数

字段|类型说明
--|--|--
ids|array|

### 修改

- 接口：/user/update

- 方式：POST

- 参数

字段|说明
--|--
id|id
name|人员名称
sex|性别
phone|电话
unit_id|单位id
room_id|房间id
job_id|岗位id

### 查找

- 接口：/user/get

- 方式：GET

- 参数
