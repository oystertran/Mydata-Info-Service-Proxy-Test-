// product
exports.SERVICE = {
    ENTITY: {
        REG_INFO: 'entyRegInfo',
        REG_NEW_FORMAT: 'entyRegNewFormat',
        REG_DATE_RANGE: 'entyRegDateRange',
        REG_DATE_RANGE_CNT: 'entyRegDateRangeCnt',
        REG_DATE_RANGE_PAGE: 'entyRegDateRangePage'
    },

    PROFILE: {
        BUSINESS: 'bizProfile',
        COMPANY: 'compProfile',
        BUSINESS_CTC: 'bizProfileCTC',
        COMPANY_CTC: 'compProfileCTC'
    },

    ACGS: {
        QUERY: 'acgsQuery',
        INFO: 'acgsInfo',
        DOCS: 'acgsDocs'
    },

    CERT: {
        CHECK: {
            IS_NAME_CHANGED: 'isNameChanged',
            IS_COMPANY_CONVERTED: 'isCompanyConverted',
            IS_ACT_2016: 'isAct2016',
            IS_COMP_CLBG: 'isCompCLBG'
        },
        PURC: {
            CERT_INCORP: 'certIncorp',
            CERT_INCORP_CTC: 'certIncorpCTC',
            CERT_INCORP_FOREIGN: 'certRegForeign',
            CERT_INCORP_FOREIGN_CTC: 'certRegForeignCtc',
            CERT_COMPNAMECHG: 'certCompNameChg',
            CERT_COMPNAMECHG_CTC: 'certCompNameChgCTC',
            CERT_CONVERSION: 'certConversion',
            CERT_CONVERSION_CTC: 'certConversionCTC'
        }
    },

    BIZ: {
        CHECK: {
            BRANCH_LIST: 'branchList',
            IS_TERMINATED: 'isBizTerminated'
        },
        PURC: {
            CERT_CTC: 'bizCertCTC',
            TERMINATED: 'bizTerminated',
            TERMINATED_CTC: 'bizTerminatedCTC'
        }
    },

    FINCOMP: {
        YEAR: 'finYear',
        INFO: 'finInfo',
        FIN00: 'finComp00',
        FIN02: 'finComp02',
        FIN03: 'finComp03',
        FIN05: 'finComp05',
        FIN10: 'finComp10'
    },

    PARTICULAR: {
        AUDIT: 'audit',
        AUDIT_CTC: 'auditCTC',
        COSEC: 'cosec',
        COSEC_CTC: 'cosecCTC',
        OFFICER: 'officer',
        OFFICER_CTC: 'officerCTC',
        SHAREHOLDER: 'shareholder',
        SHAREHOLDER_CTC: 'shareholderCTC',
        SHARECAPITAL: 'sharecapital',
        SHARECAPITAL_CTC: 'sharecapitalCTC',
        ADDRESS: 'address',
        ADDRESS_CTC: 'addressCTC'
    },

    CHARGES: {
        IS_CHARGE_LIST: 'isChargeList',
        INFO: 'chargesInfo',
        INFO_CTC: 'chargesInfoCTC'
    },
};
