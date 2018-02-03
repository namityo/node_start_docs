getCell = function(arg1, arg2) {
    xlsx = require('xlsx')
    file = xlsx.readFile(arg1)
    sheet = file.Sheets['Sheet1']
    A1 = sheet[arg2]
    return A1.v
}

module.exports = getCell