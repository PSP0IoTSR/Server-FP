module.exports = [
  {
    keyword:/我要一份\s?(\S+)/, 
    response:"好的, 正在為您準備 $1",
    func:1,
  },
  {
    keyword:/(\S+)\s?一個外帶/, 
    response:"請稍後, 我們盡快為準備您的 $1",
    func:2,
  },
  {
    keyword:/(\S+)\s?外帶/, 
    response:"好的!請問除了 $1 還需要加點嗎",
    func:3,
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