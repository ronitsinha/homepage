var $ = function(id) {
    return document.getElementById(id);
};
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
var CookiePrefix = "ronithomepage_";
var cmdPrefix = "!";
var ssi = 0;
var searchSources = [
    ["g", "https://www.google.com/?gws_rd=ssl#q={Q}", "Google"],
    ["d", "https://duckduckgo.com/?q={Q}", "DuckDuckGo"],
    ["b", "https://www.bing.com/search?q={Q}", "Bing"],
    ["s", "https://us.startpage.com/do/search?query={Q}&prf=d5e8df9006b1f8a90e463eac18371b54", "StartPage"],
    ["r", "https://www.reddit.com/search?q={Q}", "Reddit"],
    ["w", "http://en.wikipedia.org/w/index.php?search={Q}", "Wikipedia"],
    ["y", "https://www.youtube.com/results?search_query={Q}", "YouTube"],
    ["f", "https://filepursuit.com/search/{Q}/", "FilePursuit"],
    ["t", "https://1337x.to/search/{Q}/1/", "1337X"]
];
var svgReddit = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z\"/></svg>";
var svgCode = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z\" /></svg>";
var svgNews = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M21 9.662c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0-9.951c-2.402.204-5.068 1.024-7 1.745v1.933c1.804-.756 4.713-1.6 7-1.794v-1.884zm-18 2.843c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.032c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0-7.054c2.287.194 5.196 1.038 7 1.794v-1.933c-1.932-.72-4.598-1.54-7-1.744v1.883zm9-2.724c-3.063-1.671-7.776-2.755-12-2.963v17c4.289.206 8.195 1.249 12 3 3.805-1.751 7.711-2.794 12-3v-17c-4.224.208-8.937 1.292-12 2.963zm-10-.791c4.264.496 6.86 1.467 9 2.545v12.702c-2.968-1.184-5.939-1.95-9-2.271v-12.976zm20 12.975c-3.061.321-6.032 1.088-9 2.271v-12.701c2.187-1.103 4.757-2.051 9-2.544v12.974z\" /></svg>";
var svgMore = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16 6h-8v-6h8v6zm-10 12h-6v6h6v-6zm18 0h-6v6h6v-6zm-11-7v-3h-2v3h-9v5h2v-3h7v3h2v-3h7v3h2v-5h-9zm2 7h-6v6h6v-6z\" /></svg>";
var svgSocial = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";
var svgDownloads = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.984 11h-2.006c-.057-.557-.143-1.104-.287-1.631l1.82-.862c.245.799.401 1.632.473 2.493zm-3.035-3.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm.039 8.939c-.26.519-.562 1.01-.904 1.473l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787zm-.836-13.238c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm-1.414 16.195c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-3.692 2.021-6.915 5.011-8.647l-1.215-1.599c-3.473 2.103-5.8 5.897-5.8 10.246 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3zm3.258-6.403c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-9.996 5l7-8h-4v-10h-6v10h-4l7 8z\" /></svg>";
var svgStream = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19 12c-.341 0-.673-.033-1-.08v1.08h-2v-1.683c-.749-.356-1.427-.837-2-1.422v3.105h-8v-6h6.294c-.19-.634-.294-1.305-.294-2h-12v19h20v-12.08c-.327.047-.659.08-1 .08zm-15 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-5h-2v-2h2v2zm0-4h-2v-2h2v2zm10 13h-8v-6h8v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2zm-3.711-14.667c.688-1.941 2.534-3.333 4.711-3.333 2.762 0 5 2.239 5 5 0 .285-.029.562-.074.833h-.635c-.474 0-.55-.211-.806-1.025-.186-.589-.493-1.479-1.171-1.479-.689 0-.957.923-1.205 1.669-.137.405-.217.65-.339.65-.116 0-.171-.245-.308-.65-.258-.759-.551-1.669-1.235-1.669-.711 0-1.016.995-1.22 1.628-.147.46-.194.691-.324.691-.111 0-.146-.187-.275-.56-.293-.85-.386-1.755-1.691-1.755h-.428zm8.941 3.334c-.957 0-1.185-.459-1.543-1.485-.221-.636-.245-.864-.373-.864-.126 0-.161.262-.408.964-.216.615-.514 1.379-1.136 1.379-.693 0-.987-.927-1.243-1.698-.142-.427-.177-.622-.3-.622-.115 0-.146.175-.291.598-.265.781-.559 1.722-1.253 1.722-.687 0-1-.926-1.171-1.479-.252-.818-.297-1.014-.755-1.014h-.684c-.044.27-.073.547-.073.832 0 2.761 2.238 5 5 5 2.177 0 4.022-1.392 4.709-3.333h-.479z\" /></svg>";
var svgCloud = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 21v-6h-18v6h18zm-3-4c.553 0 1 .448 1 1s-.447 1-1 1c-.552 0-1-.448-1-1s.448-1 1-1zm-7.806 0h1.275l-.864 2h-1.274l.863-2zm-2.141 0h1.275l-.863 2h-1.275l.863-2zm-2.19 0h1.275l-.863 2h-1.275l.863-2zm-4.863.941c-2.253-.29-4-2.194-4-4.524 0-2.252 1.626-4.121 3.767-4.506.177-3.294 2.895-5.911 6.233-5.911s6.056 2.617 6.233 5.911c2.005.361 3.541 2.029 3.729 4.089h-1.991c-.279-2.105-2.674-2.333-3.65-2.401.117-1.958-.555-5.599-4.321-5.599-4.438 0-4.359 4.75-4.321 5.599-.945-.037-3.679.341-3.679 2.818 0 1.223.856 2.245 2 2.511v2.013z\" /></svg>";
var linkMenu = [
    [svgDownloads, "blue", "-HEAD-"],
    ["Zooqle", "https://zooqle.com", ""],
    ["Sky Torrents", "https://www.skytorrents.in", ""],
    ["The Pirate Bay", "https://thepiratebay.org", ""],
    ["Kickass Torrents", "https://katcr.co/new/", ""],
    ["Torrentz", "https://torrentz2.eu", ""],
    ["1337X", "https://1337x.to/home/", ""],
    ["Snowfl", "https://snowfl.com", ""],
    ["RARBG", "https://rarbg.to/torrents.php", ""],
    ["Nyaa", "https://nyaa.si", ""],
    ["AnimeRG", "http://animerg.se", ""],
    ["LimeTorrents", "https://www.limetorrents.cc", ""],
    ["Demonoid", "https://www.demonoid.pw", ""],
    ["Torlock", "https://www.torlock.com", ""],
    ["Warez-BB", "https://www.warez-bb.org", ""],
    ["Mobilism", "https://forum.mobilism.org", ""],
    ["On HAX", "https://onhax.me", ""],
    ["ACMarket", "https://www.acmarket.net", ""],
    ["AudioZ", "https://audioz.download", ""],
    ["PDF Giant", "http://pdf-giant.com", ""],
    ["MagazineLib", "http://magazinelib.com", ""],
    ["MyComicPost", "http://mycomicpost.net", ""],
    ["ComicsCodes", "https://www.comicscodes.com", ""],
    ["Sci-Hub", "http://sci-hub.io", ""],
    ["LibGen", "http://libgen.io", ""],
    ["B-OK", "http://b-ok.org", ""],
    ["Ebook Bike", "https://ebook.bike", ""],
    ["FilePursuit", "https://filepursuit.com", ""],
    ["FitGirl Repacks", "http://fitgirl-repacks.site", ""],
    ["IGG-Games", "http://igg-games.com", ""],
    [svgStream, "purple", "-HEAD-"],
    ["Netflix", "https://www.netflix.com", ""],
    ["Hulu", "https://www.hulu.com", ""],
    ["Twit", "https://twit.tv", ""],
    ["SoundCloud", "https://soundcloud.com", ""],
    ["Crunchyroll", "http://www.crunchyroll.com", ""],
    ["UstreaMix", "https://ustreamyx.com", ""],
    ["Alluc", "https://www.alluc.ee", ""],
    ["PrimeWire", "https://www.primewire.is", ""],
    ["GoMovies", "https://gostream.is", ""],
    ["SolarMovie", "https://solarmoviez.to", ""],
    ["FMovies", "https://fmovies.is", ""],
    ["YesMovies", "https://yesmovies.to", ""],
    ["Converto", "https://www.converto.io/en", ""],
    ["DatMusic", "https://datmusic.xyz", ""],
    ["MyFreeMP3", "https://my-free-mp3.net", ""],
    ["MP3 Snatch", "https://mp3snatch.com", ""],
    ["Deezloader", "http://www.solidfiles.com/v/vppDzKWBd3XAY", ""],
    ["Soulseek", "http://www.slsknet.org", ""],
    ["Audio Book Bay", "http://audiobookbay.nl", ""],
    ["NFL Streams", "https://www.reddit.com/r/nflstreams/", ""],
    ["NBA Streams", "https://www.reddit.com/r/nbastreams/", ""],
    ["MLB Streams", "https://www.reddit.com/r/MLBStreams/", ""],
    ["NHL Streams", "https://www.reddit.com/r/NHLStreams/", ""],
    ["Puck Streams", "https://www.reddit.com/r/puckstreams/", ""],
    ["Soccer Streams", "https://www.reddit.com/r/soccerstreams/", ""],
    ["Boxing Streams", "https://www.reddit.com/r/BoxingStreams/", ""],
    ["MMA Streams", "https://www.reddit.com/r/MMAStreams/", ""],
    ["NCAA Streams", "https://www.reddit.com/r/ncaaBBallStreams/", ""],
    ["CFB Streams", "https://www.reddit.com/r/CFBStreams/", ""],
    [svgSocial, "green", "-HEAD-"],
    ["YouTube", "https://www.youtube.com", ""],
    ["Facebook", "https://www.facebook.com", ""],
    ["Twitter", "https://twitter.com", ""],
    ["Gab", "https://gab.ai", ""],
    ["4Chan", "https://www.4chan.org", ""],
    ["Discord", "https://discordapp.com", ""],
    ["Instagram", "https://www.instagram.com", ""],
    ["Tumblr", "https://www.tumblr.com", ""],
    ["Pinterest", "https://www.pinterest.com", ""],
    ["Twitch", "https://www.twitch.tv", ""],
    ["DeviantArt", "https://www.deviantart.com", ""],
    ["LinkedIn", "https://www.linkedin.com", ""],
    ["Flickr", "https://www.flickr.com", ""],
    ["VKontakte", "https://vk.com", ""],
    ["Cryptocat", "https://crypto.cat", ""],
    ["Meetup", "https://www.meetup.com", ""],
    ["Omegle", "https://www.omegle.com", ""],
    ["Ask", "https://ask.fm", ""],
    [svgReddit, "cyan", "-HEAD-"],
    ["Reddit", "https://www.reddit.com/r/all/", ""],
    ["/r/Technology", "https://www.reddit.com/r/technology/", ""],
    ["/r/SysAdmin", "https://www.reddit.com/r/sysadmin/", ""],
    ["/r/Linux", "https://www.reddit.com/r/linux/", ""],
    ["/r/NetSec", "https://www.reddit.com/r/netsec/", ""],
    ["/r/WebDev", "https://www.reddit.com/r/webdev/", ""],
    ["/r/Bestof", "https://www.reddit.com/r/bestof/", ""],
    ["/r/PCGaming", "https://www.reddit.com/r/pcgaming/", ""],
    ["/r/TechSupport", "https://www.reddit.com/r/techsupport/", ""],
    ["/r/WebHosting", "https://www.reddit.com/r/webhosting/", ""],
    ["/r/SeedBoxes", "https://www.reddit.com/r/seedboxes/", ""],
    ["/r/Trackers", "https://www.reddit.com/r/trackers/", ""],
    ["/r/Piracy", "https://www.reddit.com/r/Piracy/", ""],
    ["/r/Privacy", "https://www.reddit.com/r/privacy/", ""],
    ["/r/Bitcoin", "https://www.reddit.com/r/Bitcoin/", ""],
    ["/r/Monero", "https://www.reddit.com/r/Monero/", ""],
    ["/r/CryptoCurrency", "https://www.reddit.com/r/CryptoCurrency/", ""],
    ["/r/HomeNetworking", "https://www.reddit.com/r/HomeNetworking/", ""],
    ["/r/HomeLab", "https://www.reddit.com/r/homelab/", ""],
    ["/r/MegaLinks", "https://www.reddit.com/r/megalinks/", ""],
    ["/r/CrackWatch", "https://www.reddit.com/r/CrackWatch/", ""],
    ["/r/SoftwareSwap", "https://www.reddit.com/r/microsoftsoftwareswap/", ""],
    ["/r/NSFW411", "https://www.reddit.com/r/NSFW411/wiki/index", ""],
    [svgCode, "red", "-HEAD-"],
    ["GitHub", "https://github.com", ""],
    ["Envato", "https://market.envato.com", ""],
    ["Font Squirrel", "https://www.fontsquirrel.com", ""],
    ["Adobe Color", "https://color.adobe.com/create/color-wheel/", ""],
    ["Paletton", "http://paletton.com", ""],
    ["JSBeautifier", "http://jsbeautifier.org", ""],
    ["CodePen", "https://codepen.io/pens/", ""],
    ["GitMask", "https://www.gitmask.com", ""],
    ["DirtyMarkup", "https://dirtymarkup.com", ""],
    ["Dan's Tools", "http://www.danstools.com", ""],
    ["TinyPNG", "https://tinypng.com", ""],
    ["Compressor", "https://compressor.io", ""],
    ["Browserling", "https://www.browserling.com", ""],
    ["Stack Exchange", "https://stackexchange.com", ""],
    ["Web Hosting Talk", "https://www.webhostingtalk.com", ""],
    ["LowEndTalk", "https://lowendtalk.com", ""],
    ["WJunction", "https://www.wjunction.com", ""],
    ["BlackHatWorld", "https://www.blackhatworld.com", ""],
    ["Nulled", "https://www.nulled.to", ""],
    ["GFXDomain", "http://forum.gfxdomain.net", ""],
    ["CG Persia", "http://cgpersia.com", ""],
    ["PSDKeys", "https://psdkeys.com", ""],
    ["WPLocker", "http://www.wplocker.com", ""],
    ["Coinhive", "https://coin-hive.com", ""],
    ["Selfhosted", "https://github.com/Kickball/awesome-selfhosted", ""],
    [svgNews, "orange", "-HEAD-"],
    ["Reuters", "http://www.reuters.com", ""],
    ["BBC News", "http://www.bbc.com/news", ""],
    ["Washington Post", "https://www.washingtonpost.com", ""],
    ["The Guardian", "https://www.theguardian.com", ""],
    ["Fox News", "http://www.foxnews.com", ""],
    ["ABC News", "http://abcnews.go.com", ""],
    ["Al Jazeera", "http://www.aljazeera.com/topics/regions/us-canada.html", ""],
    ["Google News", "https://news.google.com", ""],
    ["Drudge Report", "http://drudgereport.com", ""],
    ["Zero Hedge", "http://www.zerohedge.com", ""],
    ["Ars Technica", "https://arstechnica.com", ""],
    ["Hacker News", "https://news.ycombinator.com", ""],
    ["Krebs on Security", "https://krebsonsecurity.com", ""],
    ["TorrentFreak", "https://torrentfreak.com", ""],
    ["Techmeme", "https://techmeme.com", ""],
    ["Slashdot", "https://slashdot.org", ""],
    ["Guru3D", "https://www.guru3d.com", ""],
    ["AnandTech", "http://www.anandtech.com", ""],
    ["The Register", "https://www.theregister.co.uk", ""],
    ["Threatpost", "https://threatpost.com", ""],
    ["Bleeping Computer", "https://www.bleepingcomputer.com", ""],
    ["Naked Security", "https://nakedsecurity.sophos.com", ""],
    ["The Inquirer", "https://www.theinquirer.net", ""],
    ["Phoronix", "https://phoronix.com", ""],
    [svgCloud, "yellow", "-HEAD-"],
    ["Imgur", "https://imgur.com", ""],
    ["IMG.YT", "https://img.yt", ""],
    ["PiXhost", "https://pixhost.org", ""],
    ["Imgbox", "https://imgbox.com", ""],
    ["Dropbox", "https://www.dropbox.com", ""],
    ["Google Drive", "https://www.google.com/drive/", ""],
    ["Mega", "https://mega.nz", ""],
    ["pCloud", "https://www.pcloud.com", ""],
    ["1fichier", "https://1fichier.com/?lg=en", ""],
    ["FilesCDN", "https://filescdn.com", ""],
    ["RockFile", "https://rockfile.eu", ""],
    ["SolidFiles", "https://www.solidfiles.com", ""],
    ["Uploadfiles", "https://uploadfiles.io", ""],
    ["FileJoker", "https://filejoker.net", ""],
    ["Userscloud", "https://userscloud.com", ""],
    ["Openload", "https://openload.co", ""],
    ["ZippyShare", "http://zippyshare.com", ""],
    ["Uploaded", "https://uploaded.net", ""],
    ["MediaFire", "https://www.mediafire.com", ""],
    ["DirtyWarez", "http://dirtywarez.org", ""],
    ["File Host List", "https://github.com/H1dd3nM1nd/FileHostList", ""],
    [svgMore, "pink", "-HEAD-"],
    ["Gmail", "https://www.google.com/gmail/", ""],
    ["ProtonMail", "https://protonmail.com", ""],
    ["MSGSafe", "https://www.msgsafe.io", ""],
    ["Tutanota", "https://tutanota.com", ""],
    ["Cock.li", "https://cock.li", ""],
    ["10 Minute Mail", "https://10minutemail.net", ""],
    ["TorGuard", "https://torguard.net", ""],
    ["Creddle", "http://creddle.io", ""],
    ["Khan Academy", "https://www.khanacademy.org", ""],
    ["PC Part Picker", "https://pcpartpicker.com", ""],
    ["FossHub", "https://www.fosshub.com", ""],
    ["Ninite", "https://ninite.com", ""],
    ["AlternativeTo", "https://alternativeto.net", ""],
    ["DistroWatch", "https://DistroWatch.com", ""],
    ["WallHaven", "https://alpha.wallhaven.cc", ""],
    ["Wayback Machine", "https://web.archive.org", ""],
    ["DSLReports", "http://www.dslreports.com", ""],
    ["SpeedTest", "http://beta.speedtest.net", ""],
    ["Fast", "https://fast.com", ""],
    ["ThatOnePrivacySite", "https://thatoneprivacysite.net", ""],
    ["Domain Tools", "http://whois.domaintools.com", ""],
    ["DNSDumpster", "https://dnsdumpster.com", ""],
    ["BGPView", "https://bgpview.io", ""],
    ["TechBench", "https://tb.rg-adguard.net", ""],
    ["Torrent Trackers", "https://github.com/ngosang/trackerslist/blob/master/trackers_all.txt", ""],
    ["NZBIndex", "https://nzbindex.nl", ""],
    ["BinSearch", "https://www.binsearch.info", ""],
];
var searchInput = $('searchBar');
var rootSearchHelp = $('searchHelpMenu');
var rootMenuUL = $('categoryMenu');
var dateDiv = $('dateContainer');
var notesTextarea = $('notesInput');

function focus () {
    searchInput.focus();
}

setTimeout (focus, 500);

function init() {
    initSearchBar();
    buildDate();
    buildHelp();
    buildMenu();
    $('body').style.opacity = 1;
    $('mainContainer').style.opacity = 1;
    $('dateContainer').style.opacity = 1;
    $('notesWidget').style.opacity = 1;
<<<<<<< HEAD
    $('mainMenuWidget').style.opacity = 1;
=======
>>>>>>> 2b620fc915e2b40b006b090f1d3ddac371868ef7
}

function initSearchBar() {
    if (searchSources[ssi] !== undefined)
        searchInput.placeholder = searchSources[ssi][2];
    else {
        ssi = 0;
        searchInput.placeholder = "Do you know what you're doing?";
        alert("Error: default search engine setting is invalid!");
    }
    document.addEventListener('keydown', function(event) {
        handleKeydown(event);
    });
    searchInput.value = "";
}

function buildDate() {
    var today = new Date();

    var hours, minutes, seconds;

    (today.getHours() < 10) ? hours = "0" + today.getHours (): hours = today.getHours ();
    (today.getMinutes() < 10) ? minutes = "0" + today.getMinutes (): minutes = today.getMinutes ();
    (today.getSeconds() < 10) ? seconds = "0" + today.getSeconds (): seconds = today.getSeconds ();

    dateDiv.innerHTML = "<font class=\"font-3em\">" +
        monthNames[today.getMonth()] + " " +
        today.getDate() + "</font><br><font>" +
        dayNames[today.getDay()] + ", " +
        today.getFullYear() + "<br>" +
        hours + ":" + minutes + ":" + seconds + "</br></font>";

    setTimeout (buildDate, 1000);
}

function buildHelp() {
    var newHelp = ''; //"<li><center>Search Engine: Type 2 Character Code Followed By a Space</center></li>";
    console.log(searchSources[0][0]);
    console.log(searchSources[0][2]);
    for (var i = 0; i < searchSources.length; i++) {
        console.log(searchSources[i][0]);
        console.log(searchSources[i][2]);
        newHelp += "<li><span>!" + searchSources[i][0] + "</span> " + searchSources[i][2] + "</li>";
    }
    rootSearchHelp.innerHTML = newHelp;

    scaleHelp ();
}

function scaleHelp () {
    var children = rootSearchHelp.children;

    var searchBarRect = searchInput.getBoundingClientRect();

    var distanceToBottom = window.innerHeight - searchBarRect.bottom;
    var singleHeight = (distanceToBottom - 10 - (children.length * 10)) / children.length;

    var style = window.getComputedStyle(children[0], null);
    
    var oneHeight = parseInt (style.getPropertyValue("height").replace ("px", ""));

    console.log (distanceToBottom)

    var paddingHeight = (singleHeight - oneHeight) / 2;

    if (paddingHeight < 20 || distanceToBottom < oneHeight * children.length) {
        $('searchHelp').style.marginTop = paddingHeight/2 + "px";

        for (var i = 0; i < children.length; i++) {
            children[i].style.padding = paddingHeight + 'px 0';
            children[i].style.marginBottom = paddingHeight/2 + "px";
        }
    } else {
        $('searchHelp').style.marginTop = '8px';

        for (var i = 0; i < children.length; i++) {
            children[i].style.padding = '20px 0';
            children[i].style.marginBottom = '10px';
        }
    }
}

function buildMenu() {
    var newMenu = "";
    if (linkMenu[0][2] === "-HEAD-")
        newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[0][1] !== "" ? linkMenu[0][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + linkMenu[0][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
    else {
        alert("linkMenu is invalid. Ensure to start the list with a -HEAD- entry.");
        return;
    }
    for (var i = 1; i < linkMenu.length; i++)
        if (linkMenu[i][2] === "-HEAD-")
            newMenu += "</ul></div></div></li><li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[i][1] !== "" ? linkMenu[i][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + linkMenu[i][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
        else
            newMenu += "<li class='menu-link-item'><a href=\"" + linkMenu[i][1] + "\" target=\"_blank\"><label>" + linkMenu[i][0] + "</label></a></li>";
    newMenu += "</ul></div></div></li>";
    rootMenuUL.innerHTML = newMenu;
}

function handleQuery(event, query) {
    var key = event.keyCode || event.which;
    if (query !== "") {
        var qlist;
        if (key === 32) {
            qList = query.split(" ");
            if (qList[0].charAt(0) === cmdPrefix) {
                var keyword = "";
                for (var i = 0; i < searchSources.length; i++) {
                    keyword = cmdPrefix + searchSources[i][0];
                    if (keyword === qList[0]) {
                        ssi = i;
                        searchInput.placeholder = searchSources[ssi][2];
                        searchInput.value = query.replace(keyword, "").trim();
                        event.preventDefault();
                        break;
                    }
                }
            }
        } else if (key === 13) {
            qList = query.split(" ");
            if (qList[0].charAt(0) === cmdPrefix) {
                var keyword = "";
                for (var i = 0; i < searchSources.length; i++) {
                    keyword = cmdPrefix + searchSources[i][0];
                    if (keyword === qList[0]) {
                        ssi = i;
                        break;
                    }
                }
                if (qList.length > 1) {
                    window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
                } else {
                    searchInput.placeholder = searchSources[ssi][2];
                    searchInput.value = "";
                }
            } else {
                window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
            }
        }
    }
    if (key === 27) {
        searchInput.blur();
    }
}

function handleNoteInput(event) {
    var key = event.keyCode || event.which;
    if (key === 27) notesTextarea.blur();
}
var noteText = null;

function handleNotes(event, focus) {
    if (focus) {
        if (!noteText) {
            noteText = GetCookie("notes") || "";
        }
        notesTextarea.value = noteText;
        addClass('notesContainer', "active");
    } else {
        removeClass('notesContainer', "active");
        if (noteText !== notesTextarea.value) {
            noteText = notesTextarea.value;
            SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
        }
    }
}
var ignoredKeys = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];

function handleKeydown(event) {
    if (notesInput === document.activeElement || searchInput === document.activeElement || ignoredKeys.includes(event.keyCode))
        return;
    searchInput.focus();
}

function addClass(elementID, className) {
    $(elementID).classList.add(className);
}

function removeClass(elementID, className) {
    $(elementID).classList.remove(className);
}

function GetCookie(name) {
    try {
        var cookie = document.cookie;
        name = CookiePrefix + name;
        var valueStart = cookie.indexOf(name + "=") + 1;
        if (valueStart === 0) {
            return null;
        }
        valueStart += name.length;
        var valueEnd = cookie.indexOf(";", valueStart);
        if (valueEnd == -1)
            valueEnd = cookie.length;
        return decodeURIComponent(cookie.substring(valueStart, valueEnd));
    } catch (e) {
        console.log(e);
    }
    return null;
}

function SetCookie(name, value, expire) {
    var temp = CookiePrefix + name + "=" + escape(value) + ";" + (expire !== 0 ? "expires=" + ((new Date((new Date()).getTime() + expire)).toUTCString()) + ";" : " path=/;");
    console.log(temp);
    document.cookie = temp;
}

function CanSetCookies() {
    SetCookie('CookieTest', 'true', 0);
    var can = GetCookie('CookieTest') !== null;
    DelCookie('CookieTest');
    return can;
}

function DelCookie(name) {
    document.cookie = CookiePrefix + name + '=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}