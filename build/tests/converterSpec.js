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
const helpers_1 = require("../routes/converter/helpers");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
describe('resizeImage', () => {
    it('should return null if filename is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = '';
        const width = 100;
        const height = 100;
        const resultedImage = yield (0, helpers_1.resizeImage)(filename, width, height);
        expect(resultedImage).toBeNull();
    }));
    it('should return null if width is negative', () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = 'test';
        const width = -100;
        const height = 100;
        const resultedImage = yield (0, helpers_1.resizeImage)(filename, width, height);
        expect(resultedImage).toBeNull();
    }));
    it('should return null if height is negative', () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = 'test';
        const width = 100;
        const height = -100;
        const resultedImage = yield (0, helpers_1.resizeImage)(filename, width, height);
        expect(resultedImage).toBeNull();
    }));
});
describe('endpoint functionality', () => {
    it('should return the correct image', () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = 'fjord';
        const width = 100;
        const height = 100;
        (0, supertest_1.default)(app)
            .get(`/converter/?filename=${filename}&width=${width}&height=${height}`)
            .expect(200)
            .expect('Content-Type', /image/);
    }));
});
