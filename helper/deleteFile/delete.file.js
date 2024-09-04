const fs = require("fs")


module.exports = (filename, folderName) => {
    fs.unlinkSync(`upload/employeeImage/` + filename)
}   