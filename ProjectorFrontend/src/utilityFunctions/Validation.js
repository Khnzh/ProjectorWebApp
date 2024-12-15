const nameRegex = /^[А-Яа-я]{2,10}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
const lastNameRegex = /^[А-Яа-я]{2,20}$/;
const whitelistRegex = /^[a-zA-ZА-Яа-я0-9.,!?'"();:_@#\-\s]*$/;
const blacklistRegex = /[<>&{}|\\/%]/;
const telegramPattern = /^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/;
const socialsPatterns = [
  /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{5,}$/,
  /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}$/,
  /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
  /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]{3,100}$/,
  /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]{1,39}$/,
  /^https:\/\/(www\.)?youtube\.com\/(c|channel|user)\/[a-zA-Z0-9_-]+$/,
  /^https:\/\/(www\.)?tiktok\.com\/@?[a-zA-Z0-9_.-]{2,24}$/,
];
const phonePatterns = [/^\+7\d{10}$/, /^\7\d{10}$/, /^\8\d{10}$/];
const urlPattern = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i" // fragment locator
);

export function hasOnlySpecificStrings(obj, string) {
  return Object.values(obj).every((value) => {
    if (typeof value === "string" && value === string) {
      return true;
    } else if (Array.isArray(value) && value.every((item) => item === string)) {
      return true;
    }
    return false;
  });
}

export function profileValidation(value) {
  const errors = {};

  if (hasOnlySpecificStrings(value, "")) return errors;

  if (value.name) {
    if (!nameRegex.test(value.name))
      errors.name = "Имя должно содержать не больше 10 букв";
  } else {
    errors.name = "Заполните поле";
  }

  if (value.lastName) {
    if (!lastNameRegex.test(value.lastName))
      errors.lastName = "Фамилия должна содержать не больше 20 букв";
  } else {
    errors.lastName = "Заполните поле";
  }

  if (value.bio) {
    if (whitelistRegex.test(value.bio) && !blacklistRegex.test(value.bio)) {
      if (value.bio.length > 250) {
        errors.bio = "Используйте не больше 250 символов";
      }
    } else errors.bio = `Используйте только буквы и специальные символы`;
  }

  if (value.langs && value.langs.length > 5)
    errors.langs = "Выберите не больше пяти";

  if (value.phNumber) {
    if (!phonePatterns.some((pattern) => pattern.test(value.phNumber))) {
      errors.phNumber = `Некорректный номер`;
    }
  }

  if (value.socials) {
    if (!socialsPatterns.some((pattern) => pattern.test(value.socials))) {
      errors.socials = `Некорректная ссылка профиля`;
    }
  }

  if (value.specialties) {
    if (value.specialties.length > 5)
      errors.specialties = "Выберите не больше пяти";
  } else {
    errors.specialties = "Заполните поле";
  }

  if (value.tg) {
    if (!telegramPattern.test(value.tg)) {
      errors.tg = `Некорректная ссылка профиля`;
    }
  }

  return errors;
}

export function signupValidation(value) {
  const errors = {};

  if (value.name) {
    if (!nameRegex.test(value.name))
      errors.name = "Имя должно содержать не больше 10 букв";
  } else {
    errors.name = "Заполните поле";
  }

  if (value.lastName) {
    if (!lastNameRegex.test(value.lastName))
      errors.lastName = "Фамилия должна содержать не больше 20 букв";
  } else {
    errors.lastName = "Заполните поле";
  }

  if (value.mail) {
    if (!emailPattern.test(value.mail) || blacklistRegex.test(value.mail))
      errors.mail = "Введите корректную почту";
  } else {
    errors.mail = "Заполните поле";
  }

  if (value.dob) {
    const difference = new Date() - new Date(value.dob);
    const hundredYears = 3155695200000;
    const fourteenYears = 441797328000;
    if (
      difference > hundredYears ||
      difference < fourteenYears ||
      blacklistRegex.test(value.dob)
    )
      errors.dob = "Введите корректную дату";
  } else {
    errors.dob = "Заполните поле";
  }

  if (value.password) {
    if (
      !passwordPattern.test(value.password) ||
      blacklistRegex.test(value.password)
    ) {
      errors.password = "Слабый пароль";
    }
  } else {
    errors.password = "Заполните поле";
  }

  if (value.sex !== "false" && value.sex !== "true")
    errors.sex = "Укажите свой пол";

  if (!value.policy)
    errors.policy = "Подтвердите согласие с политикой конфиденциальности";

  if (!value.agreement)
    errors.agreement = "Подтвердите согласие на обработку персональных данных";

  return errors;
}

export function portfolioValidation(value) {
  const errors = {
    prName: [],
    description: [],
    role: [],
    link: [],
    year: [],
  };

  if (hasOnlySpecificStrings(value, "")) return errors;

  value.map((item) => {
    if (item.name) {
      if (!nameRegex.test(item.name)) {
        errors.prName = [
          ...errors.prName,
          "Имя должно содержать не больше 10 букв",
        ];
      } else {
        errors.prName = [...errors.prName, ""];
      }
    } else {
      errors.prName = [...errors.prName, "Заполните поле"];
    }

    if (item.description) {
      if (
        whitelistRegex.test(item.description) &&
        !blacklistRegex.test(item.description)
      ) {
        if (item.description.length > 250) {
          errors.description = [
            ...errors.description,
            "Используйте не больше 250 символов",
          ];
        } else {
          errors.description = [...errors.description, ""];
        }
      } else
        errors.description = [
          ...errors.description,
          `Используйте только буквы и специальные символы`,
        ];
    } else {
      errors.description = [...errors.description, ""];
    }

    if (item.role) {
      if (whitelistRegex.test(item.role) && !blacklistRegex.test(item.role)) {
        if (item.role.length > 30) {
          errors.role = [...errors.role, "Используйте не больше 300 символов"];
        } else {
          errors.role = [...errors.role, ""];
        }
      } else
        errors.role = [
          ...errors.role,
          `Используйте только буквы и специальные символы`,
        ];
    } else {
      errors.role = [...errors.role, "Заполните поле"];
    }

    if (item.link) {
      if (urlPattern.test(item.link)) {
        if (item.link.length > 50) {
          errors.link = [...errors.link, "Используйте не больше 50 символов"];
        } else {
          errors.link = [...errors.link, ""];
        }
      } else errors.link = [...errors.link, `Некорректная ссылка`];
    } else {
      errors.link = [...errors.link, ""];
    }

    if (item.year) {
      if (item.year < 1950 || item.year > new Date().getFullYear()) {
        errors.year = [
          ...errors.year,
          "Введите корректную дату в формате ГГГГ",
        ];
      } else {
        errors.year = [...errors.year, ""];
      }
    } else {
      errors.year = [...errors.year, "Заполните поле"];
    }
  });

  return errors;
}

export function educationValidation(value) {
  const errors = {
    mastery: [],
    eduType: [],
    enrollment: [],
    facility: [],
    faculty: [],
    grad: [],
  };

  if (hasOnlySpecificStrings(value, "")) return errors;

  value.map((item) => {
    if (item.eduType !== "additional" && item.eduType !== "general") {
      errors.eduType = [...errors.eduType, "Заполните поле"];
    }

    if (item.mastery) {
      if (
        whitelistRegex.test(item.mastery) &&
        !blacklistRegex.test(item.mastery)
      ) {
        if (item.mastery.length > 50) {
          errors.mastery = [
            ...errors.mastery,
            "Используйте не больше 50 символов",
          ];
        } else {
          errors.mastery = [...errors.mastery, ""];
        }
      } else
        errors.mastery = [
          ...errors.mastery,
          `Используйте только буквы и специальные символы`,
        ];
    } else {
      errors.mastery = [...errors.mastery, ""];
    }

    if (item.faculty) {
      if (
        whitelistRegex.test(item.faculty) &&
        !blacklistRegex.test(item.faculty)
      ) {
        if (item.faculty.length > 50) {
          errors.faculty = [
            ...errors.faculty,
            "Используйте не больше 50 символов",
          ];
        } else {
          errors.faculty = [...errors.faculty, ""];
        }
      } else
        errors.faculty = [
          ...errors.faculty,
          `Используйте только буквы и специальные символы`,
        ];
    } else {
      errors.faculty = [...errors.faculty, "Заполните поле"];
    }

    if (item.facility) {
      if (
        whitelistRegex.test(item.facility) &&
        !blacklistRegex.test(item.facility)
      ) {
        if (item.facility.length > 50) {
          errors.facility = [
            ...errors.facility,
            "Используйте не больше 50 символов",
          ];
        } else {
          errors.facility = [...errors.facility, ""];
        }
      } else
        errors.facility = [
          ...errors.facility,
          `Испольйте буквы и специальные символы`,
        ];
    } else {
      errors.facility = [...errors.facility, "Заполните поле"];
    }

    if (item.grad) {
      if (item.grad < 1950 || item.grad > new Date().getFullYear()) {
        errors.grad = [
          ...errors.grad,
          "Введите корректную дату в формате ГГГГ",
        ];
      } else {
        errors.grad = [...errors.grad, ""];
      }
    } else {
      errors.grad = [...errors.grad, "Заполните поле"];
    }

    if (item.enrollment) {
      if (
        item.enrollment < 1950 ||
        item.enrollment > new Date().getFullYear()
      ) {
        errors.enrollment = [
          ...errors.enrollment,
          "Введите корректную дату в формате ГГГГ",
        ];
      } else {
        errors.enrollment = [...errors.enrollment, ""];
      }
    } else {
      errors.enrollment = [...errors.enrollment, "Заполните поле"];
    }
  });

  return errors;
}
