getCell = require('./get_cell')

module.exports = function (file, sheet, x, yStart, yEnd) {
    result = []

    for(y = yStart; y <= yEnd; y++) {
        // アドレスを生成
        addr = utils.encode_cell({c: x, r: y})

        // 配列の末尾にデータを格納
        result.push(getCell(file, sheet, addr))
    }

    return result
}