/* eslint-disable @typescript-eslint/no-explicit-any */
export const previewImage = (e: any, setImagePreview: any, setImage: any) => {

  const file = e.target.files[0];
  setImage(file);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setImagePreview(reader.result);
  }
}