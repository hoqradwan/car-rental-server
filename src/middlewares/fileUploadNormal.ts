import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Express } from "express";
import { Request } from "express";
import createHttpError from "http-errors";
import { max_file_size, UPLOAD_FOLDER } from "../config";

const UPLOAD_PATH = UPLOAD_FOLDER || "public/images";
const MAX_FILE_SIZE = Number(max_file_size) || 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  ".jpg",
  ".jpeg",
  ".png",
  ".xlsx",
  ".xls",
  ".csv",
  ".pdf",
  ".doc",
  ".docx",
  ".mp3",
  ".wav",
  ".ogg",
  ".mp4",
  ".avi",
  ".mov",
  ".mkv",
  ".webm",
  ".svg",
];


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const extName = path.extname(file.originalname);
    //console.log("extName: ", extName);

    const fileName = `${Date.now()}-${file.originalname.replace(
      extName,
      "",
    )}${extName}`;
    // Assign the generated filename to req.body fields based on the fieldname
    if (file.fieldname === "driverLicense") {
      req.body.driverLicense = fileName;
    } else if (file.fieldname === "image") {
      req.body.image = fileName;
    }
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  let extName = path.extname(file.originalname).toLocaleLowerCase();
  const isAllowedFileType = ALLOWED_FILE_TYPES.includes(extName);
  console.log("isAllowedFileType: ", isAllowedFileType);
  if (!isAllowedFileType) {
    return cb(createHttpError(400, "File type not allowed"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

export default upload;
