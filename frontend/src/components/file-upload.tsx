import { ChangeEvent } from "react";
import { Button } from "@mantine/core";

export const FileUpload = ({ onUpload }) => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onUpload(file);
  };

  return (
    <>
      <Button variant="outline" className="w-full" onClick={() => document.getElementById("fileInput")?.click()}>
        Upload File
      </Button>

      <input id="fileInput" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
    </>
  );
};
