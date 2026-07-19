const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadfile(file) {
    const result = await ImageKitClient.files.upload({
        file,
        fileName: "Bill_" + Date.now(),
        folder: "/mini-project/bill",
    });

    return result;
}

module.exports = { uploadfile };