const random = () => {
    const randomstring = require("randomstring");

    const issue_Uuid_AlphaB = (num) => randomstring.generate({ length: num, charset: 'alphabetic' });
    const issue_Uuid_AlphaN = (num) => randomstring.generate({ length: num, charset: 'alphanumeric' });
    const customUuid = (num) => randomstring.generate({ length: num, charset: 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789' });

    const issue_Uuid_CustomId = (num) => {
        let dt = new Date();

        let mm = dt.getMonth() + 1;
        let dd = dt.getDate().toString();
        let yy = dt.getFullYear();
        yy = yy.toString().substr(-2);

        let id1 = yy + (mm < 10 ? '0' + mm : mm) + (dd < 10 ? '0' + dd : dd);
        let id2 = randomstring.generate({ length: num, charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });

        return id1 + id2;
    }

    const RandomNumber = (length) => {
        const list = "1234567890";
        let randomNo = "";
        for (var i = 0; i < length; i++) {
            var rnd = Math.floor(Math.random() * list.length);
            randomNo = randomNo + list.charAt(rnd);
        }
        return randomNo;
    }

    const issue_Uuid_ReferenceNo = (code, num) => {
        var randomstring = require("randomstring");
    
        let dt = new Date();
    
        let mm = dt.getMonth()+1;
        let dd = dt.getDate().toString();
        let yy = dt.getFullYear();
        yy = yy.toString().substr(-2);

        if (code === 'FOC')
            code += 'AP';
    
        let id1 = code + yy + (mm<10 ? '0'+ mm: mm) + (dd<10 ? '0'+ dd: dd);
        let id2 = randomstring.generate({ length: num, charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });
    
        return id1+id2;
    }

    return {
        customUuid,
        RandomNumber,
        issue_Uuid_AlphaB,
        issue_Uuid_AlphaN,
        issue_Uuid_CustomId,
        issue_Uuid_ReferenceNo
    };

}
module.exports.random = random;