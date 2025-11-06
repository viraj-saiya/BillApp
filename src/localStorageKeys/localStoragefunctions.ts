import { BusinessInfoSchema, type BusinessInfo } from "../types/bussinessInfo";
import { isNullOrEmpty } from "../utils/functions/helperFunctions";
import { USER_BUSINESS_INFO_LOCAL_STORAGE_KEY } from "./localStorageKeys";




export const getLocalStorageBusinessData = (): BusinessInfo | null => {
  const data = localStorage.getItem(USER_BUSINESS_INFO_LOCAL_STORAGE_KEY);

  if (isNullOrEmpty(data)) {
    return null;
  }

  try {
    const parsedData = BusinessInfoSchema.parse(JSON.parse(data as string));
    if (isNullOrEmpty(parsedData)) return null;
    return parsedData;
  } catch (error) {
    console.error("Invalid business data:", error);
    return null;
  }
};
export const isBusinessDataAvailable = (): boolean => {
  const data = localStorage.getItem(USER_BUSINESS_INFO_LOCAL_STORAGE_KEY);

  if (isNullOrEmpty(data)) {
    return false;
  }

  try {
    const parsedData = BusinessInfoSchema.parse(JSON.parse(data as string));
    if (isNullOrEmpty(parsedData)) return false;
    return true
  } catch (error) {
    console.error("Invalid business data:", error);
    return false;
  }
};


