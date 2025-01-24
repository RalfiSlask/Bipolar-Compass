const ChatDescription = () => {
  return (
    <div className="flex items-center gap-1">
      <p className="hidden md:block text-white/90 text-sm sm:text-base">
        👋 Hej! Jag är{' '}
        <span className="font-medium text-tertiary-light">Bipo</span>, din guide
        för frågor om bipolaritet. Vad kan jag hjälpa dig med idag?
      </p>
    </div>
  );
};

export default ChatDescription;
