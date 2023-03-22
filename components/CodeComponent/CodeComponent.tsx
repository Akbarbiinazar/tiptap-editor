import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";
interface CodeBlockAttrs {
  language: string;
}

interface CodeBlockExtension {
  options: {
    lowlight: {
      listLanguages(): string[];
    };
  };
}

interface CodeBlockComponentProps {
  node: {
    attrs: CodeBlockAttrs;
  };
  updateAttributes: (attrs: CodeBlockAttrs) => void;
  extension: CodeBlockExtension;
}

const CodeBlockComponent = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: CodeBlockComponentProps) => {
  const languages = extension.options.lowlight.listLanguages();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = event.target.value;
    updateAttributes({ language });
  };

  return (
    <NodeViewWrapper className="code-block">
      <select
        value={defaultLanguage}
        onChange={handleLanguageChange}
        contentEditable={false}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
