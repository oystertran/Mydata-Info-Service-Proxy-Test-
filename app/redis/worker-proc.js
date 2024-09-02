const ssm_services = require('../services/ssm-services.js');
const worker_resp = require('../../lib/worker-resp.js');
const product = require('../../config/product.js');
const utils = require('../../lib/utils.js');

exports.proc = (q_data) => {
    q_data.info.reqrefno = q_data.body.reqRefNo || 'NO-REF';

    setProductService(q_data);

    return ssm_services().get_ssmmw_token(q_data)
        .then(data => ssm_services().set_service(q_data, data))
        .then(data => ssm_services().invoke(data))
        .then(data => {
            if (q_data.info.product === product.SERVICE.BIZ.CHECK.IS_TERMINATED) {
                let today = new Date().getTime();
                let status = (!(data.robBusinessInfo.status === 'T') && data.robBusinessInfo.endBusinessDate < today) ? 'Available' : 'No Data';
                return { successCode: '00', errorMsg: status };
            }

            if (q_data.info.product === product.SERVICE.CERT.CHECK.IS_COMP_CLBG)
                return { errorMsg: data.errorMsg, successCode: data.successCode, status: (data.companyType === 'G')};

            if (q_data.info.category === 'CERT-INCORP') {
				if (data.localforeignCompany === 'F') {
					data.companyType = 'S';
					data.companyStatus = 'R';
				}
				if (data.companyNo === '259147') { // 1238966
					data.companyStatus = 'R';
				}
            }

            return data;
        })
        .catch(err => {
            if ((q_data.info.product === product.SERVICE.CHARGES.IS_CHARGE_LIST) 
                && err.message === 'Undefined Type')
                return { successCode: '00', errorMsg: 'Available'}

            return worker_resp(q_data).error(err);
        })

}

function setProductService(q_data) {

    if (q_data.info.product === product.SERVICE.ENTITY.REG_NEW_FORMAT) {
        q_data.body.formatType = (q_data.body.regNo.length >= 12 ? 'NEW' : 'OLD');
    }

    if (q_data.info.product === product.SERVICE.ACGS.QUERY || q_data.info.product === product.SERVICE.ACGS.INFO) {
        // const cust_req_date = utils().dateTimeZone(new Date().toISOString());
        // const dateApplyAcgs = utils().dateTimeZone(new Date('2023-01-01').toISOString());
        const dateApplyAcgs = utils().dateTimeZone(new Date().toISOString());
        q_data.body.dtApplyAcgs = dateApplyAcgs.toISOString();
    }

    // particular
    if (Object.keys(product.SERVICE.PARTICULAR).find(key => product.SERVICE.PARTICULAR[key] === q_data.info.product)) {
        if (q_data.info.product === product.SERVICE.PARTICULAR.ADDRESS) {
            q_data.body.fromDate = utils().dateTimeZone('1900-01-01').toISOString();
        }

        // if (q_data.info.product === product.SERVICE.PARTICULAR.COSEC)
        //     q_data.body.designation = 'S';

        // q_data.body.tableId = "ROCINFO";
    }
    // particular

    // financial
    if (q_data.info.product === product.SERVICE.FINCOMP.FIN00) {
        switch (q_data.body.year) {
            case 2:
                q_data.info.product = product.SERVICE.FINCOMP.FIN02;
                break;
            case 3:
                q_data.info.product = product.SERVICE.FINCOMP.FIN03;
                break;
            case 5:
                q_data.info.product = product.SERVICE.FINCOMP.FIN05;
                break;
            case 10:
                q_data.info.product = product.SERVICE.FINCOMP.FIN10;
                break;
            // default:
            //     msg = 'Internal error';
        }
    }

    if (q_data.body.isCertified === 'TRUE')
        q_data.info.product = q_data.info.product + 'CTC';
}

function stat_resp() {
    return ({
        "errorMsg": "",
        "infoId": "19575",
        "successCode": "00",
        "rocBalanceSheetListInfo": {
            "errorMsg": "",
            "infoId": "",
            "successCode": "00",
            "rocBalanceSheetInfos": [
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "63B, JALAN SS 25/2",
                    "auditFirmAddress2": "TAMAN BUKIT EMAS",
                    "auditFirmAddress3": "",
                    "auditFirmName": "ADRIANYEO",
                    "auditFirmNo": "AF1158",
                    "auditFirmPostcode": "47301",
                    "auditFirmState": "B",
                    "auditFirmTown": "PETALING JAYA",
                    "auditfirmFlag": "",
                    "branchkeycode": 0,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 364085,
                    "dateOfTabling": 1351612800000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1325260800000,
                    "fixedAsset": 140681,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -584823,
                    "liability": 489589,
                    "longTermLiability": 0,
                    "minorityInterest": 0,
                    "nonCurrAsset": 140681,
                    "nonCurrentLiability": 0,
                    "otherAsset": 0,
                    "paidUpCapital": 100000,
                    "reserves": 0,
                    "shareAppAccount": 500000,
                    "sharePremium": 0,
                    "totalInvestment": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "63B, JALAN SS 25/2",
                    "auditFirmAddress2": "TAMAN BUKIT EMAS",
                    "auditFirmAddress3": "",
                    "auditFirmName": "ADRIANYEO",
                    "auditFirmNo": "AF1158",
                    "auditFirmPostcode": "47301",
                    "auditFirmState": "B",
                    "auditFirmTown": "PETALING JAYA",
                    "auditfirmFlag": "",
                    "branchkeycode": 0,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 299442,
                    "dateOfTabling": 1372348800000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1356883200000,
                    "fixedAsset": 218988,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -1511382,
                    "liability": 1871150,
                    "longTermLiability": 58662,
                    "minorityInterest": 0,
                    "nonCurrAsset": 218988,
                    "nonCurrentLiability": 0,
                    "otherAsset": 0,
                    "paidUpCapital": 100000,
                    "reserves": 0,
                    "shareAppAccount": 0,
                    "sharePremium": 0,
                    "totalInvestment": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "63B, JALAN SS 25/2",
                    "auditFirmAddress2": "TAMAN BUKIT EMAS",
                    "auditFirmAddress3": "",
                    "auditFirmName": "ADRIANYEO",
                    "auditFirmNo": "AF1158",
                    "auditFirmPostcode": "47301",
                    "auditFirmState": "B",
                    "auditFirmTown": "PETALING JAYA",
                    "auditfirmFlag": "",
                    "branchkeycode": 0,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 477396,
                    "dateOfTabling": 1404057600000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1388419200000,
                    "fixedAsset": 137131,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -2420219,
                    "liability": 2885401,
                    "longTermLiability": 49345,
                    "minorityInterest": 0,
                    "nonCurrAsset": 137131,
                    "nonCurrentLiability": 0,
                    "otherAsset": 0,
                    "paidUpCapital": 100000,
                    "reserves": 0,
                    "shareAppAccount": 0,
                    "sharePremium": 0,
                    "totalInvestment": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "63B, JALAN SS 25/2",
                    "auditFirmAddress2": "TAMAN BUKIT EMAS",
                    "auditFirmAddress3": "",
                    "auditFirmName": "ADRIANYEO",
                    "auditFirmNo": "AF1158",
                    "auditFirmPostcode": "47301",
                    "auditFirmState": "B",
                    "auditFirmTown": "PETALING JAYA",
                    "auditfirmFlag": "",
                    "branchkeycode": 0,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 904189,
                    "dateOfTabling": 1435593600000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1419955200000,
                    "fixedAsset": 246185,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -3408366,
                    "liability": 4419403,
                    "longTermLiability": 39337,
                    "minorityInterest": 0,
                    "nonCurrAsset": 246185,
                    "nonCurrentLiability": 0,
                    "otherAsset": 0,
                    "paidUpCapital": 100000,
                    "reserves": 0,
                    "shareAppAccount": 0,
                    "sharePremium": 0,
                    "totalInvestment": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "63B, JALAN SS 25/2",
                    "auditFirmAddress2": "TAMAN BUKIT EMAS",
                    "auditFirmAddress3": "",
                    "auditFirmName": "ADRIANYEO PLT (LLP0003457-LCA)",
                    "auditFirmNo": "AF1158",
                    "auditFirmPostcode": "47301",
                    "auditFirmState": "B",
                    "auditFirmTown": "PETALING JAYA",
                    "auditfirmFlag": "",
                    "branchkeycode": 0,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 671357,
                    "dateOfTabling": 1476633600000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1451491200000,
                    "fixedAsset": 179830,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -4532663,
                    "liability": 4355439,
                    "longTermLiability": 28411,
                    "minorityInterest": 0,
                    "nonCurrAsset": 179830,
                    "nonCurrentLiability": 0,
                    "otherAsset": 0,
                    "paidUpCapital": 1000000,
                    "reserves": 0,
                    "shareAppAccount": 0,
                    "sharePremium": 0,
                    "totalInvestment": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "SOHO SUITES @ KLCC",
                    "auditFirmAddress2": "BLOCK A2, LEVEL 31-3",
                    "auditFirmAddress3": "NO. 20, JALAN PERAK",
                    "auditFirmName": "PETER CHONG & CO.",
                    "auditFirmNo": "AF0165",
                    "auditFirmPostcode": "50450",
                    "auditFirmState": "W",
                    "auditFirmTown": "KUALA LUMPUR",
                    "auditfirmFlag": "B",
                    "branchkeycode": 2781,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 829057,
                    "dateOfTabling": 1514390400000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1483113600000,
                    "fixedAsset": 34958,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -4655149,
                    "liability": 6500975,
                    "longTermLiability": 17248,
                    "minorityInterest": 0,
                    "nonCurrAsset": 2034017,
                    "nonCurrentLiability": 0,
                    "otherAsset": 1999059,
                    "paidUpCapital": 1000000,
                    "reserves": 0,
                    "shareAppAccount": 0,
                    "sharePremium": 0,
                    "totalInvestment": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "SOHO SUITES @ KLCC",
                    "auditFirmAddress2": "BLOCK A2, LEVEL 31-3",
                    "auditFirmAddress3": "NO. 20, JALAN PERAK",
                    "auditFirmName": "PETER CHONG & CO.",
                    "auditFirmNo": "AF0165",
                    "auditFirmPostcode": "50450",
                    "auditFirmState": "W",
                    "auditFirmTown": "KUALA LUMPUR",
                    "auditfirmFlag": "B",
                    "branchkeycode": 2781,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 3401143,
                    "dateOfTabling": 1530201600000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1514649600000,
                    "fixedAsset": 474138,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -2631513,
                    "liability": 7919205,
                    "longTermLiability": 5166,
                    "minorityInterest": 0,
                    "nonCurrAsset": 2891715,
                    "nonCurrentLiability": 0,
                    "otherAsset": 2417577,
                    "paidUpCapital": 1000000,
                    "reserves": 0,
                    "shareAppAccount": 0,
                    "sharePremium": 0,
                    "totalInvestment": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "SOHO SUITES @ KLCC",
                    "auditFirmAddress2": "BLOCK A2, LEVEL 31-3",
                    "auditFirmAddress3": "NO. 20, JALAN PERAK",
                    "auditFirmName": "PETER CHONG & CO.",
                    "auditFirmNo": "AF0165",
                    "auditFirmPostcode": "50450",
                    "auditFirmState": "W",
                    "auditFirmTown": "KUALA LUMPUR",
                    "auditfirmFlag": "B",
                    "branchkeycode": 2781,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 4009961,
                    "dateOfTabling": 1569772800000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1546185600000,
                    "fixedAsset": 582712,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -1511370,
                    "liability": 7764742,
                    "longTermLiability": 0,
                    "minorityInterest": 0,
                    "nonCurrAsset": 3243411,
                    "nonCurrentLiability": 0,
                    "otherAsset": 2660699,
                    "paidUpCapital": 1000000,
                    "reserves": 0,
                    "shareAppAccount": 0,
                    "sharePremium": 0,
                    "totalInvestment": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccType": "N",
                    "auditFirmAddress1": "SOHO SUITES @ KLCC",
                    "auditFirmAddress2": "BLOCK A2, LEVEL 31-3",
                    "auditFirmAddress3": "NO. 20, JALAN PERAK",
                    "auditFirmName": "PETER CHONG & CO.",
                    "auditFirmNo": "AF0165",
                    "auditFirmPostcode": "50450",
                    "auditFirmState": "W",
                    "auditFirmTown": "KUALA LUMPUR",
                    "auditfirmFlag": "B",
                    "branchkeycode": 2781,
                    "companyNo": "934369",
                    "contigentLiability": 0,
                    "currentAsset": 10978660,
                    "dateOfTabling": 1594656000000,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1577721600000,
                    "fixedAsset": 385027,
                    "fundAndReserve": 0,
                    "fundReserve": 0,
                    "headOfficeAccount": 0,
                    "inappropriateProfit": -261092,
                    "liability": 12855519,
                    "longTermLiability": 728292,
                    "minorityInterest": 0,
                    "nonCurrAsset": 3344059,
                    "nonCurrentLiability": 0,
                    "otherAsset": 2959032,
                    "paidUpCapital": 1000000,
                    "reserves": 0,
                    "shareAppAccount": 0,
                    "sharePremium": 0,
                    "totalInvestment": 0
                }
            ]
        },
        "rocBusinessAddressInfo": {
            "errorMsg": "",
            "infoId": "",
            "lastUpdateDate": 1530519811000,
            "successCode": "00",
            "address1": "1ST TIER WAREHOUSE",
            "address2": "WISMA COMMERCEDOTCOM",
            "address3": "NO. 15 JALAN TANDANG",
            "companyNo": "934369",
            "postcode": "46050",
            "state": "B",
            "town": "PETALING JAYA"
        },
        "rocBusinessCodeListInfo": {
            "errorMsg": "",
            "infoId": "",
            "successCode": "00",
            "rocBusinessCodeInfos": [
                {
                    "businessCode": "82191",
                    "companyNo": "934369",
                    "priority": "1"
                },
                {
                    "businessCode": "70209",
                    "companyNo": "934369",
                    "priority": "2"
                }
            ]
        },
        "rocChargesListInfo": {
            "errorMsg": "No Data",
            "infoId": "",
            "successCode": "11",
            "rocChargesInfos": null
        },
        "rocCompanyInfo": {
            "errorMsg": "",
            "infoId": "",
            "lastUpdateDate": 1570730132000,
            "successCode": "00",
            "balaceSheetInfo": "",
            "balaceSheetInfoDesc": "",
            "businessDescription": "1. INFORMATION SERVICE SUPPLY, DATA ANALYTICS AND SOFTWARE DEVELOPMENT\n2. DOCUMENTS STORAGE, MANAGEMENT SERVICES AND MOVERS",
            "checkDigit": "T",
            "companyCountry": "MAL",
            "companyName": "BIG DATAWORKS SDN. BHD.",
            "companyNo": "934369",
            "companyOldName": "BIG DATAWORKS MANAGEMENT SDN. BHD.",
            "companyStatus": "R",
            "companyType": "S",
            "currency": "RM",
            "dateOfChange": 1474473600000,
            "incomeStatInfo": "",
            "incomeStatInfoDesc": "",
            "incorpDate": 1298908800000,
            "infoColon": "",
            "latestDocUpdateDate": 1599553518000,
            "llpInfo": "",
            "llpInfoDesc": "",
            "llpName": "",
            "llpNo": "",
            "localforeignCompany": "L",
            "naBal": "",
            "naProf": "",
            "statusOfCompany": "E",
            "wupType": ""
        },
        "rocCompanyOfficerListInfo": {
            "errorMsg": "",
            "infoId": "",
            "successCode": "00",
            "rocCompanyOfficerInfos": [
                {
                    "address1": "A-1-7 SURIAN RESIDENCES CONDO",
                    "address2": "JALAN PJU 7/16",
                    "address3": "MUTIARA DAMANSARA MALAYSIA",
                    "appointmentDate": "",
                    "companyNo": "934369",
                    "designationCode": "D",
                    "dob": 129659400000,
                    "idNo": "740210065229",
                    "idType": "MK",
                    "name": "SHERIZA BIN ZAKARIA",
                    "officerInfo": "",
                    "postcode": "47810",
                    "startDate": 1551888000000,
                    "state": "B",
                    "town": "PETALING JAYA"
                },
                {
                    "address1": "32 JALAN USJ 5/1E",
                    "address2": "USJ 5",
                    "address3": "",
                    "appointmentDate": "",
                    "companyNo": "934369",
                    "designationCode": "S",
                    "dob": -182503800000,
                    "idNo": "640321075042",
                    "idType": "MK",
                    "name": "LOO CHOO MIN",
                    "officerInfo": "",
                    "postcode": "47610",
                    "startDate": 1594742400000,
                    "state": "B",
                    "town": "SUBANG JAYA"
                }
            ]
        },
        "rocDocumentLodgeListInfo": {
            "errorMsg": "",
            "infoId": "",
            "successCode": "00",
            "rocDocumentLodgeInfos": [
                {
                    "companyNo": "",
                    "documentDate": 1577721600000,
                    "formTrx": "557"
                },
                {
                    "companyNo": "",
                    "documentDate": 1546185600000,
                    "formTrx": "557"
                },
                {
                    "companyNo": "",
                    "documentDate": 1514649600000,
                    "formTrx": "557"
                },
                {
                    "companyNo": "",
                    "documentDate": 1483113600000,
                    "formTrx": "557"
                },
                {
                    "companyNo": "",
                    "documentDate": 1451491200000,
                    "formTrx": "557"
                },
                {
                    "companyNo": "",
                    "documentDate": 1419955200000,
                    "formTrx": "557"
                },
                {
                    "companyNo": "",
                    "documentDate": 1388419200000,
                    "formTrx": "557"
                },
                {
                    "companyNo": "",
                    "documentDate": 1356883200000,
                    "formTrx": "557"
                },
                {
                    "companyNo": "",
                    "documentDate": 1325260800000,
                    "formTrx": "557"
                }
            ]
        },
        "rocProfitLossListInfo": {
            "errorMsg": "",
            "infoId": "",
            "successCode": "00",
            "rocProfitLossInfos": [
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1325260800000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": 0,
                    "inappropriateProfitCf": -584823,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": -584823,
                    "profitBeforeTax": -584823,
                    "profitShareholder": -584823,
                    "revenue": 51600,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1356883200000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": -584823,
                    "inappropriateProfitCf": -1511382,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": -926559,
                    "profitBeforeTax": -926559,
                    "profitShareholder": -926559,
                    "revenue": 210012,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1388419200000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": -1511382,
                    "inappropriateProfitCf": -2420219,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": -908837,
                    "profitBeforeTax": -908837,
                    "profitShareholder": -908837,
                    "revenue": 503680,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1419955200000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": -2420219,
                    "inappropriateProfitCf": -3408366,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": -988147,
                    "profitBeforeTax": -988147,
                    "profitShareholder": -988147,
                    "revenue": 1809623,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1451491200000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": -3408366,
                    "inappropriateProfitCf": -4532663,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": -1124297,
                    "profitBeforeTax": -1124297,
                    "profitShareholder": -1124297,
                    "revenue": 601351,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1483113600000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": -4532663,
                    "inappropriateProfitCf": -4655149,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": -122486,
                    "profitBeforeTax": -122486,
                    "profitShareholder": -122486,
                    "revenue": 1175685,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1514649600000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": -4655149,
                    "inappropriateProfitCf": -2631513,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": 2023636,
                    "profitBeforeTax": 2031636,
                    "profitShareholder": 2023636,
                    "revenue": 23086652,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1546185600000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": -2631513,
                    "inappropriateProfitCf": -1511370,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": 1120143,
                    "profitBeforeTax": 1120143,
                    "profitShareholder": 1120143,
                    "revenue": 27096304,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                },
                {
                    "errorMsg": "",
                    "infoId": "",
                    "successCode": "",
                    "accrualAccount": "N",
                    "companyNo": "934369",
                    "extraOrdinaryItem": 0,
                    "financialReportType": "Y",
                    "financialYearEndDate": 1577721600000,
                    "grossDividendRate": 0,
                    "inappropriateProfitBf": -1511370,
                    "inappropriateProfitCf": -261092,
                    "minorityInterest": 0,
                    "netDividend": 0,
                    "others": 0,
                    "priorAdjustment": 0,
                    "profitAfterTax": 1250278,
                    "profitBeforeTax": 1520287,
                    "profitShareholder": 1250278,
                    "revenue": 32861634,
                    "surplusAfterTax": 0,
                    "surplusBeforeTax": 0,
                    "surplusDeficitAfterTax": 0,
                    "surplusDeficitBeforeTax": 0,
                    "totalExpenditure": 0,
                    "totalIncome": 0,
                    "totalRevenue": 0,
                    "transferred": 0,
                    "turnover": 0
                }
            ]
        },
        "rocRegAddressInfo": {
            "errorMsg": "",
            "infoId": "",
            "lastUpdateDate": 1599553518000,
            "successCode": "00",
            "address1": "LEVEL 4B, NO. 88, JALAN PERDANA,",
            "address2": "TAMAN TASIK PERDANA,",
            "address3": "",
            "companyNo": "934369",
            "postcode": "50480",
            "state": "W",
            "town": "KUALA LUMPUR"
        },
        "rocShareCapitalInfo": {
            "errorMsg": "",
            "infoId": "",
            "successCode": "00",
            "authorisedCapital": 1000000,
            "companyNo": "934369",
            "currency": "RM",
            "currenyNominal": "NOMINAL (sen)",
            "ordAIssuedCash": 0,
            "ordAIssuedNominal": 0,
            "ordAIssuedNonCash": 0,
            "ordANominalValue": 0,
            "ordANumberOfShares": 0,
            "ordAmountAValue": 0,
            "ordAmountBValue": 0,
            "ordAmountValue": 1000000,
            "ordBIssuedCash": 0,
            "ordBIssuedNominal": 0,
            "ordBIssuedNonCash": 0,
            "ordBNominalValue": 0,
            "ordBNumberOfShares": 0,
            "ordIssuedCash": 1000000,
            "ordIssuedNominal": 100,
            "ordIssuedNonCash": 0,
            "ordNominalValue": 100,
            "ordNumberOfShares": 1000000,
            "othAIssuedCash": 0,
            "othAIssuedNonCash": 0,
            "othAmountValue": 0,
            "othBIssuedCash": 0,
            "othBIssuedNonCash": 0,
            "othIssuedCash": 0,
            "othIssuedNominal": 0,
            "othIssuedNonCash": 0,
            "othNominalValue": 0,
            "othNumberOfShares": 0,
            "prefAIssuedCash": 0,
            "prefAIssuedNominal": 0,
            "prefAIssuedNonCash": 0,
            "prefANominalValue": 0,
            "prefANumberOfShares": 0,
            "prefAmountAValue": 0,
            "prefAmountBValue": 0,
            "prefAmountValue": 0,
            "prefBIssuedCash": 0,
            "prefBIssuedNominal": 0,
            "prefBIssuedNonCash": 0,
            "prefBNominalValue": 0,
            "prefBNumberOfShares": 0,
            "prefIssuedCash": 0,
            "prefIssuedNominal": 0,
            "prefIssuedNonCash": 0,
            "prefNominalValue": 0,
            "prefNumberOfShares": 0,
            "totalIssued": 1000000
        },
        "rocShareholderListInfo": {
            "errorMsg": "",
            "infoId": "",
            "successCode": "00",
            "rocShareholderInfos": [
                {
                    "companyNo": "934369",
                    "idNo": "84984-H",
                    "idType": "C",
                    "name": "PUNCAK SEMANGAT TECHNOLOGY SDN. BHD.",
                    "share": 1000000,
                    "shareVol": ""
                }
            ]
        }
    }
    )
}