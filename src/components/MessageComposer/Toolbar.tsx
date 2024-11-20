import {
  type Editor,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowLeftToLine,
  ArrowRightToLine,
  Type,
  Palette,
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor | null;
}

const FONT_FAMILIES = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Arial', value: 'Arial' },
  { name: 'Times New Roman', value: 'Times New Roman' },
  { name: 'Courier New', value: 'Courier New' },
];

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Gray', value: '#666666' },
  { name: 'Red', value: '#ff0000' },
  { name: 'Blue', value: '#0000ff' },
  { name: 'Green', value: '#00ff00' },
];

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-t border-b border-gray-200 dark:border-gray-700 p-2 flex items-center space-x-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('bold') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('italic') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('underline') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <Underline className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('bulletList') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <List className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('orderedList') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <AlignLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <AlignCenter className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
      >
        <AlignRight className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowRightToLine className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowLeftToLine className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <select
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <option value="">Font Family</option>
        {FONT_FAMILIES.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <option value="">Text Color</option>
        {COLORS.map((color) => (
          <option key={color.value} value={color.value}>
            {color.name}
          </option>
        ))}
      </select>
    </div>
  );
}