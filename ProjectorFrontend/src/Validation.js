const nameRegex = /^[А-Яа-я]{2,10}$/;
const lastNameRegex = /^[А-Яа-я]{2,20}$/;
const whitelistRegex = /^[a-zA-ZА-Яа-я0-9.,!?'"();:_@#\-\s]*$/;
const blacklistRegex = /[<>&{}|\\/%]/
const telegramPattern = /^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/;
const socialsPatterns = [
    /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{5,}$/,
    /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}$/,
    /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
    /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]{3,100}$/,
    /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]{1,39}$/,
    /^https:\/\/(www\.)?youtube\.com\/(c|channel|user)\/[a-zA-Z0-9_-]+$/,
    /^https:\/\/(www\.)?tiktok\.com\/@?[a-zA-Z0-9_.-]{2,24}$/
]
const phonePatterns = [
    /^\+7\d{10}$/,
    /^\7\d{10}$/,
    /^\8\d{10}$/
];
const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$", "i" // fragment locator
  );


export function profileValidation(value){
    const errors = {};

    if (value.name.length > 0){
        if (!nameRegex.test(value.name)) errors.name = 'Name must contain only alphabetic symbols and not exceed 10 cahracters'
    } else {
        errors.name = 'Cannot be empty'
    }

    if (value.lastName.length > 0){
        if (!lastNameRegex.test(value.lastName)) errors.lastName = 'Last name must contain only alphabetic symbols and not exceed 20 characters'
    } else {
        errors.lastName = 'Cannot be empty'
    }

    if (value.bio.length > 0){
        if (whitelistRegex.test(value.bio) && !blacklistRegex.test(value.bio)) {
            if (value.bio.length > 250) {errors.bio = 'Can not exceed 250 characters'}
        } else errors.bio = `Only alphabetic and special symbols(.,!?'"();:_@#\-) are allowed`;
    }
    
    if (value.langs.length > 5) errors.langs = 'Choose up to 5 languages';

    if (value.phNumber.length > 0){
        if (!phonePatterns.some(pattern => pattern.test(value.phNumber))) {
            errors.phNumber = `Input valid phode number, only russian region is accepted`
        }
    }

    if (value.socials.length > 0){
        if (!socialsPatterns.some(pattern => pattern.test(value.socials))) {
            errors.socials = `Input valid profile link`
        }
    }

    if (value.specialties.length > 0){
        if (value.specialties.length > 5) errors.specialties = 'Can not exceed 5'
    } else {
        errors.specialties = 'Can not be empty'
    }

    if (value.tg.length>0){
        if (!telegramPattern.test(value.tg)){
            errors.tg = `Input valid profile link`
        }
    }

    return errors;
}

export function portfolioValidation(value, i){
    const errors = {
        prName: [],
        desc: [],
        role: [],
        link: [],
        year: [],
    };

    for (let iteration = 0; iteration <= i; iteration++) {
        if (value.name[iteration].length > 0){
            if (!nameRegex.test(value.name[iteration])) {errors.prName = [...errors.prName, 'Name must contain only alphabetic symbols and not exceed 10 cahracters']}
            else {errors.prName = [...errors.prName, '']}
        } else {
            errors.prName = [...errors.prName, 'Cannot be empty']
        }

        if (value.desc[iteration].length > 0){
            if (whitelistRegex.test(value.desc[iteration]) && !blacklistRegex.test(value.desc[iteration])) {
                if (value.desc[iteration].length > 250) {errors.desc = [...errors.desc, 'Can not exceed 250 characters']}
                else {errors.desc = [...errors.desc, '']}
            } else errors.desc = [...errors.desc, `Only alphabetic and special symbols(.,!?'"();:_@#\-) are allowed`];
        } else {errors.desc = [...errors.desc, '']}

        if (value.role[iteration].length > 0){
            if (whitelistRegex.test(value.role[iteration]) && !blacklistRegex.test(value.role[iteration])) {
                if (value.role[iteration].length > 30) {errors.role = [...errors.role, 'Can not exceed 30 characters']}
                else {errors.role = [...errors.role, '']}
            } else errors.role= [...errors.role, `Only alphabetic and special symbols(.,!?'"();:_@#\-) are allowed`];
        } else {
            errors.role = [...errors.role, 'Cannot be empty']
        }

        if (value.link[iteration].length > 0){
            if (urlPattern.test(value.link[iteration])) {
                if (value.link[iteration].length > 50) {errors.link = [...errors.link, 'Can not exceed 50 characters']}
                else {errors.link = [...errors.link, '']}
            } else errors.link = [...errors.link, `Invalid link`];
        } else {
            errors.link = [...errors.link, '']
        }

        if (value.year[iteration].length >0){
            if (value.year[iteration]<1950 || value.year[iteration]> new Date().getFullYear()) {errors.year = [...errors.year, 'Input valid year in YYYY format']}
            else {errors.year = [...errors.year, '']}
        } else {
            errors.year = [...errors.year,'Cannot be empty']
        }
    }

    return errors;
}

export function educationValidation(value, i){
    const errors = {
        mastery: [],
        eduType: [],
        enrollment: [],
        facility: [],
        faculty: [],
        grad: [],
    };

    for (let iteration = 0; iteration <= i; iteration++){
        if (value.eduType[iteration]!=='additional' && value.eduType[iteration]!=='general') {
            errors.eduType = [...errors.eduType, 'Cannot be empty']
        }

        if (value.mastery[iteration].length > 0){
            if (whitelistRegex.test(value.mastery[iteration]) && !blacklistRegex.test(value.mastery[iteration])) {
                if (value.mastery[iteration].length > 50) {errors.mastery = [...errors.mastery, 'Can not exceed 50 characters']}
                else {errors.mastery = [...errors.mastery, '']}
            } else errors.mastery = [...errors.mastery, `Only alphabetic and special symbols can be used`];
        } else {
            errors.mastery = [...errors.mastery, '']
        }

        if (value.faculty[iteration].length > 0){
            if (whitelistRegex.test(value.faculty[iteration]) && !blacklistRegex.test(value.faculty[iteration])) {
                if (value.faculty[iteration].length > 50) {errors.faculty = [...errors.faculty, 'Can not exceed 50 characters']}
                else {errors.faculty = [...errors.faculty, '']}
            } else errors.faculty = [...errors.faculty, `Only alphabetic and special symbols can be used`];
        } else {
            errors.faculty = [...errors.faculty, 'Cannot be empty']
        }

        if (value.facility[iteration].length > 0){
            if (whitelistRegex.test(value.facility[iteration]) && !blacklistRegex.test(value.facility[iteration])) {
                if (value.facility[iteration].length > 50) {errors.facility = [...errors.facility, 'Can not exceed 50 characters']}
                else {errors.facility = [...errors.facility, '']}
            } else errors.facility = [...errors.facility, `Only alphabetic and special symbols can be used`];
        } else {
            errors.facility = [...errors.facility, 'Cannot be empty']
        }

        if (value.grad[iteration].length >0){
            if (value.grad[iteration]<1950 || value.grad[iteration]> new Date().getFullYear()) {errors.grad = [...errors.grad, 'Input valid grad in YYYY format']}
            else {errors.grad = [...errors.grad, '']}
        } else {
            errors.grad = [...errors.grad,'Cannot be empty']
        }

        if (value.enrollment[iteration].length >0){
            if (value.enrollment[iteration]<1950 || value.enrollment[iteration]> new Date().getFullYear()) {errors.enrollment = [...errors.enrollment, 'Input valid enrollment in YYYY format']}
            else {errors.enrollment = [...errors.enrollment, '']}
        } else {
            errors.enrollment = [...errors.enrollment,'Cannot be empty']
        }
    }

    return errors;
}
