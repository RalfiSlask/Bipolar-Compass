'use client';

import { questionSuggestions } from '@/app/data/chatSuggestions';
import { IMessage } from '@/app/types/chat';
import Image from 'next/image';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { BiSend, BiTrash, BiUser, BiWindowAlt } from 'react-icons/bi';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import BotIcon from '../../assets/icons/bot.svg';
import CompassIcon from '../shared/icons/CompassIcon';
import ChatDescription from './ChatDescription';
import TypingIndicator from './TypingIndicator';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [typing, setTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<IMessage[]>(
    []
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, typing, displayedAnswer]);

  useEffect(() => {
    const newUserId = uuidv4();
    setUserId(newUserId);
    setHasInteracted(true);
  }, []);

  useEffect(() => {
    let scrollY = 0;

    if (chatOpen) {
      if (window.innerWidth < 768) {
        scrollY = window.scrollY || document.documentElement.scrollTop || 0;

        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;

        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
      } else {
        document.body.style.overflow = 'auto';
      }

      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    } else {
      if (window.innerWidth < 768) {
        const savedScrollY = parseInt(document.body.style.top || '0', 10) * -1;

        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';

        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';

        window.scrollTo(0, savedScrollY);
      }
    }
  }, [chatOpen]);

  const handleMessageOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target === null) return;
    setMessage(target.value);
  };

  const handleClickAndSendChatMessage = async (e: FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);

    const userMessage: IMessage = {
      role: 'user' as const,
      content: message,
    };
    setConversationHistory((prev) => [...prev, userMessage]);

    setMessage('');
    await sendChatMessageToServer(userMessage);
  };

  const resetConversation = async () => {
    try {
      await fetch('/api/ai/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      setConversationHistory([]);
      toast.success('Konversationen har rensats');
    } catch (err) {
      toast.error('Konversationen kunde inte rensas');
      console.error('Error resetting conversation:', err);
    }
  };

  const sendChatMessageToServer = async (userMessage: IMessage) => {
    try {
      setTyping(true);
      const response = await fetch('/api/ai/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          userId: userId,
        }),
      });

      if (!response.ok) {
        setTyping(false);
        return;
      }

      const { answer, context } = await response.json();

      const botResponse = context[context.length - 1];

      setTyping(false);

      setConversationHistory((prev) => [
        ...prev,
        {
          role: 'system' as const,
          content: botResponse.content,
        },
      ]);

      setAnswer(answer);
    } catch (err) {
      console.log(err, 'error');
      setTyping(false);
    }
  };

  useEffect(() => {
    setDisplayedAnswer('');
  }, [answer]);

  useEffect(() => {
    if (typing || answer === displayedAnswer) return;

    const timerId = setTimeout(() => {
      setDisplayedAnswer((prev) => answer.slice(0, prev.length + 1));
    }, 20);

    return () => clearTimeout(timerId);
  }, [displayedAnswer, answer, typing]);

  const handleQuestionSuggestionClick = (question: string) => {
    setMessage(question);
  };

  const memoizedSuggestions = useMemo(() => questionSuggestions, []);

  return (
    <>
      {chatOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-200"
            onClick={() => setChatOpen(false)}
            aria-hidden="true"
          />
          <div
            className="chat-container fixed z-[999] sm:z-[130] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-full max-w-[1000px] md:px-4"
            aria-modal="true"
            aria-label="Ai chat"
            aria-describedby="Ai chat"
          >
            <div className="fixed z-[130] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-full max-w-[1000px] sm:px-4">
              <div
                className="bg-primary-dark flex flex-col w-full gap-4 md:gap-8 p-3 sm:p-4 md:p-6 lg:p-8 
         min-h-[500px] 
         md:max-h-[95vh]
         h-[calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))]
         max-h-[100vh]
         md:h-[min(95vh,1000px)] 
         md:min-h-[600px] 
         md:rounded-[25px] shadow-xl border-none sm:border border-primary-border/30 relative overflow-y-auto"
              >
                <div className="flex justify-between items-center">
                  <div className="text-white h-10 sm:w-14 sm:h-14 w-[90px] flex justify-start items-center">
                    <div className="w-[50px] h-[50px] sm:h-[60px] sm:w-[60px] flex items-center justify-center">
                      <CompassIcon />
                    </div>
                  </div>
                  <h2 className="text-white text-xl font-semibold sm:hidden">
                    Bipo
                  </h2>
                  <div className="flex items-center gap-3 w-[90px]">
                    <div className="flex items-center gap-3">
                      <button
                        className="bg-primary-medium/20 hover:bg-primary-medium/40 p-2 rounded-lg text-white transition-all duration-300 ease group"
                        onClick={resetConversation}
                        title="Rensa konversation"
                      >
                        <BiTrash className="text-xl sm:text-2xl group-hover:scale-95 transition-transform" />
                      </button>
                      <button
                        className="bg-primary-medium/20 hover:bg-primary-medium/40 p-2 rounded-lg text-white transition-all duration-300 ease group"
                        onClick={() => setChatOpen(false)}
                        title="Minimera fönster"
                      >
                        <BiWindowAlt className="text-xl sm:text-2xl group-hover:scale-95 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 flex-1 w-full max-w-[800px] mx-auto overflow-hidden">
                  <div
                    className="bg-primary-dark  rounded-[10px] sm:rounded-[15px] w-full pl-3 sm:pl-6 py-4 sm:py-6 pr-2 sm:pr-4 md:pr-12 
             overflow-y-auto shadow-inner 
             sm:border sm:border-primary-border/30 
             flex-1 min-h-0
           "
                  >
                    {!hasInteracted || conversationHistory.length === 0 ? (
                      <div className="flex flex-col items-center h-full pt-20 sm:pt-30 md:pt-40">
                        <div className="w-[80px] h-[80px] border border-white/10  rounded-full flex items-center justify-center">
                          <Image
                            src={BotIcon}
                            alt="Bipo"
                            width={120}
                            height={120}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 sm:gap-4">
                        {conversationHistory.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex gap-2 sm:gap-4 items-start ${
                              msg.role === 'user'
                                ? 'flex-row-reverse ml-auto'
                                : ''
                            }`}
                          >
                            <div
                              className={`text-white bg-${
                                msg.role === 'user' ? 'primary-medium' : ''
                              } rounded-full flex items-center justify-center ${
                                msg.role === 'user'
                                  ? 'h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] mt-1'
                                  : 'h-[40px] w-[40px] sm:h-[60px] sm:w-[60px]'
                              } text-white font-medium shrink-0`}
                            >
                              {msg.role === 'user' ? (
                                <BiUser className="text-base sm:text-lg" />
                              ) : (
                                <div className="rounded-full border border-white/10 w-[40px] h-[40px] sm:h-[60px] sm:w-[60px] flex items-center justify-center">
                                  <Image
                                    src={BotIcon}
                                    alt="Bipo"
                                    width={40}
                                    height={40}
                                    className="object-cover sm:w-[60px] sm:h-[60px]"
                                  />
                                </div>
                              )}
                            </div>
                            <p
                              className={`text-sm sm:text-base ${
                                !chatOpen ? 'text-white' : 'text-white'
                              }  pt-2 ${
                                msg.role === 'user' ? 'text-right' : 'text-left'
                              }`}
                            >
                              {index === conversationHistory.length - 1 &&
                              msg.role === 'system' &&
                              answer !== ''
                                ? displayedAnswer
                                : msg.content}
                            </p>
                          </div>
                        ))}
                        {typing && <TypingIndicator aria-label="Typing..." />}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div
                      className={`${
                        message ? 'hidden' : 'block'
                      } sm:hidden mb-4`}
                    >
                      <div className="flex overflow-x-auto hide-scrollbar items-center gap-2 sm:gap-4 w-full">
                        {memoizedSuggestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleQuestionSuggestionClick(question.text)
                            }
                            className="text-sm bg-primary-medium/20 hover:bg-primary-accent text-white font-medium cursor-pointer transition-all duration-300 ease outline-none rounded-full px-3 py-1.5 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap flex items-center gap-2"
                          >
                            {question.icon && (
                              <question.icon
                                className="text-lg"
                                style={{ color: question.iconColor }}
                              />
                            )}
                            {question.text}
                          </button>
                        ))}
                      </div>
                    </div>
                    {message ? null : (
                      <div className="hidden md:block max-w-[800px] mx-auto w-full">
                        <div className="text-white mb-4">
                          <ChatDescription />
                        </div>
                      </div>
                    )}
                    <form
                      className="flex flex-row items-center gap-2 sm:gap-4 mb-4"
                      onSubmit={handleClickAndSendChatMessage}
                    >
                      <input
                        ref={inputRef}
                        onChange={handleMessageOnChange}
                        type="text"
                        id="chat"
                        className="w-full px-4 sm:px-6 py-2.5 sm:py-4 rounded-full bg-primary-medium/20  border-primary-border/30 focus:border-primary-medium focus:ring-2 focus:ring-primary-medium/20 focus:outline-none shadow-sm placeholder:text-white/60  text-white  text-sm sm:text-base"
                        placeholder="Skriv ditt meddelande till Bipo..."
                        value={message}
                      />
                      <button
                        disabled={typing || !message.trim()}
                        type="submit"
                        className="icon-container bg-primary-medium hover:bg-primary-accent text-white cursor-pointer transition-all duration-300 ease outline-none rounded-full p-3 sm:p-4 shadow-md hover:shadow-lg active:scale-95"
                      >
                        <BiSend className="text-xl sm:text-2xl" />
                      </button>
                    </form>
                    <div className={`${message ? 'hidden' : 'block'} sm:block`}>
                      <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-4 w-full mt-6">
                        {memoizedSuggestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleQuestionSuggestionClick(question.text)
                            }
                            className="text-sm bg-primary-medium/20 hover:bg-primary-accent text-white font-medium cursor-pointer transition-all duration-300 ease outline-none rounded-full px-3 py-1.5 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap flex items-center gap-2"
                          >
                            {question.icon && (
                              <question.icon
                                className="text-lg"
                                style={{ color: question.iconColor }}
                              />
                            )}
                            {question.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="fixed right-8 bottom-12 z-50">
            {showTooltip && (
              <div className="absolute right-0 bottom-12 mb-2 pointer-events-none whitespace-nowrap">
                <div className="bg-black/80 text-white px-4 py-2  rounded-lg shadow-lg opacity-100 translate-y-0 transition-all duration-300 ease-out relative">
                  👋 Hej! Chatta med vår AI om bipolaritet
                  <div
                    className="absolute right-4 top-full w-0 h-0 
                      border-l-8 border-l-transparent 
                      border-r-8 border-r-transparent
                      border-t-8 border-t-black/80"
                  ></div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <div className="fixed right-8 bottom-8 z-30">
        <button
          title="Öppna chat"
          onClick={() => setChatOpen(true)}
          className="relative flex items-center justify-center bg-primary-dark hover:bg-primary-medium text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease"
          aria-label="Öppna chat"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <BsFillChatSquareDotsFill className="mt-1 text-3xl hover:scale-110 transition-transform" />
        </button>
      </div>
    </>
  );
};

export default Chat;
