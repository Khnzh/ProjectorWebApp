export default function setCanvasPreview (shrinkedCanvas, image, canvas, crop) {
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("No 2d context");

  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();

  const resizeCtx = shrinkedCanvas.getContext("2d");
  
  shrinkedCanvas.width = 170;
  shrinkedCanvas.height = 170;

  // Draw the cropped image onto the resized canvas
  resizeCtx.drawImage(canvas, 0, 0, canvas.width , canvas.height , 0, 0, 170, 170);
}