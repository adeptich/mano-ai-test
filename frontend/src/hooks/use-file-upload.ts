import { useEffect, useState } from "react";
import Papa from "papaparse";
import { VALIDATION_SCHEMA, ValidationData } from "~/constants/validation-schema";
import { validateRow } from "~/utils/validate-row";

interface FileInfo {
  name: string;
  size: string;
  type: string;
}

export const useFileUpload = ({ onError }) => {
  const [data, setData] = useState<ValidationData[]>([]);
  const [errors, setErrors] = useState([]);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  const validateData = async (data: ValidationData[]) => {
    const errors = [];

    for (const [index, row] of data.entries()) {
      const error = await validateRow(row, VALIDATION_SCHEMA);
      if (error) {
        errors.push({ row: index + 1, error });
      }
    }

    if (errors.length > 0) {
      onError();
      setErrors(errors);
    } else {
      setData(data);
    }
  };

  const handleGetFileInfo = (file: File) => {
    setFileInfo({
      name: file.name,
      size: (file.size / 1024).toFixed(2),
      type: file.type,
    });
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    setData([]);
    setErrors([]);
    setFileInfo(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      async: true,
      complete: async (results) => {
        setData(results.data);
      },
      error: (error: Error) => {
        onError();
        setErrors([`Parsing error: ${error.message}`]);
      },
    });
  };

  const handleChangeValue = (event) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[event.node.rowIndex] = event.data;
      return updatedData;
    });
  };

  useEffect(() => {
    validateData(data);
  }, [data]);

  return {
    data,
    errors,
    fileInfo,
    validateData,
    handleFileUpload,
    handleGetFileInfo,
    handleChangeValue,
  };
};
