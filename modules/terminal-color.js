Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"

const foreground = {
  "black":FgBlack,
  "red":FgRed,
  "green":FgGreen,
  "yellow":FgYellow,
  "blue":FgBlue,
  "magenta":FgMagenta,
  "cyan":FgCyan,
  "white":FgWhite
};
const background = {
  "black":BgBlack,
  "red":BgRed,
  "green":BgGreen,
  "yellow":BgYellow,
  "blue":BgBlue,
  "magenta":BgMagenta,
  "cyan":BgCyan,
  "white":BgWhite 
};
const system = {
  "reset":Reset,
  "bright":Bright,
  "dim":Dim,
  "underscore":Underscore,
  "blink":Blink,
  "reverse":Reverse,
  "hidden":Hidden,
};

function print(msg, {fore, back, sys} = {fore:"",back:"",sys:""}){
  process.stdout.write((foreground[fore]||"")+(background[back]||"")+(system[sys]||""));
  process.stdout.write(msg);
  process.stdout.write(Reset);
}
function println(msg, {fore, back, sys} = {fore:"",back:"",sys:""}){
  process.stdout.write((foreground[fore]||"")+(background[back]||"")+(system[sys]||""));
  console.log(msg);
  process.stdout.write(Reset);
}

exports.print = print;
exports.println = println;
exports.foreground = foreground;
exports.background = background;
