import React, { useCallback, useState } from "react";

import {
  BubbleMenu,
  EditorContent,
  EditorOptions,
  FloatingMenu,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import { lowlight } from "lowlight";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Link from "@tiptap/extension-link";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import BulletList from "@tiptap/extension-bullet-list";
import java from "highlight.js/lib/languages/java";
import CodeBlockComponent from "../CodeComponent/CodeComponent";
import { Button, Container } from "@chakra-ui/react";
import useEnter from "@/hooks/useEnter";
import Placeholder from "@tiptap/extension-placeholder";

// import ReactComponent from "../Component/Extension";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

lowlight.registerLanguage("java", java);

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

interface CustomEditorOptions extends Partial<EditorOptions> {
  draggable?: boolean;
}

const Editor = () => {
  const [clickChecker, setClickChecker] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const checkEnter = useEnter();

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setClickChecker((clickChecker) => !clickChecker);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      // ReactComponent.configure({
      //   draggable: true,
      // }),
      Placeholder.configure({
        placeholder: "Write something",
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
      BulletList,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    draggable: true,
    editable: true,
    content: `
    <p>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
      <p>
        Neat, isn’t it? Add an empty paragraph to see the floating menu.
      </p>
      {
        if (i % 15 == 0)
          console.log("FizzBuzz");
        else if (i % 3 == 0)
          console.log("Fizz");
        else if (i % 5 == 0)
          console.log("Buzz");
        else
          console.log(i);
      }</code></pre>
              <p>
                Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
              </p>
              <ul>
              <li>A list item</li>
              <li>And another one</li>
            </ul>
    `,
  } as CustomEditorOptions);

  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  const openModal = useCallback(() => {
    if (editor === null) {
      return;
    }
    console.log(editor.chain().focus());
    setUrl(editor.getAttributes("link").href);
    // setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    // setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  if (!editor) {
    return null;
  }
  return (
    <Container>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
          // sx={{ minW: "100%" }}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            h4
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }
          >
            h5
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }
          >
            h6
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
          <button
            onClick={setLink}
            className={editor.isActive("link") ? "is-active" : ""}
          >
            setLink
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            unsetLink
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            toggleBulletList
          </button>
          <button
            onClick={() =>
              editor.chain().focus().sinkListItem("listItem").run()
            }
            disabled={!editor.can().sinkListItem("listItem")}
          >
            sinkListItem
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            ordered list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            toggleCodeBlock
          </button>
          <button
            onClick={() => editor.chain().focus().setCodeBlock().run()}
            disabled={editor.isActive("codeBlock")}
          >
            setCodeBlock
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            insertTable
          </button>
          {/* <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
          >
            addColumnBefore
          </button>
          <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
            addColumnAfter
          </button>
          <button onClick={() => editor.chain().focus().deleteColumn().run()}>
            deleteColumn
          </button>
          <button onClick={() => editor.chain().focus().addRowBefore().run()}>
            addRowBefore
          </button>
          <button onClick={() => editor.chain().focus().addRowAfter().run()}>
            addRowAfter
          </button>
          <button onClick={() => editor.chain().focus().deleteRow().run()}>
            deleteRow
          </button>
          <button onClick={() => editor.chain().focus().deleteTable().run()}>
            deleteTable
          </button>
          <button onClick={() => editor.chain().focus().mergeCells().run()}>
            mergeCells
          </button>
          <button onClick={() => editor.chain().focus().splitCell().run()}>
            splitCell
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          >
            toggleHeaderColumn
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          >
            toggleHeaderRow
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderCell().run()}
          >
            toggleHeaderCell
          </button>
          <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
            mergeOrSplit
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setCellAttribute("colspan", 2).run()
            }
          >
            setCellAttribute
          </button>
          <button onClick={() => editor.chain().focus().fixTables().run()}>
            fixTables
          </button>
          <button onClick={() => editor.chain().focus().goToNextCell().run()}>
            goToNextCell
          </button>
          <button
            onClick={() => editor.chain().focus().goToPreviousCell().run()}
          >
            goToPreviousCell
          </button> */}
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          className="floating-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          {!clickChecker ? (
            <AddIcon
              fontSize="small"
              onClick={handleClick}
              style={{ marginLeft: "2px" }}
            />
          ) : (
            <CloseIcon
              fontSize="small"
              onClick={handleClick}
              style={{ marginLeft: "2px" }}
            />
          )}

          {checkEnter && clickChecker && (
            <>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
              >
                H1
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
              >
                H2
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
              >
                H3
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                  editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                }
              >
                h4
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={
                  editor.isActive("heading", { level: 5 }) ? "is-active" : ""
                }
              >
                h5
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={
                  editor.isActive("heading", { level: 6 }) ? "is-active" : ""
                }
              >
                h6
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
              >
                Bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
              >
                Italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
              >
                Strike
              </button>
              <button
                onClick={setLink}
                className={editor.isActive("link") ? "is-active" : ""}
              >
                setLink
              </button>
              <button
                onClick={() => editor.chain().focus().unsetLink().run()}
                disabled={!editor.isActive("link")}
              >
                unsetLink
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "is-active" : ""}
              >
                toggleBulletList
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().sinkListItem("listItem").run()
                }
                disabled={!editor.can().sinkListItem("listItem")}
              >
                sinkListItem
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "is-active" : ""}
              >
                ordered list
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "is-active" : ""}
              >
                toggleCodeBlock
              </button>
              <button
                onClick={() => editor.chain().focus().setCodeBlock().run()}
                disabled={editor.isActive("codeBlock")}
              >
                setCodeBlock
              </button>
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
              >
                insertTable
              </button>
            </>
          )}

          {/* <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
          >
            addColumnBefore
          </button>
          <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
            addColumnAfter
          </button>
          <button onClick={() => editor.chain().focus().deleteColumn().run()}>
            deleteColumn
          </button>
          <button onClick={() => editor.chain().focus().addRowBefore().run()}>
            addRowBefore
          </button>
          <button onClick={() => editor.chain().focus().addRowAfter().run()}>
            addRowAfter
          </button>
          <button onClick={() => editor.chain().focus().deleteRow().run()}>
            deleteRow
          </button>
          <button onClick={() => editor.chain().focus().deleteTable().run()}>
            deleteTable
          </button>
          <button onClick={() => editor.chain().focus().mergeCells().run()}>
            mergeCells
          </button>
          <button onClick={() => editor.chain().focus().splitCell().run()}>
            splitCell
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          >
            toggleHeaderColumn
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          >
            toggleHeaderRow
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderCell().run()}
          >
            toggleHeaderCell
          </button>
          <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
            mergeOrSplit
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setCellAttribute("colspan", 2).run()
            }
          >
            setCellAttribute
          </button>
          <button onClick={() => editor.chain().focus().fixTables().run()}>
            fixTables
          </button>
          <button onClick={() => editor.chain().focus().goToNextCell().run()}>
            goToNextCell
          </button>
          <button
            onClick={() => editor.chain().focus().goToPreviousCell().run()}
          >
            goToPreviousCell
          </button> */}
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
    </Container>
  );
};

export default Editor;
