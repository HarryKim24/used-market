export const previewImage = (e: any, setImagePreview: any, setImage: any) => {

  const file = e.target.files[0];
  setImage(file);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log(reader.result);
    setImagePreview(reader.result);
  }
}