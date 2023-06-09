"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)()); //  allow CORS
app.use(express_1.default.json());
app.get('/:municipality/:gluten_free/:lactose_free', function (req, res) {
    // first read existing data
    fs.readFile('./data.json', 'utf8', function (err, data) {
        var retrived_data = JSON.parse(data);
        var requested_data = [];
        for (var i of retrived_data) {
            if (req.params.municipality == i[Object.keys(i)[1]].municipality && req.params.gluten_free == i[Object.keys(i)[1]].gluten_free && req.params.lactose_free == i[Object.keys(i)[1]].lactose_free)
                requested_data.push(i);
            console.log(i[Object.keys(i)[1]]);
        }
        console.log(requested_data);
        res.end(JSON.stringify(requested_data));
    });
});
app.post('/add_restaurant', function (req, res) {
    fs.readFile('./data.json', 'utf8', function (err, data) {
        var json = JSON.parse(data);
        console.log(json);
        let data_to_push = { title: req.body.title, info: { municipality: req.body.municipality, gluten_free: req.body.gluten_free, lactose_free: req.body.lactose_free, rating: req.body.rating } };
        json.push(data_to_push);
        fs.writeFile('./data.json', JSON.stringify(json), (err) => console.log(err));
        res.end(JSON.stringify(json));
    });
});
var server = app.listen(8081, '127.0.0.1', function () {
    var addressinfo = server.address();
    console.log('Example app listening at http://%s:%s', addressinfo.address, addressinfo.port);
});
