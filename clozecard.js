clozeCard = function (text, cloze) {
    this.full = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, '...');

    var makeSmall = text.toLowerCase();
    var clozeSmall = cloze.toLowerCase();

    if (!makeSmall.includes(clozeSmall)) {
        console.log('something went wrong');
        return;
    }
}
module.exports = clozeCard;