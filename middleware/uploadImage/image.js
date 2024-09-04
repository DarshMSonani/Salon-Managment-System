const path = require("path");
const fs = require("fs");

async function uploadFile(fileObjArray, folderName) {
    console.log("File object array:", fileObjArray);

    // Check if fileObjArray is not empty and has elements
    if (Array.isArray(fileObjArray) && fileObjArray.length > 0) {
        console.log("File object:", fileObjArray[0]);

        // Generate a unique filename
        const upload = `upload/${folderName}/`
        if (!fs.existsSync(upload)) {
            fs.mkdirSync(upload);
        }

        // Ensure that fileObjArray[0] is defined before accessing its properties
        if (fileObjArray[0].originalname) {
            image = "Image" + `${Date.now()}` + path.extname(fileObjArray[0].originalname);
            var uploadPath = `upload/${folderName}/` + image;

            // Convert file content to a Buffer
            var fileBuffer = Buffer.from(fileObjArray[0].buffer);

            var outStream = fs.createWriteStream(uploadPath);
            outStream.write(fileBuffer);
            outStream.end();
        } else {
            console.error("Originalname property is undefined or null in file object.");
        }
    } else {
        console.error("File object array is empty or not properly populated.");
    }

    return image;
}

module.exports = uploadFile