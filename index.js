//TODO: /earthquake
const chalk = require("chalk")
require("dotenv").config()
console.clear()
console.log(`${chalk.magenta("牛牛")}${chalk.cyan("Telegram")} v0.0.1`)
console.log(
  chalk.magenta(`
    █   █ ▀█▀ ▀█▀ █   █▀▀   █▀▀ █▀█ █ █ █
    █▄▄ █  █   █  █▄▄ ██▄   █▄▄ █▄█ ▀▄▀▄▀
    `)
)
const Telegram = require("node-telegram-bot-api")
const client = new Telegram(process.env.Token, {
  polling: true,
})
const chineseday = require("chineseday").all
const short = require("shortlib")
const mcsrv = require("mcsrv")
const xml = require("xml-js")
const req = require("request")
const hahalist = [
  "冰塊最想做什麼事?\n退伍 因為他當冰很久了",
  "有一天,我去吉野家,可是吉野不在家",
  "我走進眼科診所跟醫生抱怨說:最近視力變差了,我需要配一副新眼鏡。\n他嘆了一口氣回說:你真的病得不輕，我這裡可是甜甜圈店啊!",
  "有一隻狼寶寶不吃肉只吃素,狼媽媽、狼爸爸看得很擔心\n某天,狼寶寶終於追著一隻兔子跑,牠們感到很欣慰\n狼寶寶抓到兔子後說:快把紅蘿蔔交出來!",
  "天上的星星有多重?\n8克,因為星巴克",
  "有一天,小明去醫院量血壓,血壓計的語音說:血壓升高中，請注意...\n小明問醫生:為什麼會這樣?\n醫生回:這表示你的血壓...國中畢業了。",
  "第一個進船的要說什麼?\n要說online,因為仙境傳說online",
  "小魚問大魚說:你-喜-歡-吃-怎-樣-的-魚?\n大魚回:我喜歡吃講話慢的魚!\n小魚說:醬紫先走",
  "小明每次開可樂,瓶蓋都寫銘謝惠顧,\n有一天,他在考試,突然忘記銘要怎麼寫了,\n於是他打開桌上的可樂,結果寫:再來一瓶",
  "有一天,我和牛弟弟在吃草,\n弟弟問我:草是什麼味道?\n我回:草莓味。\n弟弟吃了一口草,生氣的說:這草明明沒有味道!\n我回:我沒有說錯啊...我剛剛說草沒有味道,草沒味啊!",
  "你知道學校的警衛每天早上都在笑什麼嗎?校門口",
  "什麼情況下人會有四隻眼睛?\n兩個人的時候",
  "愚公臨死前召集兒子來到床邊虛弱的說:移山…移山……\n兒子: 亮晶晶?\n愚公卒。",
]
const rnum = (a, b) => {
  if (a > b) {
    var c = a
    a = b
    b = c
  }
  return Math.floor(Math.random() * (b - a + 1) + a)
}
client
  .setMyCommands([
    { command: "help", description: "查看指令清單!" },
    { command: "haha", description: "為你說一句笑話!" },
    { command: "say", description: "讓我一字不差的學你說話!" },
    { command: "time", description: "看看現在的時間!" },
    { command: "poll", description: "為你舉行一場投票!" },
    { command: "dice", description: "擲出一顆骰子!" },
    { command: "short", description: "縮短你的網址!" },
    {
      command: "mcjava",
      description: "查看關於某個Minecraft Java版伺服器的資訊!",
    },
    {
      command: "mcbedrock",
      description: "查看關於某個Minecraft 基岩版伺服器的資訊!",
    },
    { command: "invoice", description: "來看看你的發票有沒有中獎!" },
  ])
  .then(() => {
    console.log(`${chalk.magenta("哞!")} 指令刷新成功!`)
  })

client.onText(/\/start|\/help/, (message) => {
  client.sendMessage(
    message.chat.id,
    `
哞!我是牛牛,一個多功能機器人!
目前有下列指令:
/haha: 為你說一句笑話!
/say [說話內容]: 讓我一字不差的學你說話!
/time: 看看現在的時間!
/poll [投票內容]: 為你舉行一場投票!
/dice: 擲出一顆骰子!
/short [連結]: 縮短你的網址!
/mcjava [伺服器IP]: 查看關於某個Minecraft Java版伺服器的資訊!
/mcbedrock [伺服器IP]: 查看關於某個Minecraft 基岩版伺服器的資訊!
/invoice: 來看看你的發票有沒有中獎!
`
  )
})
client.onText(/\/haha/, (message) => {
  client.sendMessage(message.chat.id, hahalist[rnum(1, hahalist.length) - 1])
})
client.onText(/\/say (.+)/, (message, match) => {
  client.sendMessage(message.chat.id, match[1])
})
client.onText(/\/time/, (message) => {
  const time = new Date(Date.now())
  client.sendMessage(
    message.chat.id,
    `哞!現在的時間是:${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日${chineseday(
      time
    )} ${time.getHours()}:${time.getMinutes()}`
  )
})
client.onText(/\/poll (.+)/, (message, match) => {
  client.sendPoll(message.chat.id, match[1], ["👍", "👎"])
})
client.onText(/\/dice/, (message) => {
  client.sendDice(message.chat.id)
})
client.onText(/\/shortlink (.+)|\/short (.+)/, (message, match) => {
  short.tnyim(match[1] || match[2]).then((s) => {
    client.sendMessage(message.chat.id, `哞!你的短網址: ${s}`)
  })
})
client.onText(/\/mcjava (.+)/, (message, match) => {
  mcsrv(match[1]).then((result) => {
    if (!result.online)
      return client.sendMessage(message.chat.id, "哞!伺服器沒開!")
    client.sendMessage(
      message.chat.id,
      `
哞!這是 ${match[1]} 的資訊:
MOTD: ${result.motd.clean.join("\n") || "查無資料"}
玩家數: ${
        [result.players.online || "0", "/", result.players.max || "0"].join(
          ""
        ) || "查無資料"
      }
版本: ${result.version || "查無資料"}
協議版本: ${result.protocol || "查無資料"}
軟體: ${result.software || "查無資料"}
端口: ${result.port || "查無資料"}
`
    )
  })
})
client.onText(/\/mcbedrock (.+)|\/mcpe (.+)|\/mcbe (.+)/, (message, match) => {
  mcsrv(`../bedrock/2/${match[1] || match[2] || match[3]}`).then((result) => {
    if (!result.online)
      return client.sendMessage(message.chat.id, "哞!伺服器沒開!")
    client.sendMessage(
      message.chat.id,
      `
哞!這是 ${match[1] || match[2] || match[3]} 的資訊:
名稱: ${result.motd.clean.join("\n") || "查無資料"}
玩家數: ${
        [result.players.online || "0", "/", result.players.max || "0"].join(
          ""
        ) || "查無資料"
      }
版本: ${result.version || "查無資料"}
模式: ${result.gamemode || "查無資料"}
軟體: ${result.software || "查無資料"}
端口: ${result.port || "查無資料"}
`
    )
  })
})
client.onText(/\/invoice/, (message) => {
  req(
    "https://invoice.etax.nat.gov.tw/invoice.xml",
    (error, response, body) => {
      const resu = xml.xml2js(body, {
        ignoreComment: true,
        alwaysChildren: true,
      })
      const title =
        resu.elements[0].elements[0].elements[4].elements[0].elements[0].cdata
      const content =
        resu.elements[0].elements[0].elements[4].elements[3].elements[0].cdata.split(
          "</p><p>"
        )
      content[0] = content[0].split("<p>")[1]
      content[content.length - 1] = content[content.length - 1].split("</p>")[0]
      client.sendMessage(
        message.chat.id,
        `
${title}
${content.join("\n").replaceAll("：", ": ")}
`
      )
    }
  )
})
