class user_response{
    _message;
    _other_desc;
    _date;
    _nlpRating;
    _userRating;
    _orgRating;
    _action;
    _learning;
    _personal;
    _perspective;
    _applied;
    _national;
    _community;
    _resonate;
    _other;
    get other_desc() {
        return this._other_desc;
    }

    set other_desc(value) {
        this._other_desc = value;
    }
    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get nlpRating() {
        return this._nlpRating;
    }

    set nlpRating(value) {
        this._nlpRating = value;
    }
    get userRating() {
        return this._userRating;
    }

    set userRating(value) {
        this._userRating = value;
    }

    get nplRating() {
        return this._nlpRating;
    }

    set nplRating(value) {
        this._nlpRating = value;
    }

    get orgRating() {
        return this._orgRating;
    }

    set orgRating(value) {
        this._orgRating = value;
    }
    get action() {
        return this._action;
    }

    set action(value) {
        this._action = value;
    }

    get learning() {
        return this._learning;
    }

    set learning(value) {
        this._learning = value;
    }

    get resonate() {
        return this._resonate;
    }

    set resonate(value) {
        this._resonate = value;
    }

    get other() {
        return this._other;
    }

    set other(value) {
        this._other = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get national() {
        return this._national;
    }

    set national(value) {
        this._national = value;
    }

    get community() {
        return this._community;
    }

    set community(value) {
        this._community = value;
    }

    get applied() {
        return this._applied;
    }

    set applied(value) {
        this._applied = value;
    }

    get perspective() {
        return this._perspective;
    }

    set perspective(value) {
        this._perspective = value;
    }

    get personal() {
        return this._personal;
    }

    set personal(value) {
        this._personal = value;
    }

    constructor(action=false, learning=false, resonate=false, other=false, other_desc = 'unknown',
                message='unknown', date = Date.now(),
                national='unknown', community='unknown', applied = 'unknown', perspective = 'unknown', personal = 'unknown',
                userRating = 0, nlpRating =  0, orgRating = 0){
        this._action = action;
        this._learning = learning;
        this._resonate = resonate;
        this._other = other;
        this._message = message;
        this._national = national;
        this._community = community;
        this._applied = applied;
        this._perspective = perspective;
        this._personal = personal;
        this._userRating = userRating;
        this._nlpRating = nlpRating;
        this._orgRating = orgRating;
        this._date = date;
        this._other_desc = other_desc;
    }

}