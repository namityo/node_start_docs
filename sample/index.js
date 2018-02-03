utils = require('xlsx').utils;

getLine = require('./lib/get_line')
opt = require('./option.json')


// 多次元配列でデータを格納
datas = []
opt.datas.forEach(function(value) {
    datas.push(getLine(opt.file, opt.sheet, value.cell, value.rowStart, value.rowEnd))
})


// JSON形式でデータを出力
json = {}
datas.forEach(function(value) {
    key = value.shift()
    json[key] = value
})

console.log(json)
