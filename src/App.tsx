import { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { EmailList } from './components/EmailList/EmailList';
import { EmailDetail } from './components/EmailDetail/EmailDetail';

const emails = [
  {
    id: 1,
    sender: "Sarah Johnson",
    subject: "Q4 Marketing Strategy Review",
    preview: "I've reviewed the proposed marketing strategy for Q4 and have some thoughts...",
    time: "10:30 AM",
    unread: true,
    important: true
  },
  {
    id: 2,
    sender: "Alex Chen",
    subject: "Project Timeline Update",
    preview: "Based on our recent progress, I've updated the project timeline...",
    time: "9:15 AM",
    unread: true,
    important: false
  },
  {
    id: 3,
    sender: "Marketing Team",
    subject: "Campaign Results - September",
    preview: "Here are the results from our September email campaign...",
    time: "Yesterday",
    unread: false,
    important: true
  }
];

function App() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  return (
    <div className="h-screen flex">
      <Sidebar />
      <EmailList 
        emails={emails}
        selectedEmail={selectedEmail}
        onSelectEmail={setSelectedEmail}
      />
      <EmailDetail selectedEmail={selectedEmail} />
    </div>
  );
}

export default App;