import {
  basekit,
  FieldType,
  field,
  FieldComponent,
  FieldCode,
  FieldContext,
} from "@lark-opdev/block-basekit-server-api";
const { t } = field;

// 标准化日志上下文信息，便于检索
function formatContext(ctx: FieldContext): string {
  const c: any = ctx as any;
  return [
    `logID=${c?.logID ?? ""}`,
    `packID=${c?.packID ?? ""}`,
    `tenantKey=${c?.tenantKey ?? ""}`,
    `baseID=${c?.baseID ?? ""}`,
    `tableID=${c?.tableID ?? ""}`,
    `baseOwnerID=${c?.baseOwnerID ?? ""}`,
    `timeZone=${c?.timeZone ?? ""}`,
    `isNeedPayPack=${c?.isNeedPayPack ?? ""}`,
    `hasQuota=${c?.hasQuota ?? ""}`,
    `baseSignature=${c?.baseSignature ?? ""}`,
  ]
    .map((kv) => `[${kv}]`)
    .join(" ");
}

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      "zh-CN": {
        inputText: "文件",
        errorProcessing: "处理失败，请重试",
        parseSuccess: "解析成功",
        parseFailed: "解析失败",
      },
      "en-US": {
        inputText: "File",
        errorProcessing: "Processing failed, please try again",
        parseSuccess: "Parse Successful",
        parseFailed: "Parse Failed",
      },
      "ja-JP": {
        inputText: "ファイル",
        errorProcessing: "処理に失敗しました。もう一度お試しください",
        parseSuccess: "解析成功",
        parseFailed: "解析失敗",
      },
    },
  },

  // 定义捷径的入参
  formItems: [
    {
      key: "file",
      label: t("inputText"),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment],
      },
      validator: {
        required: true,
      },
    },
  ],

  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Text,
  },

  // 捷径处理函数
  execute: async function (
    formItemParams: {
      file: any[];
    },
    context: FieldContext
  ) {
    try {
      console.log(`${formatContext(context)} 开始执行函数`);

      // 检查必要参数
      if (!formItemParams.file || formItemParams.file.length === 0) {
        return {
          code: FieldCode.Success,
          msg: t("errorProcessing"),
          data: t("errorProcessing"),
        };
      }
      console.log(
        `${formatContext(context)} 用户填入文件信息:`,
        formItemParams.file
      );

      const resultText = formItemParams.file
        .map((item: any) => item?.tmp_url || item?.url || item?.link || "")
        .filter((v: string) => Boolean(v))
        .join("\n");
      return {
        code: FieldCode.Success,
        data: resultText,
        msg: t("parseSuccess"),
      };
    } catch (error) {
      console.error(`${formatContext(context)} 执行出错`, error);
      const errMsg = error instanceof Error ? error.message : "未知错误";
      return {
        code: FieldCode.Success,
        data: `${t("parseFailed")}：${errMsg}`,
        msg: `${t("parseFailed")}：${errMsg}`,
      };
    }
  },
});

export default basekit;
