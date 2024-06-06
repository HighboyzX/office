
module.exports = (req, res, next) => {
    res.sendData = function (data, isSuccess, error) {
        if (!this.headersSent) {

            let respData = {
                data: data || null,
                data_total: 0,
                success: typeof isSuccess == 'boolean' ? isSuccess : true,
                error: error || null,
            }
            if (respData.data) {
                if (Array.isArray(respData.data)) {
                    respData.data_total = data.length
                }
                else if (typeof respData.data === 'object') {
                    respData.data_total = Object.keys(data).length
                }
                else {
                    respData.data_total = data.length || 0
                }
            }
            this.json(respData)
            this.end()
            delete this


        }
    }
    res.sendError = function (error,status) {
        if(!this.headersSent){

            let respData = {
                success : false,
                status : status || 500,
                error : error || "error"
            }
            this.json(respData)
            this.end()
            delete this

        }
    }
    res.sendStatusWithError = function(status,errorText){
        this.status(status);
        this.sendError(errorText);
    };
    res.sendParameterRequired = function(){
        this.sendStatusWithError(400);
    };

    next()
}