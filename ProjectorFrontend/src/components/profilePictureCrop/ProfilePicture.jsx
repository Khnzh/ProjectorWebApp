import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import setCanvasPreview from "../../utilityFunctions/setCanvasPreview";
import Loader from "../../components/loader/Loader";
import "react-image-crop/src/ReactCrop.scss";
import styles from "./ProfilePicture.module.scss";

const MIN_DIMENSION = 150;

const ProfilePicture = ({ location }) => {
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uId, setUid] = useState("");

  const imgRef = useRef(null);
  const canvasPreviewRef = useRef(null);
  const shrinkedCanvasRef = useRef(null);

  // Инициализация данных из URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSrc(params.get("src"));
    setUid(params.get("uId"));
  }, [location]);

  const canvasToBlob = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas is empty"));
      }, "image/png");
    });
  };

  const uploadCanvasImage = async (canvas) => {
    try {
      const blob = await canvasToBlob(canvas);
      const fileName = `avatar.png`;

      const { data, error } = await supabase.storage
        .from("profile_photos")
        .upload(`${uId}/${fileName}`, blob, {
          cacheControl: "3600",
          upsert: true,
          contentType: "image/png",
        });

      if (error) {
        throw error;
      }

      console.log("Image uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error;
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    if (!width || !height) throw new Error("Invalid image dimensions");

    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      1,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleCropPreview = async () => {
    setLoading(true);
    setError("");

    try {
      setCanvasPreview(
        shrinkedCanvasRef.current,
        imgRef.current,
        canvasPreviewRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
      );

      const avatarURL = shrinkedCanvasRef.current.toDataURL();

      await uploadCanvasImage(shrinkedCanvasRef.current);
      console.log("Image successfully processed and uploaded.");
    } catch (error) {
      console.error("Error processing the cropped image:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ReactCrop
            crop={crop}
            aspect={1}
            circularCrop={true}
            minWidth={MIN_DIMENSION}
            ruleOfThirds={true}
            onChange={(crop, percentCrop) => setCrop(percentCrop)}
          >
            <img ref={imgRef} src={src} alt="Upload" onLoad={onImageLoad} />
          </ReactCrop>

          <button
            className={styles.cancelButton}
            onClick={() => window.close()} // Закрытие вкладки
          >
            Отмена
          </button>

          <button className={styles.saveButton} onClick={handleCropPreview}>
            Сохранить
          </button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <canvas ref={shrinkedCanvasRef} style={{ display: "none" }} />
      {crop && (
        <canvas
          ref={canvasPreviewRef}
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
