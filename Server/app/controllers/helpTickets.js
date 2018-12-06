var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    helpTicket = mongoose.model('HelpTicket'),
    asyncHandler = require('express-async-handler'),
    passportService = require('../../config/passport'),
    passport = require('passport');

    var requireLogin = passport.authenticate('local', { session: false });
    var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
            .populate({ path: 'personId', model: 'User', select: 'lastName firstName fullName' })
            .populate({ path: 'ownerId', model: 'User', select: 'lastName firstName fullName' });
        if (req.query.status) {
            if (req.query.status[0] == '-') {
                query.where('status').ne(req.query.status.substring(1));
            } else {
                query.where('status').eq(req.query.status);
            }
        }
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

      router.put('/helpTickets', asyncHandler(async (req, res) => {
                logger.log('info', 'Updating HelpTicket');
                console.log(req.body)
                await HelpTicket.findOneAndUpdate({ _id: req.body.helpTicket._id }, req.body.helpTicket, { new: true })
                    .then(result => {
                        if (req.body.content) {
                            req.body.content.helpTicketId = result._id;
                            var helpTicketContent = new HelpTicketContent(req.body.content);
                            helpTicketContent.save()
                                .then(content => {
                                    res.status(201).json(result);
                                })
                        } else {
                            res.status(200).json(result);
                        }
                    })
            }));        

};

