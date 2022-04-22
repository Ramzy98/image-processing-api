"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("./helpers");
Object.defineProperty(exports, "resizeImage", { enumerable: true, get: function () { return helpers_1.resizeImage; } });
const converter = express_1.default.Router();
converter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        res.status(400).send('Bad Request');
        return;
    }
    let resultedImage;
    try {
        var thumbFiles = fs_1.default.readdirSync('./images/thumb');
        var fullFiles = fs_1.default.readdirSync('./images/full');
        if (fullFiles.includes(filename + '.jpg')) {
            if (thumbFiles.includes(`${filename}-thumb.jpg`)) {
                resultedImage = `./images/thumb/${filename}-thumb.jpg`;
            }
            else {
                resultedImage = yield (0, helpers_1.resizeImage)(filename, parseInt(width), parseInt(height));
            }
            if (resultedImage !== null) {
                res.sendFile(resultedImage, {
                    root: '.',
                });
            }
            else {
                res.status(400).send('Bad Request');
            }
        }
        else {
            res.status(404).send('Image Not Found');
        }
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}));
exports.default = converter;
