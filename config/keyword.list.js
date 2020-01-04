module.exports = [
  {
    keyword:/turn\s?(\S+)\s?the light/, 
    response:"ok, i turn it $1",
    func:"light",
  },
  {
    keyword:/turn (\S+)\s?/, 
    response:"please wait, i turn $1 the light",
    func:"light",
  },
  {
    keyword:/開(\S+)/, 
    response:"好的, 正在為您$1燈",
    func:"light",
  },
  {
    keyword:/來([\S|\d]{0,})份\s?(\S+)/, 
    response:[
      "好的, 是 一份 $1 嗎", 
      "跟您確認一下, 是 $1份 $2 嗎",
    ],
    func:4,
  },
  {
    keyword:/給我來點(\S+)/, 
    response:"好的, 我們也很推薦 $1 呢",
    func:5,
  },
];