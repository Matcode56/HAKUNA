export const checkToken= (decodedToken: object)=>{
    if(Object.keys(decodedToken).length === 0) throw new Error('Utilisateur non identifié');
    return;
}

