const Home = () => {
  return (
    <>
      <div className="home-container">
        <article className="all-card-container">
          <div className="card-container">
            <div className="card-text-container">
              <h3 className="card-header">Welcome</h3>
              <p className="card-paragraph">
                to the Ostrobothnia LAN association home page! We are a small
                group of gaming fanatics who are giving people the chance to
                spend weekends gaming and watching tournaments for fame, glory
                and sweet prices!
              </p>
            </div>
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.carpella.fi%2Fassets%2FSlideshow%2F2018%2F02%2F_resampled%2FFillWzE5MjAsOTAwXQ%2F12119935-10153323532143795-1333538565765665767-o.jpg&f=1&nofb=1"
              alt="the Carpella event building"
            />
          </div>
        </article>
      </div>

      <div className="home-container">
        <article className="all-card-container">
          <div className="card-container">
            <img
              src="https://scontent.fqlf1-2.fna.fbcdn.net/v/t1.6435-9/87439888_2675863009133501_8918633614598471680_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9267fe&_nc_eui2=AeE5d3M70qSsJhAIIiN3k_Id3al2aYHaXxTdqXZpgdpfFGw52yMzqbHaDqG2X78wWow&_nc_ohc=eaGyZILhHbUAX_0RqGN&_nc_ht=scontent.fqlf1-2.fna&oh=00_AT9VHIf5sMoN5d-4Ip3E3JJDMQzN6lecqnkXviVSNM4kOQ&oe=6331FEFD"
              alt="the Carpella event building"
            />
            <div className="card-text-container">
              <h3 className="card-header">Hosting</h3>
              <p className="card-paragraph">
                Local Area Network parties since 1995 up to 120 people at a time
                with tournaments including prices like the Playstation 5, game
                copies, and giftcards to electronic stores!
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Home;
