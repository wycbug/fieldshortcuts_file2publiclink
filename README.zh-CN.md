# 飞书多维表格字段插件：附件转链接

该插件用于在飞书多维表格（Base）字段中，将选中的「附件」字段内容转换为可用的链接输出。每个文件会优先输出其 `tmp_url`，若无则回退到 `url`，再回退到 `link`，多个文件以换行分隔。

## 功能特点

- 将附件输入转换为链接输出
- 多个文件按行输出（换行分隔）
- 精简 i18n，仅保留必要的多语言键值
- 标准化日志前缀，便于日志检索与问题定位

## 使用说明

1. 在多维表格中添加本字段插件。
2. 在表单输入项中选择一个或多个附件（字段显示文案使用 i18n 的 `inputText`）。
3. 执行后，结果文本为每个文件的一条链接，按行分隔，取值优先级：`tmp_url` → `url` → `link`。

## 输出示例

```
https://internal-api-drive-stream.feishu.cn/...tmp_url1
https://internal-api-drive-stream.feishu.cn/...tmp_url2
...
```

> 说明：`tmp_url` 多为内部/授权下载地址。如果你需要对外可访问的公共链接，需要额外的转换或开放分享接口支持，可在提出需求后扩展。

## 日志规范

插件在关键流程中输出标准化日志前缀，包含下列上下文字段，便于排查：

```
[logID=...] [packID=...] [tenantKey=...] [baseID=...] [tableID=...] [baseOwnerID=...] [timeZone=...] [isNeedPayPack=...] [hasQuota=...] [baseSignature=...]
```

## 多语言（i18n）

当前仅保留并使用以下键值：

- `inputText`：输入项标签
- `errorProcessing`：通用错误提示
- `parseSuccess`：解析成功
- `parseFailed`：解析失败

## 项目结构

```
src/
└── index.ts  # 主入口：字段定义、表单项、执行逻辑与日志
```

## 常用脚本

- `npm start`：使用 Basekit CLI 启动字段
- `npm run dev`：本地调试执行函数
- `npm run build`：构建字段包
- `npm run pack`：打包输出到 `output/output.zip`

## 发布

运行以下命令生成可发布的压缩包：

```
npm run pack
```

## 许可证

本项目采用 MIT 许可协议。
