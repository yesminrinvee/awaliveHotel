
const HotelVideo = () => {
  return (
    <section className="max-w-[1080px] mx-auto py-10">
      <div className="relative overflow-hidden pb-[56.25%] md:pb-[40.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/2AD40BCejhI?autoplay=1&loop=1&playlist=2AD40BCejhI&si=GHalrh97fQnIpMFD"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default HotelVideo;
