import { useCallback, useState } from "react";

import { DataGrid } from "~/components/data-grid";
import { useFileUpload } from "~/hooks/use-file-upload";
import { useGridColumns } from "~/hooks/use-grid";
import { VALIDATION_SCHEMA } from "~/constants/validation-schema";
import { FileUpload } from "~/components/file-upload";
import { Button, Text, Group } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { AxiosError } from "axios";

export default function MainPage() {
  const [currentStep, setCurrentStep] = useState<"upload" | "validate" | "send">("upload");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const columns = useGridColumns(VALIDATION_SCHEMA);

  const onError = () => {
    setCurrentStep("upload");
  };

  const { data, errors, fileInfo, handleFileUpload, handleGetFileInfo, handleChangeValue } = useFileUpload({ onError });

  const onValidateFile = useCallback(() => {
    handleFileUpload(file);
    setCurrentStep("send");
  }, [file]);

  const onUploadFile = useCallback((file: File) => {
    handleGetFileInfo(file);
    setFile(file);
    setCurrentStep("validate");
  }, []);

  const sendFile = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // TODO: send data...
      // await axios.post("/upload-csv", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      alert("File uploaded successfully");
    } catch (e) {
      console.error("Error uploading file:", e);

      const error = e as AxiosError;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case "validate":
        return (
          <Button variant="outline" className="w-full" onClick={onValidateFile}>
            Validate File
          </Button>
        );
      case "send":
        return (
          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={sendFile}>
              {isLoading ? "Sending..." : "Send File"}
            </Button>
            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
          </div>
        );

      default:
        return <FileUpload onUpload={onUploadFile} />;
    }
  }, [currentStep]);

  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-400 text-center p-6">
      <div className="size-full flex flex-col gap-8">
        <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Claims Data Validator</h1>

          {renderStep()}

          {fileInfo && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <Group align="center">
                <IconFile size={24} className="text-gray-500" />
                <div className="flex-1 ml-2">
                  <Text size="sm" className="font-medium text-gray-800">
                    {fileInfo.name}
                  </Text>
                  <Text size="xs" className="text-gray-500">
                    {fileInfo.size} KB
                  </Text>
                  <Text size="xs" className="text-gray-400">
                    {fileInfo.type}
                  </Text>
                </div>
              </Group>
            </div>
          )}
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Validation Errors:</h2>
            <ul className="list-disc pl-5">
              {errors.map((errData, index) => (
                <li key={index} className="mb-1">
                  {errData.error}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.length > 0 && !errors.length && <DataGrid data={data} columns={columns} onChange={handleChangeValue} />}
      </div>
    </div>
  );
}
