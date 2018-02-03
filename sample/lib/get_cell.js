xlsx = require('xlsx')

module.exports = function(file, sheet, cell) {
    data = xlsx.readFile(file).Sheets[sheet][cell]
    if (data) {
        return data.v
    } else {
        return ""
    }
}
