import { FC, ReactElement, useState, useRef, useEffect } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate, useParams } from 'react-router';
import { useTeamById, useTeamMessages, useSendMessage, useDeleteMessage, useAuthStore } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

const TeamChatPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: teamData } = useTeamById(teamId || '');
  const { data: messages, isLoading } = useTeamMessages(teamId || '');
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage(teamId || '');
  const { mutateAsync: deleteMessage } = useDeleteMessage(teamId || '');

  const team = teamData?.data;
  const currentUserId = session?.user?.id;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    try {
      await sendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await deleteMessage(messageId);
      toast.success('Message deleted');
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast.error('Failed to delete message');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInMins < 1440) return `${Math.floor(diffInMins / 60)}h ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b dark:border-neutral-700 shadow-sm dark:shadow-neutral-950/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Chat</h1>
              <p className="text-gray-600 dark:text-neutral-400 text-sm mt-0.5">{team?.name}</p>
            </div>
            <Button variant="secondary" onClick={() => navigate(`/teams/${teamId}`)}>
              Back to Team
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-primary-400"></div>
            </div>
          ) : messages && messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isOwnMessage = msg.user_id === currentUserId;
                const isLeader = team?.leader_id === currentUserId;
                const canDelete = isOwnMessage || isLeader;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-lg ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {msg.user?.avatar ? (
                          <img
                            src={msg.user.avatar}
                            alt={msg.user.fullname}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            {msg.user?.fullname?.charAt(0) || '?'}
                          </div>
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className={`flex-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900 dark:text-white">
                              {isOwnMessage ? 'You' : msg.user?.fullname}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-neutral-500">
                              {formatTime(msg.created_at)}
                            </span>
                          </div>
                          <div
                            className={`relative group rounded-2xl px-4 py-2.5 ${
                              isOwnMessage
                                ? 'bg-blue-600 dark:bg-primary-600 text-white'
                                : 'bg-white dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-200 dark:border-neutral-700'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>

                            {/* Delete button */}
                            {canDelete && (
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className={`absolute top-1 ${isOwnMessage ? 'left-1' : 'right-1'} opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 ${isOwnMessage ? 'hover:bg-blue-700 dark:hover:bg-primary-700' : ''}`}
                                title="Delete message"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No messages yet
              </h3>
              <p className="text-gray-600 dark:text-neutral-400">
                Be the first to start the conversation!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-neutral-900 border-t dark:border-neutral-700 shadow-lg dark:shadow-neutral-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-primary-500 focus:border-transparent"
              disabled={isSending}
            />
            <Button
              type="submit"
              disabled={!message.trim() || isSending}
              className="px-6 py-3"
            >
              {isSending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamChatPage;
