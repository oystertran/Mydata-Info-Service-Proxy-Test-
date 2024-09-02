exports.INCORP_STATUS_Q = 'incorp-status';
exports.WORK_PROFILE = 'WORK.PROFILE';

exports.QUEUE = {
    // incoming queue
    CHECK: 'check',
    INFO: 'info'

    // out-going queue
}

function setQueueName(env, app, qname) {
    return env + '-' + app + '-' + qname;
}
exports.setQueueName = setQueueName;