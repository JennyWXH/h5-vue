/**
 * Created by jemmy_wxh on 2018/4/17.
 */
import data from './moduo-emoji.js'
import data2 from './moduo_special_emoji.js'
var emojiData = data
var emojiData2 = data2
/**
 *
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
String.prototype.replaceAll = function(s1,s2){
  return this.replace(new RegExp(s1,"g"),s2);
}
export function emoji (value) {
  if (!value) return
  Object.values(emojiData).forEach(item => {

    // var regex = '/\\' + item.chs + '/g'
    var regex = new RegExp('\\'+item.chs,'g');
    var newValue = value.replace(regex,createIcon((item.png)))
    value = newValue;
  })
  Object.values(emojiData2).forEach(item => {

    // var regex = '/\\' + item.chs + '/g'
    var regex = new RegExp('\\'+item.chs,'g');
    var newValue = value.replace(regex,createIcon2((item.png)))
    value = newValue;
  })
  return value
}

function createIcon (itemName) {
  const path = './static/emoji/com.wechat.emoji/'
  return `<img style="vertical-align: bottom" src=${path}${itemName} width="18px" height="18px">`
}
function createIcon2 (itemName) {
  const path = './static/emoji/ModuoEmotion/'
  return ` <img style="vertical-align: bottom" src=${path}${itemName} width="60px" height="60px">`
}
