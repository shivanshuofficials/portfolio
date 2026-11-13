"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  RotateCcw,
} from "lucide-react";

async function uploadToImageKit(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: fd,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Image upload failed");
  }
  return data.url;
}

export { uploadToImageKit };

interface PostMeta {
  _id: string;
  title: string;
  slug: string;
}

function LinkModal({ editor, onClose }: { editor: ReturnType<typeof useEditor>; onClose: () => void }) {
  const [tab, setTab] = useState<"internal" | "external">("internal");
  const [url, setUrl] = useState(editor?.getAttributes("link").href || "");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/api/admin/posts")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(() => {});
  }, []);

  const apply = (href: string) => {
    if (!editor) return;
    if (!href) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    onClose();
  };

  const shown = posts.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())).slice(0, 8);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 border-b border-zinc-800 pb-3">
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              tab === "internal" ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            }`}
            onClick={() => setTab("internal")}
          >
            Internal Post Link
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              tab === "external" ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            }`}
            onClick={() => setTab("external")}
          >
            External URL
          </button>
        </div>

        {tab === "internal" ? (
          <div className="space-y-3">
            <input
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              placeholder="Search existing posts..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
            />
            <div className="max-h-60 overflow-y-auto space-y-1.5">
              {shown.map((p) => (
                <div
                  key={p._id}
                  className="p-2.5 rounded-lg hover:bg-zinc-800/70 border border-transparent hover:border-zinc-700 cursor-pointer transition text-left"
                  onClick={() => apply(`/blog/${p.slug}`)}
                >
                  <p className="text-sm font-medium text-zinc-200">{p.title}</p>
                  <span className="text-xs text-zinc-500">/blog/{p.slug}</span>
                </div>
              ))}
              {shown.length === 0 && <p className="text-xs text-zinc-500 py-4 text-center">No matching posts found.</p>}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-xs font-medium bg-zinc-100 text-zinc-900 rounded-lg hover:bg-white transition"
                onClick={() => apply(url)}
              >
                Insert Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Editor({
  value,
  onChange,
  onImportTitle,
}: {
  value: string;
  onChange: (html: string) => void;
  onImportTitle?: (title: string) => void;
}) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: false,
        underline: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-rose-400 underline decoration-rose-400/50 hover:decoration-rose-400" },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({
        inline: false,
        HTMLAttributes: { class: "rounded-xl my-6 w-full border border-zinc-800 shadow-lg object-cover" },
      }),
      Placeholder.configure({ placeholder: "Write your masterpiece story or thoughts here..." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[380px] p-6 text-zinc-300 leading-relaxed",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (editor && editor.getText().trim() && !confirm("Importing will replace current document content. Continue?")) {
      e.target.value = "";
      return;
    }
    setImporting(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/import", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      editor.commands.setContent(data.html);
      onChange(data.html);
      if (onImportTitle && data.title) onImportTitle(data.title);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to import file";
      alert(msg);
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadToImageKit(file);
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Image upload failed";
      alert(msg);
    } finally {
      e.target.value = "";
    }
  }

  const currentHeading = () => {
    if (editor.isActive("heading", { level: 1 })) return "1";
    if (editor.isActive("heading", { level: 2 })) return "2";
    if (editor.isActive("heading", { level: 3 })) return "3";
    if (editor.isActive("heading", { level: 4 })) return "4";
    return "p";
  };

  const applyHeading = (val: string) => {
    if (val === "p") editor.chain().focus().setParagraph().run();
    else {
      const level = Number(val) as 1 | 2 | 3 | 4;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const toolBtn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-2 rounded-lg text-xs flex items-center justify-center transition ${
        active ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Sticky Top Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 bg-zinc-900/90 border-b border-zinc-800 sticky top-0 z-20">
        <select
          value={currentHeading()}
          onChange={(e) => applyHeading(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-zinc-500 cursor-pointer"
        >
          <option value="p">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
        </select>

        <div className="h-5 w-[1px] bg-zinc-800 mx-1" />

        {toolBtn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <Bold size={15} />, "Bold")}
        {toolBtn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <Italic size={15} />, "Italic")}
        {toolBtn(editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), <UnderlineIcon size={15} />, "Underline")}
        {toolBtn(editor.isActive("strike"), () => editor.chain().focus().toggleStrike().run(), <Strikethrough size={15} />, "Strikethrough")}

        <div className="h-5 w-[1px] bg-zinc-800 mx-1" />

        {/* Text Colors */}
        <label className="relative flex items-center cursor-pointer p-1 rounded hover:bg-zinc-800" title="Text Color">
          <input
            type="color"
            className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </label>
        <label className="relative flex items-center cursor-pointer p-1 rounded hover:bg-zinc-800" title="Highlight Color">
          <input
            type="color"
            className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
            onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
          />
        </label>
        <button
          type="button"
          title="Reset Color & Formatting"
          onClick={() => editor.chain().focus().unsetHighlight().unsetColor().run()}
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg"
        >
          <RotateCcw size={14} />
        </button>

        <div className="h-5 w-[1px] bg-zinc-800 mx-1" />

        {toolBtn(editor.isActive({ textAlign: "left" }), () => editor.chain().focus().setTextAlign("left").run(), <AlignLeft size={15} />, "Align Left")}
        {toolBtn(editor.isActive({ textAlign: "center" }), () => editor.chain().focus().setTextAlign("center").run(), <AlignCenter size={15} />, "Align Center")}
        {toolBtn(editor.isActive({ textAlign: "right" }), () => editor.chain().focus().setTextAlign("right").run(), <AlignRight size={15} />, "Align Right")}
        {toolBtn(editor.isActive({ textAlign: "justify" }), () => editor.chain().focus().setTextAlign("justify").run(), <AlignJustify size={15} />, "Align Justify")}

        <div className="h-5 w-[1px] bg-zinc-800 mx-1" />

        {toolBtn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <List size={15} />, "Bullet List")}
        {toolBtn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={15} />, "Numbered List")}
        {toolBtn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote size={15} />, "Quote")}

        <div className="h-5 w-[1px] bg-zinc-800 mx-1" />

        {toolBtn(editor.isActive("link"), () => setLinkOpen(true), <LinkIcon size={15} />, "Link")}
        {toolBtn(false, () => imgRef.current?.click(), <ImageIcon size={15} />, "Upload Image to ImageKit")}

        {/* File Import */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={importing}
          className="ml-auto px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition"
        >
          <Upload size={13} />
          {importing ? "Importing…" : "Import (.docx, .pdf, .md, .txt)"}
        </button>

        <input ref={fileRef} type="file" accept=".docx,.pdf,.txt,.md,.html,.htm" className="hidden" onChange={handleImport} />
        <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
      </div>

      {/* Editor Content Area */}
      <div className="min-h-[440px] bg-zinc-950/40">
        <EditorContent editor={editor} />
      </div>

      {linkOpen && <LinkModal editor={editor} onClose={() => setLinkOpen(false)} />}
    </div>
  );
}
