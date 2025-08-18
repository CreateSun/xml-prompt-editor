"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Save, Download, Copy, RotateCcw } from "lucide-react";

// 动态导入 Monaco Editor 以避免 SSR 问题
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-background-secondary rounded-lg flex items-center justify-center">
      <div className="text-foreground-muted">Loading editor...</div>
    </div>
  ),
});

interface XMLEditorProps {
  value: string;
  onChange: (value: string) => void;
  onValidate?: (errors: ValidationError[]) => void;
  theme?: "vs" | "vs-dark" | "hc-black";
  height?: string | number;
  className?: string;
}

interface ValidationError {
  type: "error" | "warning";
  message: string;
  severity: "error" | "warning";
  line?: number;
  column?: number;
}

const XMLEditor = ({
  value,
  onChange,
  onValidate,
  theme = "vs",
  height = "600px",
  className = "",
}: XMLEditorProps) => {
  const [formatStatus, setFormatStatus] = useState<
    "idle" | "formatting" | "success" | "error"
  >("idle");
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // 配置 XML 语言支持
    if (typeof window !== "undefined" && (window as any).monaco) {
      const monaco = (window as any).monaco;
      try {
        // 确保 XML 语言已注册
        if (
          !monaco.languages
            .getLanguages()
            .find((lang: any) => lang.id === "xml")
        ) {
          monaco.languages.register({ id: "xml" });
        }

        // 配置 XML 语言特性
        if (monaco.languages.xml?.xmlDefaults) {
          monaco.languages.xml.xmlDefaults.setDiagnosticsOptions({
            validate: true,
            schemaValidation: "warning",
            enableSchemaRequest: false,
          });
        }

        // 配置 XML 格式化选项
        monaco.languages.setLanguageConfiguration("xml", {
          comments: {
            blockComment: ["<!--", "-->"],
          },
          brackets: [
            ["<", ">"],
            ["[", "]"],
            ["(", ")"],
          ],
          autoClosingPairs: [
            { open: "<", close: ">" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
          ],
          surroundingPairs: [
            { open: "<", close: ">" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
          ],
        });

        console.log("XML language support configured successfully");
      } catch (error) {
        console.warn("Failed to configure XML language support:", error);
      }
    }

    // 设置编辑器选项
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: "on",
      roundedSelection: false,
      automaticLayout: true,
      formatOnPaste: true,
      formatOnType: false,
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      // 可以添加复制成功的提示
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prompt.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFormat = async () => {
    if (!editorRef.current) {
      console.warn("Editor not initialized");
      setFormatStatus("error");
      return;
    }

    setFormatStatus("formatting");

    try {
      // 尝试使用 Monaco Editor 的格式化动作
      const formatAction = editorRef.current.getAction(
        "editor.action.formatDocument"
      );

      if (formatAction && formatAction.isAvailable()) {
        await formatAction.run();
        console.log("XML formatted using Monaco Editor formatter");
        setFormatStatus("success");
      } else {
        // 如果格式化动作不可用，使用手动格式化
        console.log(
          "Monaco Editor formatter not available, using manual formatting"
        );
        await manualFormatXML();
        setFormatStatus("success");
      }
    } catch (error) {
      console.error("Formatting failed:", error);
      // 回退到手动格式化
      try {
        await manualFormatXML();
        setFormatStatus("success");
      } catch (manualError) {
        console.error("Manual formatting also failed:", manualError);
        setFormatStatus("error");
      }
    }

    // 3秒后重置状态
    setTimeout(() => setFormatStatus("idle"), 3000);
  };

  const manualFormatXML = async () => {
    debugger;
    if (!editorRef.current) return;

    try {
      const currentValue = editorRef.current.getValue();
      const formatted = formatXMLString(currentValue);
      editorRef.current.setValue(formatted);
      console.log("XML formatted manually");
    } catch (error) {
      console.error("Manual formatting failed:", error);
    }
  };

  const formatXMLString = (xmlString: string): string => {
    try {
      // 简单的 XML 格式化逻辑
      const formatted = xmlString
        .replace(/>\s+</g, "><") // 移除标签间的空白
        .replace(/\n\s*/g, "\n") // 清理换行和缩进
        .replace(/^\s+|\s+$/g, ""); // 移除首尾空白

      // 添加适当的换行和缩进
      let indent = 0;
      const lines: string[] = [];
      const tokens = formatted.match(/<[^>]*>|[^<]+/g) || [];

      for (const token of tokens) {
        if (token.startsWith("</")) {
          indent = Math.max(0, indent - 1);
        }

        if (token.trim()) {
          lines.push("  ".repeat(indent) + token.trim());
        }

        if (
          token.startsWith("<") &&
          !token.startsWith("</") &&
          !token.endsWith("/>")
        ) {
          indent++;
        }
      }

      return lines.join("\n");
    } catch (error) {
      console.error("XML formatting error:", error);
      return xmlString; // 如果格式化失败，返回原字符串
    }
  };

  return (
    <div
      className={`bg-background rounded-lg border border-border ${className}`}
    >
      {/* Editor Header */}
      <div className="bg-background-secondary px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm text-foreground-muted font-medium">
            prompt.xml
          </span>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="bg-background-secondary px-4 py-2 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFormat}
              disabled={formatStatus === "formatting"}
              className={`px-3 py-2 text-xs font-medium text-foreground bg-background border border-border rounded transition-colors ${
                formatStatus === "formatting"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-background-secondary"
              } ${
                formatStatus === "success"
                  ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                  : formatStatus === "error"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                  : ""
              }`}
              title="Format XML"
            >
              <RotateCcw
                className={`h-3 w-3 inline mr-1 ${
                  formatStatus === "formatting" ? "animate-spin" : ""
                }`}
              />
              {formatStatus === "formatting"
                ? "Formatting..."
                : formatStatus === "success"
                ? "Formatted!"
                : formatStatus === "error"
                ? "Error"
                : "Format"}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3 py-2 text-xs font-medium text-foreground bg-background border border-border rounded hover:bg-background-secondary transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-3 w-3 inline mr-1" />
              Copy
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-2 text-xs font-medium text-foreground bg-background border border-border rounded hover:bg-background-secondary transition-colors"
              title="Download file"
            >
              <Download className="h-3 w-3 inline mr-1" />
              Download
            </button>
            
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-4">
        <MonacoEditor
          height={height}
          language="xml"
          theme={theme}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: "line",
            automaticLayout: true,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            folding: true,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
};

export default XMLEditor;
