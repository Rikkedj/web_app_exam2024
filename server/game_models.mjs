

function Games(id, player, round1=null, round2=null, round3=null){
    this.id = id;
    this.player = player;
    this.round1 = round1;
    this.round2 = round2;
    this.round3 = round3;
    if (Number.isInteger(id) == false){
        throw new Error("ID need to be an integer");}
    if (Number.isInteger(player) == false){
        throw new Error("player ID needs to be an integer");}
}

function Caption(id, caption){
    this.id = id;
    this.caption = caption;
    if (Number.isInteger(id) == false){
        throw new Error("ID need to be an integer");}
    if (typeof caption != "string"){
        throw new Error("Caption needs to be a string");}
}

function Round(id, game_id, meme_id, caption1, caption2, caption3, caption4, caption5, caption6, caption7){
    this.id = id;
    this.game_id = game_id;
    this.meme_id = meme_id;
    this.caption1 = caption1;
    this.caption2 = caption2;
    this.caption3 = caption3;
    this.caption4 = caption4;
    this.caption5 = caption5;
    this.caption6 = caption6;
    this.caption7 = caption7;
    if (Number.isInteger(id) == false){
        throw new Error("ID need to be an integer");}
    if (Number.isInteger(game_id) == false){
        throw new Error("Game ID needs to be an integer");}
}

function Meme(id, url){
    this.id = id;
    this.url = url;
    if (Number.isInteger(id) == false){
        throw new Error("ID need to be an integer");}
    if (typeof url != "string"){
        throw new Error("URL needs to be a string");}
}