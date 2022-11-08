"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const checkToken = (decodedToken) => {
    if (Object.keys(decodedToken).length === 0)
        throw new Error('Utilisateur non identifié');
    return;
};
exports.checkToken = checkToken;
