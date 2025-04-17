import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('http://localhost:5000/api/assets/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setUploadedUrl(data.url);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload an Image</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && <img src={preview} alt="Preview" className="my-4 w-full rounded shadow" />}

      <button
        onClick={handleUpload}
        className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900"
      >
        Upload
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p className="font-semibold">Uploaded Image:</p>
          <img src={uploadedUrl} alt="Uploaded" className="mt-2 w-full rounded shadow" />
        </div>
      )}
    </div>
  );
}
