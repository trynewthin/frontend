# 车辆模块API使用文档

## 1. 基本信息

- **基础路径**: `http://localhost:8080/api`
- **认证方式**: 通过请求头 `Authorization` 传递token
- **中文参数说明**: URL中的中文参数需要进行URL编码

## 2. 车辆查询接口

### 2.1 获取车辆列表

获取分页的车辆列表，支持按状态和经销商ID筛选。

- **方法**: `GET`
- **路径**: `/cars`
- **认证**: 需要
- **参数**:
  - `page` (整数, 查询参数, 可选): 页码，默认1
  - `size` (整数, 查询参数, 可选): 每页数量，默认10
  - `status` (整数, 查询参数, 可选): 车辆状态：1-在售，0-下架
  - `dealer_id` (整数, 查询参数, 可选): 经销商ID

**示例请求**:
```bash
curl -X GET "http://localhost:8080/api/cars?page=1&size=10" -H "Authorization: {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "cars": [
      {
        "carId": 1,
        "dealerId": 1,
        "brand": "BMW",
        "model": "宝马5系 530Li",
        "year": 2023,
        "price": 479800.00,
        "category": "中大型轿车",
        "status": 1,
        "createTime": "2025-03-06T08:12:15",
        "updateTime": "2025-03-06T08:12:15"
      }
      // 更多车辆...
    ],
    "total": 6,
    "current": 1,
    "pages": 1
  }
}
```

### 2.2 获取车辆详情

根据车辆ID获取完整的车辆信息，包括基本信息、详细配置和图片。

- **方法**: `GET`
- **路径**: `/cars/{car_id}`
- **认证**: 需要
- **参数**:
  - `car_id` (整数, 路径参数): 车辆ID

**示例请求**:
```bash
curl -X GET "http://localhost:8080/api/cars/1" -H "Authorization: {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "car": {
      "carId": 1,
      "dealerId": 1,
      "brand": "BMW",
      "model": "宝马5系 530Li",
      "year": 2023,
      "price": 479800.00,
      "category": "中大型轿车",
      "status": 1,
      "createTime": "2025-03-06T08:12:15",
      "updateTime": "2025-03-06T08:12:15"
    },
    "detail": {
      "detailId": 1,
      "carId": 1,
      "engine": "2.0T 涡轮增压直列四缸",
      "transmission": "8速手自一体",
      "fuelType": "汽油",
      "fuelConsumption": 6.8,
      "seats": 5,
      "color": "墨尔本红,雪山白,碳黑色,矿石灰",
      "bodySize": "5087×1868×1498mm",
      "wheelbase": 3108.0,
      "features": "语音控制,自动泊车,自适应巡航,无钥匙进入,全景天窗,电动后备厢",
      "warranty": "三年不限公里"
    },
    "images": [
      {
        "imageId": 1,
        "carId": 1,
        "imageType": "缩略图",
        "imageUrl": "/images/cars/bmw/5-series-thumb.jpg",
        "uploadTime": "2025-03-06T08:12:15"
      }
      // 更多图片...
    ]
  }
}
```

### 2.3 按品牌查询车辆

分页获取指定品牌的车辆列表。

- **方法**: `GET`
- **路径**: `/cars/brand/{brand}`
- **认证**: 需要
- **参数**:
  - `brand` (字符串, 路径参数): 品牌名称（如需使用中文，必须URL编码）
  - `page` (整数, 查询参数, 可选): 页码，默认1
  - `size` (整数, 查询参数, 可选): 每页数量，默认10

**示例请求**:
```bash
# 英文品牌
curl -X GET "http://localhost:8080/api/cars/brand/BMW?page=1&size=10" -H "Authorization: {token}"

# 中文品牌（需URL编码）
curl -X GET "http://localhost:8080/api/cars/brand/%E5%A5%94%E9%A9%B0?page=1&size=10" -H "Authorization: {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "cars": [
      {
        "carId": 4,
        "dealerId": 2,
        "brand": "Mercedes-Benz",
        "model": "奔驰E级 E300L",
        "year": 2023,
        "price": 498800.00,
        "category": "中大型轿车",
        "status": 1,
        "createTime": "2025-03-06T08:12:15",
        "updateTime": "2025-03-06T08:12:15"
      }
      // 更多车辆...
    ],
    "total": 2,
    "current": 1,
    "pages": 1
  }
}
```

### 2.4 按价格区间查询车辆

分页获取指定价格区间内的车辆列表。

- **方法**: `GET`
- **路径**: `/cars/price`
- **认证**: 需要
- **参数**:
  - `min` (数字, 查询参数): 最低价格
  - `max` (数字, 查询参数): 最高价格
  - `page` (整数, 查询参数, 可选): 页码，默认1
  - `size` (整数, 查询参数, 可选): 每页数量，默认10

**示例请求**:
```bash
curl -X GET "http://localhost:8080/api/cars/price?min=400000&max=500000&page=1&size=10" -H "Authorization: {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "cars": [
      {
        "carId": 1,
        "dealerId": 1,
        "brand": "BMW",
        "model": "宝马5系 530Li",
        "year": 2023,
        "price": 479800.00,
        "category": "中大型轿车",
        "status": 1,
        "createTime": "2025-03-06T08:12:15",
        "updateTime": "2025-03-06T08:12:15"
      }
      // 更多车辆...
    ],
    "total": 3,
    "current": 1,
    "pages": 1
  }
}
```

### 2.5 按类别查询车辆

分页获取指定类别的车辆列表。

- **方法**: `GET`
- **路径**: `/cars/category/{category}`
- **认证**: 需要
- **参数**:
  - `category` (字符串, 路径参数): 车型类别（如需使用中文，必须URL编码）
  - `page` (整数, 查询参数, 可选): 页码，默认1
  - `size` (整数, 查询参数, 可选): 每页数量，默认10

**示例请求**:
```bash
# 中文类别（需URL编码）
curl -X GET "http://localhost:8080/api/cars/category/%E4%B8%AD%E5%9E%8BSUV?page=1&size=10" -H "Authorization: {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "cars": [
      {
        "carId": 5,
        "dealerId": 2,
        "brand": "Mercedes-Benz",
        "model": "奔驰GLC 300L 4MATIC",
        "year": 2023,
        "price": 489800.00,
        "category": "中型SUV",
        "status": 1,
        "createTime": "2025-03-06T08:12:15",
        "updateTime": "2025-03-06T08:12:15"
      }
      // 更多车辆...
    ],
    "total": 2,
    "current": 1,
    "pages": 1
  }
}
```

### 2.6 关键词搜索车辆

根据关键词搜索车辆，支持品牌、型号、类别等字段。

- **方法**: `GET`
- **路径**: `/cars/search`
- **认证**: 需要
- **参数**:
  - `keyword` (字符串, 查询参数): 搜索关键词（如需使用中文，必须URL编码）
  - `page` (整数, 查询参数, 可选): 页码，默认1
  - `size` (整数, 查询参数, 可选): 每页数量，默认10

**示例请求**:
```bash
# 中文关键词（需URL编码）
curl -X GET "http://localhost:8080/api/cars/search?keyword=%E4%B8%AD%E5%9E%8B&page=1&size=10" -H "Authorization: {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "cars": [
      {
        "carId": 5,
        "dealerId": 2,
        "brand": "Mercedes-Benz",
        "model": "奔驰GLC 300L 4MATIC",
        "year": 2023,
        "price": 489800.00,
        "category": "中型SUV",
        "status": 1,
        "createTime": "2025-03-06T08:12:15",
        "updateTime": "2025-03-06T08:12:15"
      }
      // 更多车辆...
    ],
    "total": 2,
    "current": 1,
    "pages": 1
  }
}
```

### 2.7 多条件筛选车辆

根据多个条件筛选车辆，支持品牌、类别、价格区间等组合查询。

- **方法**: `POST`
- **路径**: `/cars/filter`
- **认证**: 需要
- **请求体**: JSON对象，包含筛选条件

**示例请求**:
```bash
curl -X POST "http://localhost:8080/api/cars/filter" \
  -H "Content-Type: application/json" \
  -H "Authorization: {token}" \
  -d '{"category":"中型SUV","priceMin":450000,"priceMax":600000,"page":1,"size":10}'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "cars": [
      {
        "carId": 5,
        "dealerId": 2,
        "brand": "Mercedes-Benz",
        "model": "奔驰GLC 300L 4MATIC",
        "year": 2023,
        "price": 489800.00,
        "category": "中型SUV",
        "status": 1,
        "createTime": "2025-03-06T08:12:15",
        "updateTime": "2025-03-06T08:12:15"
      }
      // 更多车辆...
    ],
    "total": 1,
    "current": 1,
    "pages": 1
  }
}
```

### 2.8 获取品牌列表

获取所有车辆品牌及其数量统计。

- **方法**: `GET`
- **路径**: `/cars/brands`
- **认证**: 需要

**示例请求**:
```bash
curl -X GET "http://localhost:8080/api/cars/brands" -H "Authorization: {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "brand": "BMW",
      "count": 2
    },
    {
      "brand": "Mercedes-Benz",
      "count": 2
    },
    {
      "brand": "Audi",
      "count": 1
    },
    {
      "brand": "Porsche",
      "count": 1
    }
  ]
}
```

### 2.9 获取车型类别列表

获取所有车型类别及其数量统计。

- **方法**: `GET`
- **路径**: `/cars/categories`
- **认证**: 需要

**示例请求**:
```bash
curl -X GET "http://localhost:8080/api/cars/categories" -H "Authorization: {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "category": "中大型轿车",
      "count": 3
    },
    {
      "category": "中大型SUV",
      "count": 1
    },
    {
      "category": "中型SUV",
      "count": 2
    }
  ]
}
```

## 3. 车辆管理接口（需要经销商或管理员权限）

### 3.1 创建新车辆

创建新的车辆信息，包括基本信息和详细配置。

- **方法**: `POST`
- **路径**: `/cars`
- **认证**: 需要（经销商或管理员权限）
- **请求体**: JSON对象，包含车辆信息和详情

**示例请求**:
```bash
curl -X POST "http://localhost:8080/api/cars" \
  -H "Content-Type: application/json" \
  -H "Authorization: {token}" \
  -d '{
    "dealerId": 1,
    "brand": "丰田",
    "model": "卡罗拉",
    "year": 2023,
    "price": 139800.00,
    "category": "轿车",
    "detail": {
      "engine": "1.8L 自然吸气",
      "transmission": "CVT无级变速",
      "fuelType": "汽油",
      "fuelConsumption": 5.3,
      "seats": 5,
      "color": "珍珠白,极光银,曜石黑",
      "bodySize": "4635×1780×1455mm",
      "wheelbase": 2700.0,
      "features": "定速巡航,倒车影像,无钥匙进入",
      "warranty": "3年或10万公里"
    }
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "carId": 7,
    "dealerId": 1,
    "brand": "丰田",
    "model": "卡罗拉",
    "year": 2023,
    "price": 139800.00,
    "category": "轿车",
    "status": 1,
    "createTime": "2025-03-06T10:30:00",
    "updateTime": null
  }
}
```

### 3.2 更新车辆信息

更新指定车辆的基本信息和详细配置。

- **方法**: `PUT`
- **路径**: `/cars/{car_id}`
- **认证**: 需要（经销商或管理员权限）
- **参数**:
  - `car_id` (整数, 路径参数): 车辆ID
- **请求体**: JSON对象，包含车辆信息和详情

**示例请求**:
```bash
curl -X PUT "http://localhost:8080/api/cars/7" \
  -H "Content-Type: application/json" \
  -H "Authorization: {token}" \
  -d '{
    "dealerId": 1,
    "brand": "丰田",
    "model": "卡罗拉双擎",
    "year": 2023,
    "price": 159800.00,
    "category": "轿车",
    "detail": {
      "engine": "1.8L 混合动力",
      "transmission": "E-CVT电子无级变速",
      "fuelType": "汽油/电混合",
      "fuelConsumption": 4.2,
      "seats": 5,
      "color": "珍珠白,极光银,曜石黑,水晶蓝",
      "bodySize": "4635×1780×1455mm",
      "wheelbase": 2700.0,
      "features": "定速巡航,倒车影像,无钥匙进入,车道保持",
      "warranty": "3年或10万公里"
    }
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "carId": 7,
    "dealerId": 1,
    "brand": "丰田",
    "model": "卡罗拉双擎",
    "year": 2023,
    "price": 159800.00,
    "category": "轿车",
    "status": 1,
    "createTime": "2025-03-06T10:30:00",
    "updateTime": "2025-03-06T10:45:00"
  }
}
```

### 3.3 更新车辆详情

更新指定车辆的详细配置信息。

- **方法**: `PUT`
- **路径**: `/cars/{car_id}/detail`
- **认证**: 需要（经销商或管理员权限）
- **参数**:
  - `car_id` (整数, 路径参数): 车辆ID
- **请求体**: JSON对象，包含车辆详情

**示例请求**:
```bash
curl -X PUT "http://localhost:8080/api/cars/7/detail" \
  -H "Content-Type: application/json" \
  -H "Authorization: {token}" \
  -d '{
    "engine": "1.8L 混合动力",
    "transmission": "E-CVT电子无级变速",
    "fuelType": "汽油/电混合",
    "fuelConsumption": 4.2,
    "seats": 5,
    "color": "珍珠白,极光银,曜石黑,水晶蓝",
    "bodySize": "4635×1780×1455mm",
    "wheelbase": 2700.0,
    "features": "定速巡航,倒车影像,无钥匙进入,车道保持,蓝牙连接",
    "warranty": "3年或10万公里"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "detailId": 7,
    "carId": 7,
    "engine": "1.8L 混合动力",
    "transmission": "E-CVT电子无级变速",
    "fuelType": "汽油/电混合",
    "fuelConsumption": 4.2,
    "seats": 5,
    "color": "珍珠白,极光银,曜石黑,水晶蓝",
    "bodySize": "4635×1780×1455mm",
    "wheelbase": 2700.0,
    "features": "定速巡航,倒车影像,无钥匙进入,车道保持,蓝牙连接",
    "warranty": "3年或10万公里"
  }
}
```

### 3.4 修改车辆状态

修改车辆的上架/下架状态。

- **方法**: `PUT`
- **路径**: `/cars/{car_id}/status`
- **认证**: 需要（经销商或管理员权限）
- **参数**:
  - `car_id` (整数, 路径参数): 车辆ID
- **请求体**: JSON对象，包含状态值

**示例请求**:
```bash
curl -X PUT "http://localhost:8080/api/cars/7/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: {token}" \
  -d '{"status": 0}'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "状态更新成功",
  "data": {
    "car_id": 7,
    "status": 0,
    "status_text": "已下架",
    "update_time": "2025-03-06T11:00:00"
  }
}
```

### 3.5 删除车辆

删除指定车辆及其所有相关信息（详情、图片等）。
**注意**: 如果车辆有关联的预约记录，则无法删除。

- **方法**: `DELETE`
- **路径**: `/cars/{car_id}`
- **认证**: 需要（经销商或管理员权限）
- **参数**:
  - `car_id` (整数, 路径参数): 车辆ID

**示例请求**:
```bash
curl -X DELETE "http://localhost:8080/api/cars/7" -H "Authorization: {token}"
```

**成功响应示例**:
```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

**失败响应示例（有关联预约）**:
```json
{
  "code": 400,
  "message": "该车辆有相关预约记录，无法删除",
  "data": null
}
```

## 4. 注意事项

1. **中文参数处理**:
   - URL中的中文参数必须进行URL编码，例如"中型SUV"应编码为`%E4%B8%AD%E5%9E%8BSUV`
   - 请求体中的中文参数（JSON格式）无需特殊处理

2. **认证要求**:
   - 所有API都需要认证（通过Authorization请求头传递token）
   - 车辆管理接口（创建、更新、删除）需要经销商或管理员权限
   - 获取token的方法：调用登录API（`POST /users/login`）

3. **外键约束**:
   - 删除车辆前，系统会检查是否有关联的预约记录
   - 如果车辆有预约记录，则无法删除，将返回错误消息

4. **状态码说明**:
   - 200: 操作成功
   - 400: 请求参数错误（包括违反业务规则）
   - 401: 未授权（未提供token或token无效）
   - 403: 权限不足（没有操作权限）
   - 404: 资源不存在（如车辆不存在）
   - 500: 服务器内部错误

5. **请求频率限制**:
   - 为确保系统稳定，请控制API调用频率，避免短时间内发送大量请求

## 5. 开发环境

- 服务器地址: `http://localhost:8080`
- API路径前缀: `/api`
- 数据编码: UTF-8

---

此文档涵盖了车辆模块的所有接口，如有疑问或需要进一步支持，请联系系统管理员。
