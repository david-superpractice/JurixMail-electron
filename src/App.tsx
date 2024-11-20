import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { EmailList } from './components/EmailList/EmailList';
import { EmailDetail } from './components/EmailDetail/EmailDetail';
import { MessageComposer } from './components/MessageComposer/MessageComposer';
import { Calendar } from './components/Calendar/Calendar';

const emails = [
  {
    id: 1,
    sender: "Sarah Johnson",
    subject: "Q4 Marketing Strategy Review",
    preview: "I've reviewed the proposed marketing strategy for Q4 and have some thoughts...",
    time: "10:30 AM",
    unread: true,
    important: true,
    content: `Hi Team,

I've reviewed the proposed marketing strategy for Q4 and have some thoughts I'd like to share. Overall, the direction looks solid, but there are a few areas where I think we can make improvements.

Can we schedule a meeting to discuss these points in detail? I'm available tomorrow afternoon.

Best regards,
Sarah`
  },
  {
    id: 2,
    sender: "Alex Chen",
    subject: "Project Timeline Update",
    preview: "Based on our recent progress, I've updated the project timeline...",
    time: "9:15 AM",
    unread: true,
    important: false,
    content: `Hello everyone,

Based on our recent progress, I've updated the project timeline. Please review and let me know if you have any concerns.

Best,
Alex`
  },
  {
    id: 3,
    sender: "Marketing Team",
    subject: "Campaign Results - September",
    preview: "Here are the results from our September email campaign...",
    time: "Yesterday",
    unread: false,
    important: true,
    content: `Team,

Here are the results from our September email campaign. We've seen a significant improvement in engagement rates.

Regards,
Marketing Team`
  }
];

function App() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [showComposer, setShowComposer] = useState(false);
  const [composerMode, setComposerMode] = useState<'new' | 'reply' | 'forward' | null>(null);
  const [replyTo, setReplyTo] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [defaultContent, setDefaultContent] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        handleNewMessage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNewMessage = () => {
    setComposerMode('new');
    setReplyTo('');
    setSubject('');
    setDefaultContent('');
    setShowComposer(true);
  };

  const handleCloseComposer = () => {
    setShowComposer(false);
    setComposerMode(null);
    setDefaultContent('');
  };

  const handleReply = (type: 'reply' | 'replyAll' | 'forward') => {
    const email = emails.find(e => e.id === selectedEmail);
    if (!email) return;

    const mode = type === 'forward' ? 'forward' : 'reply';
    setComposerMode(mode);
    setReplyTo(email.sender);
    
    const baseSubject = email.subject.replace(/^(Re: |Fwd: )*/, '');
    const prefix = mode === 'forward' ? 'Fwd: ' : 'Re: ';
    setSubject(prefix + baseSubject);

    const date = new Date().toLocaleString();
    const threadContent = mode === 'forward' 
      ? `\n\n---------- Forwarded message ---------\nFrom: ${email.sender}\nDate: ${date}\nSubject: ${email.subject}\n\n${email.content}`
      : `\n\nOn ${date}, ${email.sender} wrote:\n${email.content.split('\n').join('\n')}`;

    setDefaultContent(threadContent);
    setShowComposer(true);
  };

  const handleCalendarClick = () => {
    setShowCalendar(true);
  };

  return (
    <div className="h-screen flex">
      <Sidebar onNewMessage={handleNewMessage} onCalendarClick={handleCalendarClick} />
      
      {showCalendar ? (
        <Calendar />
      ) : (
        <>
          <EmailList 
            emails={emails}
            selectedEmail={selectedEmail}
            onSelectEmail={setSelectedEmail}
          />
          <EmailDetail 
            selectedEmail={selectedEmail}
            onReply={() => handleReply('reply')}
            onReplyAll={() => handleReply('replyAll')}
            onForward={() => handleReply('forward')}
          />
        </>
      )}

      {showComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6" style={{ zIndex: 9999 }}>
          <div className="w-full max-w-4xl h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <MessageComposer
              mode={composerMode || 'new'}
              replyTo={replyTo}
              subject={subject}
              defaultContent={defaultContent}
              onCancel={handleCloseComposer}
              onSend={(content) => {
                console.log('Sending email:', content);
                handleCloseComposer();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;