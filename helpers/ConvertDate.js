class ConvertDate{

    static execute(date){
        return date.replace(/-/g, "%2F")
    }
}

module.exports = ConvertDate