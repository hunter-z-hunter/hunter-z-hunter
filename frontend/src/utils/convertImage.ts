import sharp from "sharp";

export default async function convertImage(file: Buffer): Promise<number[]> {
  // Resize the image to 28x28 and convert to grayscale
  // Our options here on resize are:
  //  cover (preserve aspect ratio by cropping), contain (create margin where necessary), fill (stretch)
  const image = await sharp(file).resize(28, 28, { fit: "cover" }).grayscale().raw().toBuffer();
  console.log(`Resized image length: ${image.length}`);

  // Convert the image buffer to a Float32Array of values in the range [0, 1]
  const values = new Float32Array(image.length);
  for (let i = 0; i < image.length; i++) {
    values[i] = image[i] / 255.0;
  }

  // Convert the Float32Array to a regular array and return it
  return Array.from(values);
}
