'use client';

import { questionSuggestions } from '@/app/data/chatSuggestions';
import { IMessage } from '@/app/types/chat';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { BiReset, BiSend, BiUser, BiWindowAlt } from 'react-icons/bi';
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, typing, displayedAnswer]);

  useEffect(() => {
    const newUserId = uuidv4();
    setUserId(newUserId);
    setConversationHistory([
      {
        role: 'system',
        content: `👋 Hej! Jag är Bipo, din guide för frågor om bipolaritet. Vad kan jag hjälpa dig med idag?`,
      },
    ]);
    setHasInteracted(true);
  }, []);

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
    } catch (err) {
      console.error('Error resetting conversation:', err);
    }
  };

  useEffect(() => {
    console.log(conversationHistory);
  }, [conversationHistory]);

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

  return (
    <>
      {chatOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-200"
            onClick={() => setChatOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-full max-w-[1000px] sm:px-4">
            <div
              className="bg-gradient-to-br from-primary-dark to-secondary-dark flex flex-col w-full gap-8 p-3 sm:p-4 md:p-6 lg:p-8 
         min-h-[500px] 
         sm:max-h-[95vh]
         h-[100vh]
         max-h-[100vh]
         sm:h-[min(95vh,1000px)] 
         sm:min-h-[600px] 
         rounded-[15px] sm:rounded-[25px] shadow-xl border border-primary-border/30 relative overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <div className="text-white w-14 h-14">
                  <CompassIcon />
                </div>
                <button
                  className=" bg-primary-medium/20 hover:bg-primary-medium/40 p-2 rounded-lg text-white transition-all duration-300 ease group"
                  onClick={() => setChatOpen(false)}
                  title="Minimera fönster"
                >
                  <BiWindowAlt className="text-2xl group-hover:scale-95 transition-transform" />
                </button>
              </div>

              <div className="max-w-[800px] mx-auto w-full">
                <div className="text-white">
                  <ChatDescription />
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 flex-1 w-full max-w-[800px] mx-auto overflow-hidden">
                <div
                  className="bg-white rounded-[10px] sm:rounded-[15px] w-full pl-3 sm:pl-6 py-4 sm:py-6 pr-2 sm:pr-4 md:pr-12 
             overflow-y-auto shadow-inner border 
             border-primary-border/30 
             flex-1 min-h-0
           "
                >
                  {hasInteracted && (
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
                            className={`bg-${
                              msg.role === 'user' ? 'primary-medium' : ''
                            } rounded-full flex items-center justify-center ${
                              msg.role === 'user'
                                ? 'h-[35px] w-[35px] mt-1'
                                : 'h-[60px] w-[60px] sm:h-[60px] sm:w-[60px]'
                            } text-white font-medium shrink-0`}
                          >
                            {msg.role === 'user' ? (
                              <BiUser className="text-lg" />
                            ) : (
                              <div className="w-[60px] h-[60px] sm:h-[60px] sm:w-[60px] flex items-center justify-center">
                                <Image
                                  src={BotIcon}
                                  alt="Bipo"
                                  width={60}
                                  height={60}
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <p
                            className={`text-sm sm:text-base text-dark leading-relaxed pt-2 ${
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
                  <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:items-start">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-4 w-full">
                      {questionSuggestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleQuestionSuggestionClick(question)
                          }
                          className="text-sm sm:text-base bg-primary-medium hover:bg-primary-accent text-dark font-medium cursor-pointer transition-all duration-300 ease outline-none rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-md hover:shadow-lg active:scale-95"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                    <button
                      className="text-sm sm:text-base bg-primary-medium hover:bg-primary-accent text-dark font-medium cursor-pointer transition-all duration-300 ease outline-none rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
                      onClick={resetConversation}
                    >
                      <BiReset
                        className="text-xl text-white"
                        title="Rensa chatten"
                        aria-label="Rensa chatten"
                      />
                    </button>
                  </div>
                  <form
                    className="flex flex-col sm:flex-row items-center gap-4"
                    onSubmit={handleClickAndSendChatMessage}
                  >
                    <input
                      onChange={handleMessageOnChange}
                      type="text"
                      id="chat"
                      className="w-full px-4 sm:px-6 py-3 mt-4 sm:py-4 rounded-full bg-white border border-primary-border/30 focus:border-primary-medium focus:ring-2 focus:ring-primary-medium/20 focus:outline-none shadow-sm placeholder:text-dark/60 text-sm sm:text-base"
                      placeholder="Skriv ditt meddelande till Bipo..."
                      value={message}
                    />
                    <button
                      type="submit"
                      className="icon-container bg-primary-medium hover:bg-primary-accent text-white cursor-pointer transition-all duration-300 ease outline-none rounded-full p-3 sm:p-4 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <BiSend className="text-xl sm:text-2xl" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="fixed right-8 bottom-12">
            {showTooltip && (
              <div className="absolute right-0 bottom-12 mb-2 pointer-events-none whitespace-nowrap">
                <div className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg opacity-100 translate-y-0 transition-all duration-300 ease-out relative">
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
