'use client';

import { useState } from 'react';

const VideoImport = () => {
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProgress(0);
    setUploading(true);
    setFileName(file.name);

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        const uploadedPath = `/uploads/${res.file}`;
        setVideoUrl(uploadedPath);
        alert('✅ Upload complete!');
      } else {
        alert('❌ Upload failed.');
      }
      setUploading(false);
    };

    xhr.onerror = () => {
      alert('❌ Upload error.');
      setUploading(false);
    };

    xhr.send(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded shadow">
      <label className="block mb-2 font-medium text-sm">Upload a video</label>
      <input
        type="file"
        accept="video/*"
        className="mb-4 bg-svm-1"
        onChange={handleUpload}
      />

      {uploading && (
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!uploading && videoUrl && (
        <div className="mt-4">
          <p className="mb-2 text-green-600">Uploaded: {fileName}</p>
          <video controls src={videoUrl} className="w-full rounded" />
        </div>
      )}
    </div>
  );
};

export default VideoImport;
