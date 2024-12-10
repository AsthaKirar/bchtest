const Url = require('../models/Url');
const shortid = require('shortid');

exports.shortenUrl = async (req, res) => {
    const { longUrl, customAlias, expirationDate, password } = req.body;
    const shortUrl = `http://short.ly/${shortid.generate()}`;

    if (customAlias) {
        const existingAlias = await Url.findOne({ customAlias });
        if (existingAlias) return res.status(400).send('Custom alias already in use.');
    }

    const url = new Url({ longUrl, shortUrl, customAlias, expirationDate, password });
    await url.save();
    res.json({ shortUrl });
};

exports.redirectUrl = async (req, res) => {
    const url = await Url.findOne({ shortUrl: `http://short.ly/${req.params.shortUrl}` });
    if (!url) return res.status(404).send('URL not found.');

    if (url.expirationDate && new Date() > url.expirationDate) {
        return res.status(410).send('This URL has expired.');
    }

    if (url.password) {
        // Implement password check logic here
    }

    url.clickCount += 1;
    await url.save();
    res.redirect(url.longUrl);
};