import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";

cloudinary.config({
  cloud_name: "dk3vd6o0k",
  api_key: "336448376772473",
  api_secret: "WI_fIehZYj2x6sPUudd9K5_GoRs",
});
export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(path, { public_id: imageName })
      .then((result) => {
        resolve(result)
        fs.unlink(path, (err) =>{
            if (err) {
                reject(err);
            }
        }); // Delete the file after upload
    })
      .catch((error) => reject(error));
  });
  //   cloudinary.uploader
  //     .upload(path, { public_id: imageName })
  //     .then((result) => console.log(result));
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
