const router = require('express').Router();
let Crypto = require('../models/crypto.model');

// home
router.route('/').get((req, res)=> {

    Crypto.find()
        .then(crypto => res.json(crypto))
        .catch(err => res.status(400).json('Error: ' + err))

});

// add
router.route('/add').post((req, res)=> {

    const tokenName = req.body.tokenName;
    const priceUsd = req.body.priceUsd;

    const newCryptoDeclaration = new Crypto({tokenName, priceUsd});

    newCryptoDeclaration.save()
        .then(crypto => res.json('New Token Added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// details
router.route('/:id').get((req, res)=> {
    Crypto.findById(req.params.id)
        .then(crypto => res.json(crypto))
        .catch(err => res.status(400).json('Error: ' + err))
});

// delete
router.route('/:id').delete((req, res)=> {
    Crypto.findByIdAndDelete(req.params.id)
        .then(crypto => res.json('Token was deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// update
router.route('/update/:id').post((req, res)=> {

    Crypto.findById((req.params.id))
        .then(crypto => {
            crypto.tokenName = req.body.tokenName;
            crypto.priceUsd = req.body.priceUsd;

            crypto.save()
                .then(()=> res.json('Token Updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;