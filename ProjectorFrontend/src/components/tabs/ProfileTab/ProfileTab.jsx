import React from "react";
import styles from "../Tabs.module.scss";
import ImageInput from "../../profilePictureUpload/ImageInput";
import Multiselect from "../../multiselect/specialtySelect/MultiselectSpecialty";
import MultiselectLang from "../../multiselect/languageSelect/MultiselectLanguage";

const ProfileTab = ({
  active,
  uId,
  profile,
  inputProfile,
  setProfile,
  mode,
  errors,
  email,
}) => {
  return (
    <div
      className={styles.tab_content}
      style={{ display: active === 1 ? "flex" : "none" }}
    >
      <ImageInput uId={uId} styleName={styles.custom_profile_pic_upload} />
      <h1>Расскажите о себе</h1>
      <label htmlFor="name">ИМЯ*</label>
      <input
        onChange={(e) => inputProfile("name", e)}
        disabled={mode}
        type="text"
        name="name"
        id="name"
        defaultValue={profile.name}
        placeholder="Введите..."
      />
      {errors.name && <p className="validation-message">{errors.name}</p>}
      <label htmlFor="lastName">ФАМИЛИЯ*</label>
      <input
        onChange={(e) => inputProfile("lastName", e)}
        disabled={mode}
        type="text"
        name="lastName"
        id="lastName"
        defaultValue={profile.lastName}
        placeholder="Введите..."
      />
      {errors.lastName && (
        <p className="validation-message">{errors.lastName}</p>
      )}
      <label htmlFor="email">ПОЧТА*</label>
      <input
        disabled={mode}
        type="email"
        name="email"
        id="email"
        defaultValue={email}
        placeholder="Введите..."
      />
      <label htmlFor="bio">НЕСКОЛЬКО СЛОВ О ВАС</label>
      <textarea
        onChange={(e) => inputProfile("bio", e)}
        disabled={mode}
        name="description"
        id="bio"
        defaultValue={profile.bio}
      ></textarea>
      {errors.bio && <p className="validation-message">{errors.bio}</p>}
      <p>Выберите специальность*</p>
      <Multiselect profile={profile} setProfile={setProfile} mode={mode} />
      {errors.specialties && (
        <p className="validation-message">{errors.specialties}</p>
      )}
      <p>ЯЗЫКИ</p>
      <MultiselectLang profile={profile} setProfile={setProfile} mode={mode} />
      {errors.langs && <p className="validation-message">{errors.langs}</p>}
      <label htmlFor="mobile">ТЕЛЕФОН</label>
      <input
        onChange={(e) => inputProfile("phNumber", e)}
        disabled={mode}
        type="text"
        name="mobile"
        id="mobile"
        defaultValue={profile.phNumber}
        placeholder="Введите..."
      />
      {errors.phNumber && (
        <p className="validation-message">{errors.phNumber}</p>
      )}
      <label htmlFor="tgLink">ТЕЛЕГРАМ</label>
      <input
        onChange={(e) => inputProfile("tg", e)}
        disabled={mode}
        type="text"
        name="tgLink"
        id="tgLink"
        defaultValue={profile.tg}
        placeholder="Введите..."
      />
      {errors.tg && <p className="validation-message">{errors.tg}</p>}
      <label htmlFor="socialMedia">ССЫЛКИ НА ДРУГИЕ СОЦИАЛЬНЫЕ СЕТИ</label>
      <input
        onChange={(e) => inputProfile("socials", e)}
        disabled={mode}
        type="text"
        name="socialMedia"
        id="socialMedia"
        defaultValue={profile.socials}
        placeholder="Введите..."
      />
      {errors.socials && <p className="validation-message">{errors.socials}</p>}
    </div>
  );
};

export default ProfileTab;
