import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import type { UploadedFile } from "../types";

const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading" as const,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          newFiles.some((nf) => nf.id === f.id)
            ? { ...f, status: "success", progress: 100 }
            : f
        )
      );
    }, 1000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="container-padding section-spacing"
      style={{ maxWidth: 700, margin: "0 auto" }}
    >
      <h1>Document Upload</h1>
      <div
        {...getRootProps()}
        className="card"
        style={{
          border: "2px dashed #38bdf8",
          textAlign: "center",
          cursor: "pointer",
          background: isDragActive ? "#0ea5e9" : "#222",
          color: isDragActive ? "#fff" : "#ccc",
          padding: 32,
          marginBottom: 24,
        }}
      >
        <input {...getInputProps()} />
        <DocumentArrowUpIcon
          style={{ height: 48, width: 48, color: "#38bdf8", margin: "0 auto" }}
        />
        <p style={{ margin: "1rem 0 0 0", fontSize: 16 }}>
          {isDragActive
            ? "Drop the files here..."
            : "Drag and drop files here, or click to select files"}
        </p>
        <p style={{ margin: "0.5rem 0 0 0", fontSize: 12, color: "#aaa" }}>
          Supported formats: PDF, PNG, JPG
        </p>
      </div>
      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Uploaded Files</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {files.map((file) => (
              <li
                key={file.id}
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                  background: "#181818",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <DocumentArrowUpIcon
                    style={{ height: 24, width: 24, color: "#38bdf8" }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: 500 }}>{file.name}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#aaa" }}>
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {file.status === "uploading" && (
                    <div
                      style={{
                        width: 96,
                        height: 8,
                        background: "#333",
                        borderRadius: 4,
                      }}
                    >
                      <div
                        style={{
                          height: 8,
                          background: "#0ea5e9",
                          borderRadius: 4,
                          width: `${file.progress}%`,
                        }}
                      />
                    </div>
                  )}
                  {file.status === "success" && (
                    <span style={{ color: "#22c55e", fontSize: 14 }}>
                      Success
                    </span>
                  )}
                  {file.status === "error" && (
                    <span style={{ color: "#ef4444", fontSize: 14 }}>
                      Error
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
