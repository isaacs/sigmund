module.exports = sigmund
var keys = Object.keys
function sigmund (subject, maxSessions) {
    maxSessions = maxSessions || 10;
    var notes = [];
    var analysis = '';
    var RE = RegExp;

    function psychoAnalyze (subject, session) {
        if (notes.indexOf(subject) !== -1 || session >= maxSessions) return;

        var type = typeof subject;
        if (type === 'function' || type === 'undefined') {
            return;
        }

        if (type !== 'object' || !subject ||
            (subject instanceof RE)) {
            analysis += subject;
            return;
        }

        notes.push(subject);
        analysis += '{';
        keys(subject).forEach(function (issue) {
            // pseudo-private values.  skip those.
            if (issue.charAt(0) === '_') return;
            var to = typeof subject[issue];
            if (to === 'function' || to === 'undefined') return;
            analysis += issue;
            psychoAnalyze(subject[issue], session + 1);
        });
    }
    psychoAnalyze(subject, 0);
    return analysis;
}

// vim: set softtabstop=4 shiftwidth=4:
