module.exports = function(){

    var lightStatus = "";

    const index = function(req, res){

        var blink = lightStatus === "blink" ? true : false;

        res.render('light', {lightStatus, blink});
    };

    const light = function(req, res){
        lightStatus = req.body.status;
        req.flash('info', `Light status now: ${lightStatus}`);
        res.redirect('/');
    }

    return {
        index,
        light
    }
}
