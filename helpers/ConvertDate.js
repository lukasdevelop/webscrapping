class ConvertDate{

    static execute(date){   
        const originDate = date.split('-')
        const newDate = `${originDate[2]}-${originDate[1]}-${originDate[0]}`
        return newDate.replace(/-/g, "%2F")
    }
}

module.exports = ConvertDate