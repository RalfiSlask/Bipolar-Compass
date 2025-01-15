const SpotifyPlayer = () => {
  return (
    <iframe
      title="Spotify Embed: Recommendation Playlist "
      src={`https://open.spotify.com/embed/playlist/2T33MKoZWrxVmA9ynmDMQ4?utm_source=generator&theme=0`}
      height="100%"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="w-full h-full bg-blue rounded-2xl max-w-[500px] min-h-[450px] shadow-shadow-medium"
    />
  );
};

export default SpotifyPlayer;
