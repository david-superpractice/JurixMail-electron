import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import { Toolbar } from './Toolbar';
import { MessageHeader } from './MessageHeader';

interface MessageComposerProps {
  onSend?: (content: string) => void;
  onCancel?: () => void;
  replyTo?: string;
  subject?: string;
  defaultContent?: string;
  mode?: 'new' | 'reply' | 'forward';
}

export function MessageComposer({
  onSend,
  onCancel,
  replyTo,
  subject,
  defaultContent = '',
  mode = 'new'
}: MessageComposerProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      FontFamily,
    ],
    content: defaultContent.split('\n').map(line => `<p class="my-0.5">${line || '<br/>'}</p>`).join(''),
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] whitespace-pre-wrap [&_p]:my-0.5',
      },
    },
  });

  const handleSend = () => {
    if (editor && onSend) {
      onSend(editor.getHTML());
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <MessageHeader 
        mode={mode}
        replyTo={replyTo}
        subject={subject}
      />
      
      <Toolbar editor={editor} />

      <div className="flex-1 p-4 overflow-auto">
        <EditorContent editor={editor} />
      </div>

      <div className="p-4 border-t border-gray-200 flex justify-between">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <div className="flex space-x-2">
          <button
            onClick={handleSend}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}