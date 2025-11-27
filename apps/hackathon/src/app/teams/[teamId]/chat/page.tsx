import { FC, ReactElement, useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate, useParams } from 'react-router';
import {
  useTeamById,
  useTeamMessages,
  useSendMessage,
  useDeleteMessage,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';

const TeamChatPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: teamData } = useTeamById(teamId || '');
  const { data: messages, isLoading } = useTeamMessages(teamId || '');
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage(
    teamId || ''
  );
  const { mutateAsync: deleteMessage } = useDeleteMessage(teamId || '');

  const team = teamData?.data;
  const currentUserId = session?.user?.id;

  // Message type used for UI rendering
  interface ChatMessage {
    id: string;
    user_id: string;
    user?: {
      avatar?: string;
      fullname?: string;
    };
    message: string;
    created_at: string;
  }

  // Inline delete confirmation UI state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Prepare messages: de-duplicate by id and sort by created_at
  const displayMessages = useMemo(() => {
    const raw: ChatMessage[] = Array.isArray(messages)
      ? (messages as ChatMessage[])
      : [];
    const seen = new Set<string>();
    const dedup: ChatMessage[] = [];
    for (const m of raw) {
      const key = m.id ?? `${m.user_id}-${m.created_at}`;
      if (!seen.has(key)) {
        seen.add(key);
        dedup.push(m);
      }
    }
    dedup.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    return dedup;
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages]);

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
    try {
      await deleteMessage(messageId);
      toast.success('Message deleted');
      setDeleteTargetId(null);
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
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm dark:shadow-gray-950/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Team Chat
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
                {team?.name}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate(`/teams/${teamId}`)}
            >
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
          ) : displayMessages && displayMessages.length > 0 ? (
            <div className="space-y-4">
              {displayMessages.map((msg) => {
                const isOwnMessage = msg.user_id === currentUserId;
                const isLeader = team?.leader_id === currentUserId;
                const canDelete = isOwnMessage || isLeader;

                return (
                  <div
                    key={`${msg.id ?? 'message'}-${msg.created_at}`}
                    className={`flex ${
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-lg ${
                        isOwnMessage ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div className="shrink-0">
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
                      <div className={`flex-1 text-left`}>
                        <div
                          className={`inline-block ${
                            isOwnMessage ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900 dark:text-white">
                              {isOwnMessage ? 'You' : msg.user?.fullname}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {formatTime(msg.created_at)}
                            </span>
                          </div>
                          <div
                            className={`relative group rounded-2xl px-4 py-2.5 ${
                              isOwnMessage
                                ? 'bg-blue-600 dark:bg-primary-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap wrap-break-word font-sans">
                              {msg.message}
                            </p>

                            {/* Delete button */}
                            {canDelete && (
                              <button
                                onClick={() =>
                                  setDeleteTargetId(
                                    deleteTargetId === msg.id ? null : msg.id
                                  )
                                }
                                className={`absolute top-1 ${
                                  isOwnMessage ? 'left-1' : 'right-1'
                                } opacity-0 hover:opacity-100 p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer ${
                                  isOwnMessage
                                    ? 'hover:bg-blue-700 dark:hover:bg-primary-700'
                                    : ''
                                }`}
                                title="Delete message"
                              >
                                {/* Icon trash */}
                                <Icon
                                  icon="mdi:trash-can-outline"
                                  className="w-4 h-4"
                                />
                              </button>
                            )}
                          </div>
                          {canDelete && deleteTargetId === msg.id && (
                            <div
                              className={`mt-2 flex gap-2 ${
                                isOwnMessage ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setDeleteTargetId(null)}
                                className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
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
              <Icon
                icon="mdi:chat-outline"
                className="text-6xl mb-4 text-gray-400"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No messages yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                Be the first to start the conversation!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg dark:shadow-gray-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-primary-500 focus:border-transparent"
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
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
