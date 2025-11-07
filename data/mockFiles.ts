export interface UploadedFile {
  id: string;
  name: string;
  size: number; // in bytes
  type: string;
  uploadedAt: string;
}

export const mockFiles: UploadedFile[] = [
  {
    id: "1",
    name: "Product_Catalog_2024.pdf",
    size: 2457600, // 2.4 MB
    type: "application/pdf",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "2",
    name: "Customer_FAQ_Document.docx",
    size: 524288, // 512 KB
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: "3",
    name: "Product_Specifications.xlsx",
    size: 1048576, // 1 MB
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "4",
    name: "Training_Manual_2024.pdf",
    size: 3145728, // 3 MB
    type: "application/pdf",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "5",
    name: "Company_Policies.pdf",
    size: 786432, // 768 KB
    type: "application/pdf",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "6",
    name: "Sales_Data_Q1.csv",
    size: 204800, // 200 KB
    type: "text/csv",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "7",
    name: "User_Guide_v2.pdf",
    size: 1572864, // 1.5 MB
    type: "application/pdf",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "8",
    name: "Support_Templates.docx",
    size: 327680, // 320 KB
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
];

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

